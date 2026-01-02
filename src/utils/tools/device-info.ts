import { UAParser } from "ua-parser-js";

const DESKTOP = "Desktop";
const UNKNOWN = "Unknown";

export interface DeviceInfo {
  device: string;
  browser: string;
  os: string;
  userAgent: string;
}

export const getLoggedInUserDeviceInfo = (): DeviceInfo => {
  const parser = new UAParser();
  const result = parser.getResult();
  const {
    device: { type } = { type: DESKTOP },
    browser: { name } = { name: UNKNOWN },
    os: { name: osName } = { name: UNKNOWN },
    ua,
  } = result;

  return {
    device: type || DESKTOP,
    browser: name || UNKNOWN,
    os: osName || UNKNOWN,
    userAgent: ua,
  };
};
