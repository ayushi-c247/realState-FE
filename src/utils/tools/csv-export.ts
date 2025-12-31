import Papa from "papaparse";
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

interface ExportCSVOptions<T> {
    data: T[];
    fileName: string;
    formatFn: (item: T) => Record<string, string | number>;
}

export const exportCSV = <T>({ data, fileName, formatFn }: ExportCSVOptions<T>) => {
    const formattedData = data.map(formatFn);
    const csv = Papa.unparse(formattedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.csv`;
    link.click();
};

export const getCurrentProgress = (chunkNo: number, chunkSize: number, data: any[]) => {
    const totalItems = data.length;
    const processedItems = Math.min(chunkNo * chunkSize, totalItems);
    const progress = (processedItems / totalItems) * 100;
    return Math.min(progress, 100); // Ensure it doesn't exceed 100%
};


// Convert Excel serial number to JS Date
export const excelDateToJSDate = (serial: number): string => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400; // seconds in a day
    const date = new Date(utc_value * 1000); // convert to milliseconds
    // Format as YYYY-MM-DD
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const dateWithFormat = `${year}-${month}-${day}`;
    const formatted = new Date(dateWithFormat).toISOString()?.split('T')[0];
    return formatted;
};

const formatDates = (input: string) => {
    const parsedDate = dayjs(input, 'DD-MM-YYYY'); // specify input format
    const formatted = parsedDate.format('YYYY-MM-DD');
    return formatted;
}

// Parse csv file
export const parseCSVFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length) {
                    reject(results.errors);
                } else {
                    const parsedData = results.data.map((row: any) => {
                        const trimmedRow: Record<string, any> = {};

                        for (const key in row) {
                            if (Object.prototype.hasOwnProperty.call(row, key)) {
                                const value = row[key];

                                // Trim strings, leave other types as-is
                                if (typeof value === 'string') {
                                    trimmedRow[key] = value.trim();
                                } else {
                                    trimmedRow[key] = value;
                                }
                            }
                        }
                        // Format subscription dates if present
                        if (trimmedRow['Subscription Start Date']) {
                            trimmedRow['Subscription Start Date'] = formatDates(
                                trimmedRow['Subscription Start Date']
                            );
                        }
                        if (trimmedRow['Subscription End Date']) {
                            trimmedRow['Subscription End Date'] = formatDates(
                                trimmedRow['Subscription End Date']
                            );
                        }
                        return trimmedRow;
                    });
                    resolve(parsedData);
                }
            },
            error: (error) => {
                reject(error);
            },
        });
    });
};

// Parse Excel file
export const parseExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                if (!data) return reject('No file data');

                const workbook = XLSX.read(data, { type: 'binary' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

                const formattedData = jsonData.map((row: any) => {
                    const formattedRow: Record<string, any> = {};

                    for (const key in row) {
                        if (Object.prototype.hasOwnProperty.call(row, key)) {
                            const value = row[key];

                            // Trim string values
                            if (typeof value === 'string') {
                                formattedRow[key] = value.trim();
                            } else {
                                formattedRow[key] = value;
                            }
                        }
                    }

                    // Format subscription dates if present
                    if (formattedRow['Subscription Start Date']) {
                        formattedRow['Subscription Start Date'] = excelDateToJSDate(
                            formattedRow['Subscription Start Date']
                        );
                    }

                    if (formattedRow['Subscription End Date']) {
                        formattedRow['Subscription End Date'] = excelDateToJSDate(
                            formattedRow['Subscription End Date']
                        );
                    }

                    return formattedRow;
                });

                resolve(formattedData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => reject('File reading error');
        reader.readAsBinaryString(file);
    });
};

