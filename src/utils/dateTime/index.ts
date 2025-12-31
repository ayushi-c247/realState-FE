import dayjs from "dayjs";

const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatDateTime = (dateStr: string, timeZone: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatTimeOnly = (dateStr: string, timeZone: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const isoToHHmmInTZ = (iso?: string | null, tz?: string | null) => {
  if (!iso || !tz) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).formatToParts(new Date(iso));
  const hh = parts.find((p) => p.type === "hour")?.value ?? "00";
  const mm = parts.find((p) => p.type === "minute")?.value ?? "00";
  return `${hh}:${mm}`;
};

export const formatTimeUserTZ = (iso: string | Date, locale = "en-US") => {
  if (!iso) return "";
  const d = iso instanceof Date ? iso : new Date(iso);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: userTZ,
  }).format(d);
};

// Compute month start/end for a single YYYY-MM value
export const toMonthRange = (ym: string): { start: string; end: string } => {
  const [yStr, mStr] = ym.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const start = new Date(y, (m || 1) - 1, 1);
  const end = new Date(y, m || 1, 0); // last day of month
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return { start: fmt(start), end: fmt(end) };
};

// Given selected months (YYYY-MM), return union start/end or null when none selected
export const getMonthRangeFromSelections = (
  selectedMonths?: string[] | null
): { start: string; end: string } | null => {
  const months = (selectedMonths || []).filter((v) => v && v !== "all");
  if (months.length === 0) return null;

  let minStart: string | null = null;
  let maxEnd: string | null = null;
  months.forEach((ym) => {
    const r = toMonthRange(ym);
    if (!minStart || r.start < minStart) minStart = r.start;
    if (!maxEnd || r.end > maxEnd) maxEnd = r.end;
  });
  return { start: minStart!, end: maxEnd! };
};

export const formatTimeInTZ = (
  iso: string | Date,
  tz: string,
  locale = "en-US"
) => {
  if (!iso) return "";
  const d = iso instanceof Date ? iso : new Date(iso);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: tz,
  }).format(d);
};

export function getUserGMTOffset() {
  const offsetMinutes = new Date().getTimezoneOffset(); // e.g. -330 for IST
  const sign = offsetMinutes <= 0 ? "+" : "-";
  const absMinutes = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absMinutes / 60)).padStart(2, "0");
  const minutes = String(absMinutes % 60).padStart(2, "0");

  return `GMT${sign}${hours}:${minutes}`;
}

export const normalizeDateTime = (value: string): string => {
  let d = dayjs(value, "MMM D, YYYY, hh:mm A", true);
  if (d.isValid()) return d.format("YYYY-MM-DDTHH:mm:ss");

  d = dayjs(value);
  if (d.isValid()) return d.format("YYYY-MM-DDTHH:mm:ss");
  return "";
};
