"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Anchor, Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { loginValidationSchema } from "@/constants/validationSchemas/auth";
import { useForgotPasswordMutation } from "@/hooks/auth";

import type { IForgotPasswordFormValues } from "@/types/Login";
import { useRouter } from "next/navigation";
import { paths } from "@/routes";

export default function ForgotPassword() {
  const router = useRouter();
  const t = useTranslations("login");
  const t_generic = useTranslations("generic");
  const { mutateAsync: forgotPassword, isPending: isForgotPasswordPending } =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormValues>({
    resolver: yupResolver(
      // Reuse login schema email rule only
      loginValidationSchema(t).pick(["email"]) as any,
    ),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: IForgotPasswordFormValues) => {
    try {
      const res = await forgotPassword({ email });
      showNotification({
        title: t_generic("buttons.success"),
        message: res?.message || "",
        color: "green",
      });
      setTimeout(() => {
        router.push(paths.ROOT_LOGIN);
      }, 1000);
    } catch (e) {
      showNotification({
        title: "Error",
        message: (e as Error).message || "",
        color: "red",
      });
    }
  };

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
        {t("forgotPassword")}
      </Title>
      <Text ta="center" fz={14} fw={400} c="var(--text-color)" mb={30}>
        {t("forgotPasswordText")}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          type="submit"
          variant="gradient"
          fullWidth
          mt="xl"
          disabled={isForgotPasswordPending}
          className="gradiant-button"
        >
          {isForgotPasswordPending ? t("form.loading.forgotPassword") : t_generic("buttons.submit")}
        </Button>
      </form>
      <Flex justify="center" mt="md" component="div">
        <Text fz="var(--font-size-sm)" fw={400} c="var(--text-color)">
          {t("forgotPasswordLoginText")}&nbsp;
        </Text>
        <Anchor
          fz="var(--font-size-sm)"
          fw={400}
          c="var(--amethyst-glow)"
          href={paths.ROOT_LOGIN}
          style={{ color: "var(--mantine-color-blue-6)", textDecoration: "underline" }}
        >
          {t("forgotPasswordLoginLinkText")}
        </Anchor>
      </Flex>
    </>
  );
}
