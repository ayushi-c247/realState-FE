"use client";

import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { showNotification } from "@mantine/notifications";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  GridCol,
  Text,
  TextInput,
} from "@mantine/core";

import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "@/components/Common/Loaders/Loader";
import { USER_ROLE } from "@/constants";
import { updateUserSchema } from "@/constants/validationSchemas/user";

import {
  useGetUserDetailsByIdQuery,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "@/hooks/user/Details";
import { useAuth } from "@/lib/Contexts/AuthProvider";

import { IChangePasswordFormValues, IUpdatePassword } from "@/types/Profile";
import { getToken } from "@/utils/tools/token-service";
import { changePasswordValidationSchema } from "@/constants/validationSchemas/auth";
import { IUpdateUserPayload } from "@/types/User/Details";

// Initial values for password change form only
const passwordInitialValues = {
  newPassword: "",
  confirmNewPassword: "",
};
function AccountSettings() {
  const { userData, role } = useAuth();
  const token = getToken();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setCofirmPassword] = useState(false);
  const t = useTranslations("Front");
  const tAccountSettings = useTranslations("accountSettings");
  const { data, isLoading, error } = useGetUserDetailsByIdQuery({
    id: userData?.id,
    role: USER_ROLE.ADMIN,
  });
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors }, // Capture validation errors
    reset: resetPasswordForm, // Reset function for password form
  } = useForm<IChangePasswordFormValues>({
    defaultValues: passwordInitialValues,
    resolver: yupResolver(changePasswordValidationSchema(tAccountSettings)),
  });
  const { mutateAsync: updateUserDetails, isPending: isUpdatingStatus } =
    useUpdateUserMutation();
  const { mutate: updatePassword, isPending: isPasswordUpdatePending } =
    useUpdatePasswordMutation();

  const userDetails = data?.data;
  const schema = updateUserSchema(tAccountSettings);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateUserPayload>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
    },
  });

  useEffect(() => {
    if (userDetails) {
      setValue("first_name", userDetails.first_name ?? "");
      setValue("last_name", userDetails.last_name ?? "");
    }
  }, [userDetails, setValue, userData?.role]);

  const handleUpdateSubmit = async (formData: IUpdateUserPayload) => {
    try {
      const email = userData?.email ?? userDetails?.email;
      let payload = {
        first_name: formData.first_name,
        last_name: formData.last_name || "",
        email,
        role: userData?.role.toLowerCase(),
      };

      // Call update user API (this updates DB)
      const res = await updateUserDetails({
        id: userData?.id,
        input: payload,
      });

      showNotification({
        title: "Success",
        message: res.message,
        color: "green",
      });
    } catch (error) {
      const err = error as any;
      showNotification({
        title: "Error",
        message: err?.message,
        color: "red",
      });
    }
  };

  // Password change handler (unchanged)
  const onChangePassword = (data: IChangePasswordFormValues) => {
    try {
      if (!token) {
        return;
      }
      const payload: IUpdatePassword = {
        newPassword: data.newPassword,
      };

      updatePassword(
        { payload, token },
        {
          onSuccess: (response) => {
            if (response) {
              showNotification({
                title: "Success",
                message: response.message,
                color: "green",
              });
            }
            // Reset password form after successful update
            resetPasswordForm(passwordInitialValues);
            setShowPassword(false);
            setCofirmPassword(false);
          },
          onError: (error) => {
            showNotification({
              title: "Error",
              message: error.message,
              color: "red",
            });
          },
        }
      );
    } catch (error) {
      const err = error as Error;
      showNotification({
        color: "red",
        title: "Error",
        message: err?.message,
      });
    }
  };

  return (
    <Container size="xxl" px={0} mih="100vh" className="max-container">
      {isLoading && <Loader />}
      {!isLoading && (
        <Box p={{ base: 0, lg: "md" }} className="account-page">
          {/* Error state */}
          {error && (
            <Box p="md" mb={16}>
              <Text ta="center" c="red" fz={18}>
                {tAccountSettings("error")}
              </Text>
            </Box>
          )}

          {/* Header */}
          <Box py={12} w="100%" className="border-bottom" mb={16}>
            <Text
              fz={{ base: 16, lg: 18, xl: 20 }}
              fw={600}
              c="var(--body-color)"
            >
              {tAccountSettings("header.title")}
            </Text>
          </Box>

          {/* Personal Details Section */}
          <Grid px={{ base: 20, md: 30, lg: 48, xl: 54 }}>
            <Grid.Col span={12}>
              <Text
                fz={{ base: 16, lg: 18, xl: 20 }}
                lh="normal"
                fw={600}
                c="var(--body-color)"
              >
                {tAccountSettings("sections.personalDetails")}
              </Text>
            </Grid.Col>

            <Grid.Col span={12}>
              <form onSubmit={handleSubmit(handleUpdateSubmit)}>
                <Card
                  className="card"
                  bg="var(--sidebar-bg)"
                  p={24}
                  radius={16}
                  mt={0}
                >
                  <Grid>
                    <Grid.Col>
                      <Flex
                        align="center"
                        gap={16}
                        className="account-profile-header"
                      >
                        <Box>
                          <Text
                            component="h6"
                            c="var(--body-color)"
                            display="block"
                            fz={14}
                            fw={400}
                            lts="0.3px"
                            mb={1}
                          >
                            {userDetails?.email}
                          </Text>
                        </Box>
                      </Flex>
                    </Grid.Col>

                    <>
                      <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 4 }}>
                        <TextInput
                          withAsterisk
                          label={t("form.firstName")}
                          placeholder={tAccountSettings(
                            "forms.fields.firstName.placeholder"
                          )}
                          className="form-input"
                          {...register("first_name")}
                          error={
                            (errors as Record<string, { message?: string }>)
                              .first_name?.message as string
                          }
                          h={52}
                          radius="var(--radius-md)"
                          mb={16}
                          fz={14}
                        />
                      </Grid.Col>
                      <GridCol span={{ base: 12, md: 6, lg: 4, xl: 4 }}>
                        <TextInput
                          withAsterisk
                          type="text"
                          label={t("form.lastName")}
                          placeholder={tAccountSettings(
                            "forms.fields.lastName.placeholder"
                          )}
                          className="form-input"
                          {...register("last_name")}
                          error={
                            (errors as Record<string, { message?: string }>)
                              .last_name?.message as string
                          }
                          h={52}
                          radius="var(--radius-md)"
                          mb={16}
                        />
                      </GridCol>
                    </>
                  </Grid>
                </Card>
                <Flex justify="flex-end" mt="md">
                  <Button
                    variant="gradiant"
                    className="gradiant-button"
                    type="submit"
                    loading={isUpdatingStatus}
                    disabled={isUpdatingStatus}
                  >
                    {tAccountSettings("buttons.saveChanges")}
                  </Button>
                </Flex>
              </form>
            </Grid.Col>
          </Grid>
          {/* Security & Password Section */}
          <Grid px={{ base: 20, md: 30, lg: 48, xl: 54 }}>
            <Text
              fz={{ base: 16, lg: 18, xl: 20 }}
              lh="normal"
              fw={600}
              c="var(--body-color)"
              pl={6}
            >
              {tAccountSettings("sections.securityAndPassword")}
            </Text>

            <Grid.Col span={12}>
              <form onSubmit={handlePasswordSubmit(onChangePassword)}>
                <Card
                  className="card"
                  bg="var(--sidebar-bg)"
                  px={24}
                  pb={{ base: 35, md: 40, lg: 60, xl: 50 }}
                  pt={{ base: 20, md: 20, lg: 20, xl: 20 }}
                  radius={16}
                  mt={0}
                >
                  <Grid>
                    <Grid.Col
                      span={{ base: 12, md: 6, lg: 6, xl: 4 }}
                      mb={{ base: 20, md: 20, lg: 0 }}
                    >
                      <TextInput
                        label={tAccountSettings(
                          "changePassword.form.newPassword.label"
                        )}
                        className="form-input"
                        h={52}
                        radius="var(--radius-md)"
                        mb={16}
                        type={showPassword ? "text" : "password"}
                        {...registerPassword("newPassword")}
                        error={passwordErrors.newPassword?.message}
                        withAsterisk
                        placeholder={tAccountSettings(
                          "changePassword.form.newPassword.placeholder"
                        )}
                        onCopy={(e) => {
                          e.preventDefault();
                        }}
                        onCut={(e) => {
                          e.preventDefault();
                        }}
                        rightSection={
                          <ActionIcon
                            onClick={() => setShowPassword(!showPassword)}
                            variant="subtle"
                            color="gray"
                          >
                            {showPassword ? (
                              <IconEyeOff size={24} />
                            ) : (
                              <IconEye size={24} />
                            )}
                          </ActionIcon>
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, xl: 4 }}>
                      <TextInput
                        label={tAccountSettings(
                          "changePassword.form.confirmPassword.label"
                        )}
                        className="form-input"
                        h={52}
                        radius="var(--radius-md)"
                        mb={16}
                        type={confirmPassword ? "text" : "password"}
                        {...registerPassword("confirmNewPassword")}
                        placeholder={tAccountSettings(
                          "changePassword.form.confirmPassword.placeholder"
                        )}
                        error={passwordErrors.confirmNewPassword?.message}
                        withAsterisk
                        onCopy={(e) => {
                          e.preventDefault();
                        }}
                        onCut={(e) => {
                          e.preventDefault();
                        }}
                        rightSection={
                          <ActionIcon
                            onClick={() => setCofirmPassword(!confirmPassword)}
                            variant="subtle"
                            color="gray"
                          >
                            {confirmPassword ? (
                              <IconEyeOff size={24} />
                            ) : (
                              <IconEye size={24} />
                            )}
                          </ActionIcon>
                        }
                      />
                    </Grid.Col>
                  </Grid>
                </Card>
                <Flex justify="flex-end" mt="md">
                  <Button
                    variant="gradiant"
                    className="gradiant-button"
                    type="submit"
                    loading={isPasswordUpdatePending}
                    disabled={isPasswordUpdatePending}
                  >
                    {tAccountSettings("buttons.changePassword")}
                  </Button>
                </Flex>
              </form>
            </Grid.Col>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default memo(AccountSettings);
