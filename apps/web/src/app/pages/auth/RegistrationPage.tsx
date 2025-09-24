import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  NativeSelect,
  Group
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { AxiosError } from "axios";

import { RegistrationInput, registrationSchema, UserResponse } from "@kanon-academy/types";
import { registerUser } from "../../services/auth";

export default function RegistrationPage() {
  const [notifId, setNotifId] = useState<string>("");
  const [formDisabled, setFormDisabled] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "student"
    },
    validate: zod4Resolver(registrationSchema.shape.body)
  });

  const navigate = useNavigate();

  const registrationMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: UserResponse) => {
      notifications.update({
        id: notifId,
        icon: <IconCheck size={18} />,
        loading: false,
        title: `User ${data.full_name} is successfully created`,
        message: "Log in with your email & password"
      });
      navigate("/auth/login");
    },
    onError: (error) => {
      let message = "";
      if (error instanceof AxiosError) {
        if (error.status === 409) {
          message = "Email already registered";
          form.setErrors({ email: message });
        } else if (error.status === 504) {
          message = "Server timeout";
        }
      }
      notifications.update({
        id: notifId,
        loading: false,
        color: "red",
        icon: <IconAlertCircle size={18} />,
        title: "User registration failed",
        message: message || error.message || "Unknown error occurred"
      });
      setFormDisabled(false);
    }
  });

  const handleSubmission = (formData: typeof form.values) => {
    const id = notifications.show({
      loading: true,
      message: "User registration is being processed"
    });
    setFormDisabled(true);
    setNotifId(id);
    registrationMutation.mutate(formData as RegistrationInput);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create Your Account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} to="/auth/login">
          Sign in here
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmission)}>
          <TextInput
            label="Full Name"
            withAsterisk
            disabled={formDisabled}
            placeholder="Your Name"
            key={form.key("full_name")}
            {...form.getInputProps("full_name")}
          />
          <TextInput
            label="Email"
            withAsterisk
            disabled={formDisabled}
            placeholder="you@example.com"
            mt="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            withAsterisk
            disabled={formDisabled}
            placeholder="Your password"
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            withAsterisk
            disabled={formDisabled}
            placeholder="Confirm your password"
            mt="md"
            key={form.key("password_confirmation")}
            {...form.getInputProps("password_confirmation")}
          />
          <NativeSelect
            mt="md"
            withAsterisk
            disabled={formDisabled}
            label="Role"
            aria-placeholder="Select a role"
            data={[
              { label: "Student", value: "student" },
              { label: "Instructor", value: "instructor" }
            ]}
            key={form.key("role")}
            {...form.getInputProps("role")}
          />
          <Group mt="md">
            <Button type="submit" fullWidth disabled={formDisabled}>
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
