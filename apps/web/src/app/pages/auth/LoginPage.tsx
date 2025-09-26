import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Anchor
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { LoginInput, LoginResponse, loginSchema } from "@kanon-academy/types";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { AxiosError } from "axios";

import { loginUser } from "../../services/auth";
import { useAuthStore } from "../../stores/authStore";

export default function LoginPage() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: ""
    },
    validate: zod4Resolver(loginSchema.shape.body)
  });

  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [notifId, setNotifId] = useState<string>("");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      notifications.update({
        id: notifId,
        icon: <IconCheck size={18} />,
        loading: false,
        message: `User ${data.user.full_name} has successfully logged in`
      });

      setAuth(data.user, data.token);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      let message = "";
      if (error instanceof AxiosError) {
        if (error.status === 504) {
          message = "Server timeout";
        } else if (error.status === 401) {
          message = "Email or Password is incorrect";
          form.setErrors({ email: message, password: message });
        }
      }
      notifications.update({
        id: notifId,
        loading: false,
        color: "red",
        icon: <IconAlertCircle size={18} />,
        title: "Login failed",
        message: message || error.message || "Unknown error occurred"
      });
    }
  });

  const handleSubmission = (data: LoginInput) => {
    const id = notifications.show({
      loading: true,
      message: "You are being logged in"
    });

    setNotifId(id);

    loginMutation.mutate(data);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} to="/auth/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmission)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            disabled={loginMutation.isPending}
            withAsterisk
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            withAsterisk
            disabled={loginMutation.isPending}
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" disabled={loginMutation.isPending}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
