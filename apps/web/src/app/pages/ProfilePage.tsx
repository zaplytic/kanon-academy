import { Avatar, Button, Container, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { useAuthStore } from "../stores/authStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return <Text>User not found.</Text>;
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        My Profile
      </Title>
      <Paper withBorder p="xl" radius="md">
        <Group>
          <Avatar
            size={120}
            radius="100%"
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.full_name}`}
          />
          <div>
            <Title order={3}>{user.full_name}</Title>
            <Text c="dimmed" tt="capitalize">
              Instructor
            </Text>
          </div>
        </Group>

        <Group grow mt="xl">
          <TextInput label="Full Name" value={user.full_name ?? ""} readOnly />
          <TextInput label="Email" value={user.email} readOnly />
        </Group>

        <Group mt="xl">
          <Button disabled>Edit Profile</Button>
        </Group>
      </Paper>
    </Container>
  );
}
