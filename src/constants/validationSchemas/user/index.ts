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
      .matches(
        REGEX_TO_CONTAIN_CHARACTER,
        tUpdate("validation.firstName.noNumbers")
      ),
    last_name: yup
      .string()
      .required(tUpdate("validation.lastName.required"))
      .max(NAME_MAX_LENGTH, tUpdate("validation.lastName.max"))
      .trim()
      .matches(
        REGEX_TO_CONTAIN_CHARACTER,
        tUpdate("validation.lastName.noNumbers")
      ),
  });

export const investorProfileSchema = (tProfile: (key: string) => string) =>
  yup.object({
    budget_unit: yup
      .mixed<"LAKH" | "CRORE">()
      .oneOf(["LAKH", "CRORE"])
      .required(tProfile("profile.investorProfile.budget_unit")),

    budget_min: yup
      .number()
      .typeError(tProfile("profile.investorProfile.budget_min"))
      .required(tProfile("profile.investorProfile.budget_min"))
      .positive(tProfile("profile.investorProfile.budget_min_greater"))
      .test(
        "min-upper-limit",
        tProfile("profile.investorProfile.budget_min_exceed"),
        (value, ctx) => {
          if (!value) return false;
          const unit = (ctx.parent.budget_unit || "").toUpperCase();
          // convert Lakhs → Crores correctly
          const valueInCr = unit.includes("LAKH") ? value / 100 : value;

          return valueInCr <= 500;
        }
      ),

    budget_max: yup
      .number()
      .typeError(tProfile("profile.investorProfile.budget_max"))
      .required(tProfile("profile.investorProfile.budget_max"))
      .positive(tProfile("profile.investorProfile.budget_max_greater"))
      .test(
        "max-upper-limit",
        tProfile("profile.investorProfile.budget_max_exceed"),
        (value, ctx) => {
          if (!value) return false;
          const unit = (ctx.parent.budget_unit || "").toUpperCase();
          const valueInCr = unit.includes("LAKH") ? value / 100 : value;
          return valueInCr <= 500;
        }
      )
      .test(
        "range-check",
        tProfile("profile.investorProfile.budget_max_greater_equal"),
        (value, ctx) => {
          const min = ctx.parent.budget_min;
          const unit = (ctx.parent.budget_unit || "").toUpperCase();

          if (!min || !value) return false;

          // convert BOTH using same unit
          const minInCr = unit.includes("LAKH") ? min / 100 : min;
          const maxInCr = unit.includes("LAKH") ? value / 100 : value;

          return maxInCr >= minInCr;
        }
      ),
    risk_tolerance: yup
      .string()
      .required(tProfile("profile.investorProfile.risk_tolerance"))
      .oneOf(["LOW", "MEDIUM", "HIGH"]),
    investment_horizon: yup
      .string()
      .required(tProfile("profile.investorProfile.investment_horizon"))
      .oneOf(["SHORT", "MEDIUM", "LONG"]),
    primary_objective: yup
      .string()
      .required(tProfile("profile.investorProfile.primary_objective")),

    ownership_structure: yup
      .string()
      .required(tProfile("profile.investorProfile.ownership_structure")),
    country: yup.string().required(tProfile("profile.investorProfile.country")),
    state: yup.string().required(tProfile("profile.investorProfile.state")),
    cities: yup
      .array()
      .of(yup.string().required())
      .min(1, "At least one city must be selected")
      .required(tProfile("profile.investorProfile.city"))
      .compact(),

    preferred_property_types: yup
      .string()
      .required(tProfile("profile.investorProfile.preferred_property_types")),
    tourism_preferences: yup
      .string()
      .required(tProfile("profile.investorProfile.tourism_preferences")),
    renovation_willingness: yup
      .string()
      .required(tProfile("profile.investorProfile.renovation_willingness")),
  });

export const agentProfileSchema = (tProfile: (key: string) => string) =>
  yup.object({
    company_name: yup
      .string()
      .min(3, tProfile("profile.agentProfile.company_name_min"))
      .max(50, tProfile("profile.agentProfile.company_name_max"))
      .required(tProfile("profile.agentProfile.company_name")),

    contact_number: yup
      .string()
      .required(tProfile("profile.agentProfile.contact_number"))
      .matches(
        /^[0-9]+$/,
        tProfile("profile.agentProfile.contact_number_only_digits")
      )
      .min(10, tProfile("profile.agentProfile.contact_number_min"))
      .max(20, tProfile("profile.agentProfile.contact_number_max")),

    license_number: yup
      .string()
      .required(tProfile("profile.agentProfile.license_number"))
      .matches(
        /^[0-9]+$/,
        tProfile("profile.agentProfile.license_number_only_digits")
      )
      .min(5, tProfile("profile.agentProfile.license_number_min"))
      .max(20, tProfile("profile.agentProfile.license_number_max")),
  });
