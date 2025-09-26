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
import { Link } from "react-router-dom";

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
      {courses.length === 0 ? (
        <Text ta="center" c="dimmed">
          We're getting things ready-check back soon for new courses.
        </Text>
      ) : (
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

              <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                component={Link}
                to={`/courses/${course.id}`}>
                Learn More
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
