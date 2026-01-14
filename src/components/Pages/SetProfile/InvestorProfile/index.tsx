"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";

import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { investorProfileSchema } from "@/constants/validationSchemas/user";
import { FormStepper } from "@/components/Common/FormStepper";
import { InvestorProfileFormValues } from "@/types/User/Details";
import { StepConfig } from "@/types";

import { StepBudget } from "./Budget";
import { StepRiskHorizon } from "./RiskHorizon";
import { StepObjective } from "./PrimaryObjective";
import { StepRegions } from "./Regions";
import { StepTourism } from "./TourismPreferences";
import { StepReview } from "./ReviewProfile";
import { StepProperty } from "./PropertyPreferences";
import { useAddInvestorProfileMutation } from "@/hooks/user/Details";
import { StepRenovationWillingness } from "./RenovationWillingness";
import { useEffect, useMemo } from "react";

const STORAGE_KEY = "investorProfileFormData";

export const InvestorProfileForm = () => {
  const router = useRouter();
  const tUser = useTranslations("userManagement");
  const savedFormData =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const initialValues: Partial<InvestorProfileFormValues> = savedFormData
    ? JSON.parse(savedFormData)
    : {};
  const form = useForm<InvestorProfileFormValues>({
    resolver: yupResolver(investorProfileSchema(tUser)),
    defaultValues: initialValues,
  });
  const { mutateAsync: addProfile } = useAddInvestorProfileMutation();

  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, []);

  const steps: StepConfig<InvestorProfileFormValues>[] = [
    {
      label: "Budget",
      component: <StepBudget form={form} />,
      fields: ["budget_min", "budget_max"] as (keyof InvestorProfileFormValues &
        string)[],
    },
    {
      label: "Risk & Horizon",
      component: <StepRiskHorizon form={form} />,
      fields: [
        "risk_tolerance",
        "investment_horizon",
      ] as (keyof InvestorProfileFormValues & string)[],
    },
    {
      label: "Regions",
      component: <StepRegions form={form} />,
      fields: [
        "country",
        "state",
        "cities",
      ] as (keyof InvestorProfileFormValues & string)[],
    },
    {
      label: "Property",
      component: <StepProperty form={form} />,
      fields: ["preferred_property_types"] as (keyof InvestorProfileFormValues &
        string)[],
    },
    {
      label: "Objective",
      component: <StepObjective form={form} />,
      fields: ["primary_objective"] as (keyof InvestorProfileFormValues &
        string)[],
    },
    {
      label: "Tourism",
      component: <StepTourism form={form} />,
      fields: ["tourism_preferences"] as (keyof InvestorProfileFormValues &
        string)[],
    },
    {
      label: "Renovation Willingness",
      component: <StepRenovationWillingness form={form} />,
      fields: ["renovation_willingness"] as (keyof InvestorProfileFormValues &
        string)[],
    },
    {
      label: "Review",
      component: <StepReview form={form} />,
      fields: [],
    },
  ];

  const onSubmit = async (data: InvestorProfileFormValues) => {
    try {
      await addProfile({ input: data });
      showNotification({
        title: "Success",
        message: "Profile submitted",
        color: "green",
      });
      router.replace("/dashboard");
    } catch (error: any) {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };
  const stepsWithCompletion = useMemo(() => {
    const values = form.getValues();
    return steps.map((step) => {
      const isCompleted =
        step.fields.length === 0
          ? false // Review step doesn't get a checkmark
          : step.fields.every((field) => {
              const value = values[field as keyof InvestorProfileFormValues];
              if (Array.isArray(value)) return value.length > 0;
              return value !== undefined && value !== null && value !== "";
            });
      return {
        ...step,
        isCompleted,
      };
    });
  }, [form.watch()]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormStepper<InvestorProfileFormValues>
        steps={stepsWithCompletion}
        form={form}
      />
    </form>
  );
};
