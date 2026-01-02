"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginValidationSchema } from "@/constants/validationSchemas/auth";
import { useLoginMutation } from "@/hooks/auth/index";
import { useAuth } from "@/lib/Contexts/AuthProvider";
import { PATH_AUTH, paths } from "@/routes";
import { ILoginFormValues } from "@/types/Login";
import { USER_ROLE } from "@/constants";

export default function AdminLogin() {
  const router = useRouter();
  const t = useTranslations("login");
  const t_generic = useTranslations("generic");
  const { isAuthorized, isLoading, role } = useAuth();
  const { mutateAsync: login, isPending: isLoggingIn } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(loginValidationSchema(t)),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthorized && !isLoading) {
      router.push(paths.ROOT_DASHBOARD);
    }
  }, [isAuthorized, isLoading, router, role]);

  const handlePasswordLogin = async (data: ILoginFormValues) => {
    try {
      const { email, password } = data;
      const { message, data: loginData } = await login({ email, password });
      showNotification({
        title: t_generic("buttons.success"),
        message,
        color: "green",
      });
      if (loginData?.role === USER_ROLE.ADMIN) {
        router.push(paths.ROOT_DASHBOARD);
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: (error as Error).message,
        color: "red",
      });
    }
  };

  const getVisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? <IconEye size={16} /> : <IconEyeOff size={16} />;

  return (
    <>
      <Title
        ta="center"
        fz={{ base: 16, md: 24, lg: 32 }}
        fw={600}
        c="var(--body-color)"
        lh={"100%"}
        mb={16}
      >
        {t("title")}
      </Title>
      <Text ta="center" fz={14} fw={400} c="var(--text-color)" mb={30}>
        {t("heading")}
      </Text>
      <form onSubmit={handleSubmit(handlePasswordLogin)}>
        <TextInput
          withAsterisk
          label={t("form.email.label")}
          placeholder={t("form.email.placeholder")}
          {...register("email")}
          error={errors.email?.message}
          mt="md"
          radius="var(--radius-md)"
          size="md"
          className="form-input"
        />
        <PasswordInput
          withAsterisk
          label={t("form.password.label")}
          placeholder={t("form.password.placeholder")}
          mt="md"
          {...register("password")}
          className="form-input"
          error={errors.password?.message}
          visibilityToggleIcon={getVisibilityToggleIcon}
          radius="var(--radius-md)"
          onCopy={(e) => {
            e.preventDefault();
          }}
          onCut={(e) => {
            e.preventDefault();
          }}
        />
        <Group
          justify="space-between"
          mt="var(--spacing-md)"
          mb="var(--spacing-xs)"
        >
          <Anchor
            fz="var(--font-size-sm)"
            fw={400}
            c="var(--amethyst-glow)"
            href={PATH_AUTH.forgotPassword}
          >
            {t("forgotPassword")}
          </Anchor>
          <Anchor
            fz="var(--font-size-sm)"
            fw={400}
            c="var(--amethyst-glow)"
            href={PATH_AUTH.signup}
          >
            {t("signup")}
          </Anchor>
        </Group>
        <Button
          type="submit"
          variant="gradient"
          fullWidth
          mt="xl"
          disabled={isLoggingIn}
          className="gradiant-button"
          radius="var(--radius-xxl)"
          size="md"
        >
          {isLoggingIn ? t("form.loading.login") : t("form.button.login")}
        </Button>
      </form>
    </>
  );
}
