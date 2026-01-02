"use client";
import * as yup from "yup";
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants";
import { REGEX_TO_CONTAIN_CHARACTER } from "@/constants/common";

export const addUserSchema = (t: (key: string) => string) =>
  yup.object().shape({
    first_name: yup
      .string()
      .trim()
      .required(t("validation.firstName.required"))
      .max(NAME_MAX_LENGTH, t("validation.firstName.max"))
      .matches(
        REGEX_TO_CONTAIN_CHARACTER,
        t("validation.firstName.onlyCharacters")
      ),
    last_name: yup
      .string()
      .trim()
      .required(t("validation.lastName.required"))
      .max(NAME_MAX_LENGTH, t("validation.lastName.max"))
      .matches(
        REGEX_TO_CONTAIN_CHARACTER,
        t("validation.lastName.onlyCharacters")
      ),
    email: yup
      .string()
      .transform((val) => val?.trim())
      .max(EMAIL_MAX_LENGTH, t("validation.email.max"))
      .required(t("validation.email.required"))
      .email(t("validation.email.inValidMail"))
      .test(
        "no-spaces",
        t("validation.email.space"),
        (value) => !/\s/.test(value || "")
      ),
  });

// You need to call addLessonSchema with a dummy function to get the schema type

export const updateUserSchema = (tUpdate: (key: string) => string) =>
  yup.object().shape({
    first_name: yup
      .string()
      .required(tUpdate("validation.firstName.required"))
      .max(NAME_MAX_LENGTH, tUpdate("validation.firstName.max"))
      .trim()
      .matches(REGEX_TO_CONTAIN_CHARACTER, tUpdate("validation.firstName.noNumbers")),
    last_name: yup
      .string()
      .required(tUpdate("validation.lastName.required"))
      .max(NAME_MAX_LENGTH, tUpdate("validation.lastName.max"))
      .trim()
      .matches(REGEX_TO_CONTAIN_CHARACTER, tUpdate("validation.lastName.noNumbers")),
    email: yup
      .string()
      .max(EMAIL_MAX_LENGTH, tUpdate("validation.email.max"))
      .transform((value) => value?.trim())
      .required(tUpdate("validation.email.required"))
      .test(
        "no-spaces",
        tUpdate("validation.email.noSpaces"),
        (value) => !/\s/.test(value || "")
      ),
  });

export const investorProfileSchema = yup.object({
  // STEP 1: Budget
  budget_min: yup
    .number()
    .typeError("Minimum budget must be a number")
    .required("Minimum budget is required")
    .positive("Minimum budget must be greater than 0"),

  budget_max: yup
    .number()
    .typeError("Maximum budget must be a number")
    .required("Maximum budget is required")
    .moreThan(
      yup.ref("budget_min"),
      "Maximum budget must be greater than minimum budget"
    ),

  // STEP 2: Risk & Horizon
  risk_tolerance: yup
    .string()
    .oneOf(["LOW", "MEDIUM", "HIGH"], "Invalid risk tolerance")
    .required("Risk tolerance is required"),

  investment_horizon: yup
    .string()
    .oneOf(["SHORT", "MEDIUM", "LONG"], "Invalid investment horizon")
    .required("Investment horizon is required"),

  // STEP 3: Objective
  primary_objective: yup
    .string()
    .oneOf(
      ["YIELD", "APPRECIATION", "LIFESTYLE", "DIVERSIFICATION"],
      "Invalid primary objective"
    )
    .required("Primary objective is required"),

  // STEP 4: Property
  preferred_property_types: yup
    .array()
    .of(yup.string().oneOf(["Apartment", "Villa", "Commercial"]))
    .min(1, "Select at least one property type")
    .required(),

  ownership_structure: yup
    .string()
    .oneOf(["SOLE", "JOINT", "FRACTIONAL", "LEASEBACK"])
    .required("Ownership structure is required"),

  // STEP 5: Regions
  preferred_regions: yup
    .array()
    .of(yup.string().trim().min(1))
    .min(1, "Select at least one region")
    .required("Preferred region is required"),

  // STEP 6: Tourism
  tourism_preferences: yup
    .array()
    .of(
      yup
        .string()
        .oneOf(["Coastal", "Urban", "Rural", "Ski", "Cultural", "Events"])
    )
    .min(1, "Select at least one tourism preference")
    .required("Tourism preference is required"),
});

export const agentProfileSchema = yup.object({
  company_name: yup.string().required("Company name is required"),
  contact_number: yup.string().required("Contact number is required"),
  license_number: yup.string().required("License number is required"),
});
