import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Anchor
} from "@mantine/core";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
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
        <TextInput label="Full Name" placeholder="Your Name" required />
        <TextInput label="Email" placeholder="you@mantine.dev" required mt="md" />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl">
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
