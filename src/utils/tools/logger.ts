const isDevelopment = process.env.REACT_APP_ENV === "development";

const logger = {
  log: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
  warn: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  info: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};

export default logger;
