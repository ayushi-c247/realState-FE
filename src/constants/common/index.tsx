import { Poppins } from "next/font/google";

export const paginationConstants = {
  limit: 10,
  page: 1,
  search: "",
  offset: 0,
  totalPages: 0,
  totalRecords: 0,
};

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Skill Some",
  name: "description",
  description: "Non-profit organization",
};

export const DEFAULT_EVENT_COVER =
  "https://www.shutterstock.com/image-vector/image-coming-soon-no-picture-600nw-2450891047.jpg";

export const REGEX_TO_CONTAIN_CHARACTER = /^[A-Za-z]+$/;
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 80;
