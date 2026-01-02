import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Real State",
  name: "description",
  description: "Non-profit organization",
};

export const REGEX_TO_CONTAIN_CHARACTER = /^[A-Za-z]+$/;
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 80;

/* Filter Entities */
export const FILETR_ENTITIES = {
  USER: "user",
} as const;

export type EntityType = (typeof FILETR_ENTITIES)[keyof typeof FILETR_ENTITIES];
