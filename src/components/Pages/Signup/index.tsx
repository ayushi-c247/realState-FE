"use client";

import React from "react";

import { Anchor, Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showNotification } from "@mantine/notifications";

import { addUserSchema } from "@/constants/validationSchemas/user";
import { paths } from "@/routes";
import { ISignupFormValues } from "@/types/Signup";
import { useAddUserMutation } from "@/hooks/user/Details";
import { IAddUserPayload } from "@/types/User/Details";
import { USER_ROLE } from "@/constants";

export default function Signup() {
  const router = useRouter();
  const tSignup = useTranslations("signup");
  const t_generic = useTranslations("generic");
  const schema = addUserSchema(tSignup);
  const { mutateAsync: addUser, isPending } = useAddUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const handleSignup = async (data: ISignupFormValues) => {
    try {
      const { email, first_name, last_name } = data;
      const payload: IAddUserPayload = {
        email: email.trim(),
        first_name: first_name,
        last_name: last_name,
        role: USER_ROLE.INVESTOR,
      };
      const response = await addUser({ id: undefined, input: payload });
      showNotification({
        title: t_generic("buttons.success"),
        message: response.message,
        color: "green",
      });
      if (response) {
        router.push(paths.ROOT_LOGIN);
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: (error as Error).message,
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
        mb={16}
      >
        {tSignup("title")}
      </Title>

      <Text ta="center" fz={14} fw={400} c="var(--text-color)" mb={30}>
        {tSignup("heading")}
      </Text>

      <form onSubmit={handleSubmit(handleSignup)}>
        <TextInput
          withAsterisk
          label={tSignup("form.firstName.label")}
          placeholder={tSignup("form.firstName.placeholder")}
          {...register("first_name")}
          error={errors.first_name?.message}
          mt="md"
          radius="var(--radius-md)"
          size="md"
          className="form-input"
        />

        <TextInput
          withAsterisk
          label={tSignup("form.lastName.label")}
          placeholder={tSignup("form.lastName.placeholder")}
          {...register("last_name")}
          error={errors.last_name?.message}
          mt="md"
          radius="var(--radius-md)"
          size="md"
          className="form-input"
        />

        <TextInput
          withAsterisk
          label={tSignup("form.email.label")}
          placeholder={tSignup("form.email.placeholder")}
          {...register("email")}
          error={errors.email?.message}
          mt="md"
          radius="var(--radius-md)"
          size="md"
          className="form-input"
        />

        <Flex justify="center" mt="md" component="div">
          <Text fz="var(--font-size-sm)" fw={400} c="var(--text-color)">
            {tSignup("alreadyHaveAccount")}&nbsp;
          </Text>
          <Anchor
            fz="var(--font-size-sm)"
            fw={400}
            c="var(--amethyst-glow)"
            href={paths.ROOT_LOGIN}
            style={{
              color: "var(--mantine-color-blue-6)",
              textDecoration: "underline",
            }}
          >
            {tSignup("form.button.login")}
          </Anchor>
        </Flex>

        <Button
          type="submit"
          variant="gradient"
          fullWidth
          mt="xl"
          className="gradiant-button"
          radius="var(--radius-xxl)"
          size="md"
          disabled={isPending}
        >
          {tSignup("form.button.signup")}
        </Button>
      </form>
    </>
  );
}
