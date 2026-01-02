import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextInput,
  Text,
  Group,
  Grid,
  ActionIcon,
  Alert,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { showNotification } from "@mantine/notifications";
import {
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconCheck,
} from "@tabler/icons-react";

import Buttons from "@/components/Common/Buttons/Buttons";

import { useResetPasswordMutation } from "@/hooks/auth";
import { useGetUserDetailsByIdQuery } from "@/hooks/user/Details";
import { USER_ROLE } from "@/constants";
import { IResetPasswordFormValues } from "@/types/ResetPassword";
import { resetPasswordValidationSchema } from "@/constants/validationSchemas/auth";
import { PasswordStrengthIndicator } from "../../PasswordStrengthIndicator";

export const ResetPasswordForm: React.FC = () => {
  const tAuth = useTranslations("resetPassword");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [parentId, setParentId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const token = searchParams.get("token");

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setError(tAuth("messages.errors.tokenInvalid"));
      return;
    }
  }, [token, tAuth]);

  // Fetch user details when parentId is set
  const { data: userData, error: userDataError } = useGetUserDetailsByIdQuery({
    id: parentId || 0,
    role: USER_ROLE.INVESTOR,
  });

  // Handle user data fetch errors
  useEffect(() => {
    if (userDataError) {
      setError(tAuth("messages.errors.userDataFailed"));
    }
  }, [userDataError, tAuth]);

  // Navigate to questionnaire when user data is available
  useEffect(() => {
    if (userData?.data) {
      // Small delay to show success message before navigation
      setTimeout(() => {
        router.replace("/onboarding/questionnaire");
      }, 1500);
    }
  }, [userData, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = useCallback(
    async (data: IResetPasswordFormValues) => {
      // Clear previous errors
      setError(null);

      try {
        if (!token) {
          setError(tAuth("messages.errors.tokenInvalid"));
          return;
        }

        const result = await resetPassword({ token, password: data.password });

        if (result.success && result.data?.id) {
          // If onboarding status is false, do not proceed to fetch user data or store credentials
          if (result.data.status === "ACTIVE") {
            // Redirect to login
            showNotification({
              message:
                result?.message || tAuth("messages.success.passwordUpdated"),
              title: "Success",
              color: "green",
              icon: <IconCheck size={16} />,
            });
            setTimeout(() => {
              router.replace("/login");
            }, 1500);
            return;
          }

          setParentId(result.data.id);
          showNotification({
            message:
              result?.message || tAuth("messages.success.passwordUpdated"),
            title: "Success",
            color: "green",
            icon: <IconCheck size={16} />,
          });
        } else {
          // Use backend error message
          const errorMessage =
            result?.message || tAuth("messages.errors.general");
          setError(errorMessage);
        }
      } catch (error: any) {
        // Handle different error response structures
        let errorMessage = tAuth("messages.errors.unexpected");

        if (error?.response?.data?.message) {
          // Backend API error with message
          errorMessage = error.response.data.message;
        } else if (error?.response?.data) {
          // Backend API error without message field
          errorMessage = error.response.data;
        } else if (error?.message) {
          // Generic error message
          errorMessage = error.message;
        }

        setError(errorMessage);
        setRetryCount((prev) => prev + 1);

        showNotification({
          message: errorMessage,
          title: "Error",
          color: "red",
          icon: <IconAlertCircle size={16} />,
        });
      }
    },
    [resetPassword, token, tAuth]
  );

  return (
    <>
      <Text component="h2" fz={20} fw={600} c="#081021" mb={36} ta="center">
        {tAuth("form.title")}{" "}
      </Text>

      {/* Error Alert */}
      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          mb="md"
          variant="light"
          withCloseButton
          onClose={() => setError(null)}
        >
          {error}
          {retryCount > 0 && (
            <Text size="sm" mt="xs" c="dimmed">
              Attempt {retryCount + 1} - Please check your connection and try
              again.
            </Text>
          )}
        </Alert>
      )}

      {/* Success Alert */}
      {isSuccess && (
        <Alert
          icon={<IconCheck size={16} />}
          title="Success"
          color="green"
          mb="md"
          variant="light"
        >
          {tAuth("messages.success.redirecting")}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                {...register("password")}
                label={tAuth("form.createPassword.label")}
                type={showPassword ? "text" : "password"}
                placeholder={tAuth("form.createPassword.placeholder")}
                error={errors.password?.message}
                h={52}
                radius="var(--radius-md)"
                mb={16}
                className="form-input"
                withAsterisk
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault(); // Block spacebar
                }}
                rightSection={
                  <ActionIcon
                    variant="subtle"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <IconEyeOff color="#64748B" size={18} />
                    ) : (
                      <IconEye color="#64748B" size={18} />
                    )}
                  </ActionIcon>
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <TextInput
                {...register("confirmPassword")}
                label={tAuth("form.confirmPassword.label")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder={tAuth("form.confirmPassword.placeholder")}
                error={errors.confirmPassword?.message}
                h={52}
                radius="var(--radius-md)"
                mb={16}
                className="form-input"
                withAsterisk
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault(); // Block spacebar
                }}
                rightSection={
                  <ActionIcon
                    variant="subtle"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <IconEyeOff color="#64748B" size={18} />
                    ) : (
                      <IconEye color="#64748B" size={18} />
                    )}
                  </ActionIcon>
                }
              />
            </Grid.Col>
          </Grid>
        </Box>

        {password.length > 0 && (
          <Box mt={20}>
            <PasswordStrengthIndicator password={password} />
          </Box>
        )}

        <Group justify="center" mt={password.length === 0 ? 32 : 0}>
          <Buttons
            type="submit"
            variant="gradient"
            className="gradiant-button"
            fullWidth
            disabled={
              isSubmitting || isResetPasswordPending || !!error || !token
            }
            loading={isSubmitting || isResetPasswordPending}
          >
            {tAuth("form.buttons.save")}
          </Buttons>
        </Group>
      </form>
    </>
  );
};
