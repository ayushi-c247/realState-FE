"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, InputLabel, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Buttons from "@/components/Common/Buttons/Buttons";
import { addUserSchema } from "@/constants/validationSchemas/user";
import { useAddUserMutation } from "@/hooks/user/Details";
import {
  AddUserFormProps,
  IAddUser,
  IAddUserPayload,
} from "@/types/User/Details";

function AddUser({ onCloseModal, role }: AddUserFormProps) {
  const t = useTranslations("userManagement");
  const userSchema = addUserSchema(t);
  const { mutateAsync: addParent, isPending: isAddParent } =
    useAddUserMutation();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
    setValue,
    control,
  } = useForm<IAddUser>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<IAddUser> = async (data) => {
    const { email, first_name, last_name } = data;
    const payload: IAddUserPayload = {
      email: email.trim(),
      first_name: first_name,
      last_name: last_name,
      role: role.toLowerCase(),
    };
    try {
      const response = await addParent({ id: undefined, input: payload });
      const { message } = response;
      onCloseModal?.();
      showNotification({
        message: message,
        title: "Success",
        color: "green",
      });
      // Don't reset primary parent form - keep it for editing
    } catch (error: unknown) {
      const err = error as Error;
      showNotification({
        message: err?.message,
        title: "Error",
        color: "red",
      });
    }
  };

  return (
    <Box component="form" maw={800} mx="auto">
      <Box className="inner-modal normal-modal autofix" px={20}>
        <Grid>
          {/* First Name */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <InputLabel required>
              {t("table.columns.title.firstName")}
            </InputLabel>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    placeholder={t("placeholders.enterFirstName")}
                    error={errors.first_name?.message}
                    className="form-input"
                    radius="var(--radius-md)"
                    styles={{
                      input: {
                        borderColor: errors.first_name
                          ? "var(--error-color)"
                          : "var(--border-color)",
                      },
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      setValue("first_name", val, { shouldValidate: true });
                      if (val.trim() !== "") clearErrors("first_name");
                    }}
                    onBlur={() => trigger("first_name")}
                  />
                </>
              )}
            />
          </Grid.Col>

          {/* Last Name */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <InputLabel required>
              {t("table.columns.title.lastName")}
            </InputLabel>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    placeholder={t("placeholders.enterLastName")}
                    error={errors.last_name?.message}
                    className="form-input"
                    radius="var(--radius-md)"
                    styles={{
                      input: {
                        borderColor: errors.last_name
                          ? "var(--error-color)"
                          : "var(--border-color)",
                      },
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      setValue("last_name", val, { shouldValidate: true });
                      if (val.trim() !== "") clearErrors("last_name");
                    }}
                    onBlur={() => trigger("last_name")}
                  />
                </>
              )}
            />
          </Grid.Col>

          {/* Email */}
          <Grid.Col span={12}>
            <InputLabel required>{t("table.columns.title.email")}</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    placeholder={t("placeholders.enterEmail")}
                    error={errors.email?.message}
                    className="form-input"
                    radius="var(--radius-md)"
                    styles={{
                      input: {
                        borderColor: errors.email
                          ? "var(--error-color)"
                          : "var(--border-color)",
                      },
                    }}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\s/g, "");
                      setValue("email", val, { shouldValidate: true });
                      if (val.trim() !== "") clearErrors("email");
                    }}
                    onBlur={() => trigger("email")}
                  />
                </>
              )}
            />
          </Grid.Col>
        </Grid>
      </Box>
      <Grid
        className="modal-footer"
        pos={"sticky"}
        bg={"var(--modal-header)"}
        p={"24px"}
        justify="end"
      >
        <Grid.Col span={{ base: 12, lg: 6 }} ta="right" m={0}>
          <Buttons
            type="submit"
            disabled={isAddParent}
            variant="gradient"
            className="gradiant-button"
            onClick={handleSubmit(onSubmit)}
          >
            {role.toLowerCase() === "agent"
              ? t("button.addAgent")
              : t("button.addInvestor")}
          </Buttons>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default memo(AddUser);
