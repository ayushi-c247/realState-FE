"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextInput, Group, Grid, ActionIcon, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { showNotification } from "@mantine/notifications";
import { IconEye, IconEyeOff, IconCheck } from "@tabler/icons-react";

import Buttons from "@/components/Common/Buttons/Buttons";
import { useResetPasswordMutation } from "@/hooks/auth";
import { IResetPasswordFormValues } from "@/types/ResetPassword";
import { paths } from "@/routes";

import { resetPasswordValidationSchema } from "@/constants/validationSchemas/auth";
import { PasswordStrengthIndicator } from "../../Auth/PasswordStrengthIndicator";


export const CreatePasswordForm = () => {
  const tAuth = useTranslations("resetPassword");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { mutateAsync: resetPassword, isPending } = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data: IResetPasswordFormValues) => {
    try {
      if (!token) {
        showNotification({
          title: "Error",
          message: tAuth("messages.errors.tokenInvalid"),
          color: "red",
        });
        return;
      }

      const response = await resetPassword({
        token,
        password: data.password,
      });

      showNotification({
        title: "Success",
        message: response?.message || tAuth("messages.success.passwordUpdated"),
        color: "green",
        icon: <IconCheck size={16} />,
      });

      router.push(paths.ROOT_PROFILE);
    } catch (error: any) {
      showNotification({
        title: "Error",
        message: error?.message || tAuth("messages.errors.general"),
        color: "red",
      });
    }
  };

  return (
    <>
      <Text ta="center" fz={20} fw={600} mb={32}>
        {tAuth("form.title")}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="md">
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                {...register("password")}
                label={tAuth("form.createPassword.label")}
                type={showPassword ? "text" : "password"}
                error={errors.password?.message}
                withAsterisk
                rightSection={
                  <ActionIcon onClick={() => setShowPassword((p) => !p)}>
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </ActionIcon>
                }
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                {...register("confirmPassword")}
                label={tAuth("form.confirmPassword.label")}
                type={showConfirmPassword ? "text" : "password"}
                error={errors.confirmPassword?.message}
                withAsterisk
                rightSection={
                  <ActionIcon onClick={() => setShowConfirmPassword((p) => !p)}>
                    {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                  </ActionIcon>
                }
              />
            </Grid.Col>
          </Grid>
        </Box>

        {password?.length > 0 && (
          <PasswordStrengthIndicator password={password} />
        )}

        <Group justify="center" mt="xl">
          <Buttons
            type="submit"
            fullWidth
            loading={isPending}
            disabled={isPending || !token}
            variant="gradient"
          >
            {tAuth("form.buttons.save")}
          </Buttons>
        </Group>
      </form>
    </>
  );
};
