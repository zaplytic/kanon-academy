import {
  Card,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
  Title,
  Container
} from "@mantine/core";
import { useAuthStore } from "../stores/authStore";
import { IconArrowUpRight, IconBook, IconCheck } from "@tabler/icons-react";

const mockStats = [
  { title: "Courses in Progress", value: "3", icon: IconBook, color: "blue" },
  { title: "Completed Courses", value: "12", icon: IconCheck, color: "green" },
  { title: "Assignments Due", value: "1", icon: IconArrowUpRight, color: "orange" }
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  const stats = mockStats.map((stat) => (
    <Paper withBorder p="md" radius="md" key={stat.title}>
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: Math.random() * 60 + 20, color: stat.color }]}
          label={
            <Center>
              <stat.icon size="1.4rem" stroke={1.5} />
            </Center>
          }
        />
        <div>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {stat.title}
          </Text>
          <Text fw={700} size="xl">
            {stat.value}
          </Text>
        </div>
      </Group>
    </Paper>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        Welcome back, {user?.full_name}!
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mb="lg">
        {stats}
      </SimpleGrid>

      <Card withBorder radius="md" padding="lg">
        <Title order={4}>Recent Activity</Title>
        <Text mt="sm" c="dimmed">
          - You completed the "Introduction to React" course.
        </Text>
        <Text mt="xs" c="dimmed">
          - A new assignment was posted for "Advanced TypeScript".
        </Text>
        <Text mt="xs" c="dimmed">
          - You enrolled in the "Full-Stack Development" course.
        </Text>
      </Card>
    </Container>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      {children}
    </div>
  );
}
