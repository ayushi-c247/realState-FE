"use client";

import { TextInput, MultiSelect, Button, Box } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/lib/Contexts/AuthProvider";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { paths } from "@/routes";
import { USER_ROLE } from "@/constants";
import { investorProfileSchema } from "@/constants/validationSchemas/user";

import { StepBudget } from "./Budget";
import { StepRiskHorizon } from "./RiskHorizon";
import { StepObjective } from "./PrimaryObjective";
import { StepRegions } from "./Regions";
import { StepTourism } from "./TourismPreferences";
import { StepReview } from "./ReviewProfile";
import { FormStepper } from "@/components/Common/FormStepper";

export const InvestorProfileForm = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const form = useForm({
    resolver: yupResolver(investorProfileSchema),
    defaultValues: {
      preferred_property_types: [],
      preferred_regions: [],
      tourism_preferences: [],
    },
  });

  //   const { mutateAsync, isPending } = useCreateUserProfileMutation();

  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(investorProfileSchema),
  });

  const steps = [
    {
      label: "Budget",
      component: <StepBudget form={form} />,
    },
    {
      label: "Risk & Horizon",
      component: <StepRiskHorizon form={form} />,
    },
    {
      label: "Objective",
      component: <StepObjective form={form} />,
    },
    {
      label: "Property",
      // component: <StepProperty form={form} />,
    },
    {
      label: "Regions",
      component: <StepRegions form={form} />,
    },
    {
      label: "Tourism",
      component: <StepTourism form={form} />,
    },
    {
      label: "Review",
      component: <StepReview form={form} />,
    },
  ];

  const onSubmit = async () => {
    try {
      //   await mutateAsync({
      //     user_id: userData.id,
      //     role: USER_ROLE.INVESTOR,
      //     data,
      //   });

      showNotification({
        title: "Success",
        message: "Investor profile created successfully",
        color: "green",
      });

      router.replace(paths.ROOT_DASHBOARD);
    } catch (error: any) {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FormStepper steps={steps} onSubmit={onSubmit} />
    </form>
  );
};
