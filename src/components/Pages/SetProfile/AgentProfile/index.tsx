"use client";

import { TextInput, Button, Box } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/lib/Contexts/AuthProvider";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { paths } from "@/routes";

import { agentProfileSchema } from "@/constants/validationSchemas/user";

export const AgentProfileForm = () => {
  const router = useRouter();

  // const { mutateAsync, isPending } = useCreateUserProfileMutation();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(agentProfileSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      //   await mutateAsync({
      //     user_id: userData.id,
      //     role: USER_ROLE.AGENT,
      //     data,
      //   });

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
        <Button type="submit" fullWidth>
          Save Profile
        </Button>
      </Box>
    </form>
  );
};
