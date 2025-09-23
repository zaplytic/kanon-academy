import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../services/courses";
import { CourseResponse } from "@kanon-academy/types";
import {
  Container,
  SimpleGrid,
  Card,
  Text,
  Title,
  Badge,
  Button,
  Group,
  Skeleton,
  Alert
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function CoursesPage() {
  const {
    isPending,
    error,
    data: courses
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses
  });

  if (isPending) {
    return (
      <Container py="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Card withBorder padding="lg" radius="md" key={index}>
              <Skeleton height={30} mt="sm" radius="sm" />
              <Skeleton height={80} mt="md" radius="sm" />
              <Skeleton height={35} mt="xl" width="50%" radius="sm" />
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container py="xl">
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red" radius="md">
          There was a problem fetching courses. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container py="xl">
      <Title order={1} ta="center" mb="xl">
        Explore Our Courses
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {courses.map((course: CourseResponse) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={course.id}>
            <Group justify="space-between" mt="md" mb="xs">
              <Title order={3}>{course.title}</Title>
              <Badge color="pink">New</Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={4}>
              {course.description}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
              Learn More
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
