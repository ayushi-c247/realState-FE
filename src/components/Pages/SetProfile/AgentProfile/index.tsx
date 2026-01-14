"use client";

import { TextInput, Button, Box } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";

import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { paths } from "@/routes";

import { agentProfileSchema } from "@/constants/validationSchemas/user";
import { useAddAgentProfileMutation } from "@/hooks/user/Details";
import { AgentProfileFormValues } from "@/types/User/Details";

export const AgentProfileForm = () => {
  const router = useRouter();
  const tUser = useTranslations("userManagement");
  const { mutateAsync: addProfile, isPending } = useAddAgentProfileMutation();

  const { register, handleSubmit, formState } = useForm<AgentProfileFormValues>(
    {
      resolver: yupResolver(agentProfileSchema(tUser)),
      mode: "all",
      reValidateMode: "onSubmit",
    }
  );

  const onSubmit = async (data: AgentProfileFormValues) => {
    console.log("data", data);

    try {
      await addProfile({
        input: data,
      });

      showNotification({
        title: "Success",
        message: "Agent profile created successfully",
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Company Name"
        {...register("company_name")}
        error={formState.errors.company_name?.message}
      />

      <TextInput
        label="Contact Number"
        mt="md"
        {...register("contact_number")}
        error={formState.errors.contact_number?.message}
      />

      <TextInput
        label="License Number"
        mt="md"
        {...register("license_number")}
        error={formState.errors.license_number?.message}
      />

      <Box mt="xl">
        <Button
          type="submit"
          fullWidth
          disabled={isPending}
          loading={isPending}
        >
          {tUser("profile.saveAgentProfile")}
        </Button>
      </Box>
    </form>
  );
};
