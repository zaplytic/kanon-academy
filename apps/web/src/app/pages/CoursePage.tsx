import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Image,
  Button,
  Badge,
  ThemeIcon,
  List,
  Accordion,
  Stack,
  Skeleton,
  rem
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCourse } from "../services/courses";
import { NotFoundPage } from "./NotFound";
import { IconCheck, IconVideo } from "@tabler/icons-react";

// Mock data for curriculum - this would come from your API
const mockCurriculum = {
  sections: [
    {
      title: "Introduction to React",
      lessons: [{ title: "Setting up your environment" }, { title: "Understanding JSX" }]
    },
    {
      title: "Components and Props",
      lessons: [{ title: "Creating functional components" }, { title: "Passing data with props" }]
    },
    {
      title: "State and Lifecycle",
      lessons: [
        { title: "Introduction to the useState hook" },
        { title: "useEffect for side effects" }
      ]
    }
  ]
};

export default function CoursePage() {
  const { courseId } = useParams();
  const {
    isPending,
    error,
    data: course
  } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourse(courseId as string),
    enabled: !!courseId
  });

  if (isPending) {
    return (
      <Container size="lg" py="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Skeleton height={40} width="70%" />
            <Skeleton height={20} mt="md" width="50%" />
            <Skeleton height={200} mt="xl" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Skeleton height={400} />
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  if (error || !course) {
    return <NotFoundPage title="Course Not Found" />;
  }

  const features = [
    "12 hours on-demand video",
    "Certificate of completion",
    "Lifetime access",
    "Downloadable resources"
  ];

  return (
    <Container size="lg" py="xl">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="xl">
            <Stack gap={0}>
              <Badge variant="light" size="lg">
                {course.category_name}
              </Badge>
              <Title order={1} mt="sm" size="2.5rem">
                {course.title}
              </Title>
              <Text mt={4} c="dimmed" size="lg">
                A comprehensive guide to mastering the fundamentals and advanced concepts.
              </Text>
              <Text mt="sm" size="sm">
                Created by{" "}
                <Text span fw={500}>
                  {course.instructor_name}
                </Text>
              </Text>
            </Stack>

            <Card withBorder radius="md" padding="lg">
              <Title order={3} mb="md">
                What you'll learn
              </Title>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }>
                <List.Item>Mastering the core concepts</List.Item>
                <List.Item>Building real-world applications</List.Item>
                <List.Item>Advanced state management techniques</List.Item>
                <List.Item>Deploying and maintaining your projects</List.Item>
              </List>
            </Card>

            <Stack>
              <Title order={3}>Description</Title>
              <Text>{course.description}</Text>
            </Stack>

            <Stack>
              <Title order={3}>Course curriculum</Title>
              <Accordion variant="separated">
                {mockCurriculum.sections.map((section, index) => (
                  <Accordion.Item value={`section-${index}`} key={index}>
                    <Accordion.Control>{section.title}</Accordion.Control>
                    <Accordion.Panel>
                      <List spacing="xs" size="sm">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <List.Item
                            key={lessonIndex}
                            icon={
                              <ThemeIcon variant="light" size={24} radius="xl">
                                <IconVideo style={{ width: rem(14), height: rem(14) }} />
                              </ThemeIcon>
                            }>
                            {lesson.title}
                          </List.Item>
                        ))}
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Stack>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder radius="md" shadow="sm" style={{ position: "sticky", top: rem(80) }}>
            <Card.Section>
              <Image src={course.featured_image_link} height={200} alt="Course Image" />
            </Card.Section>
            <Stack p="md" gap="md">
              <Title order={2}>$99.99</Title>
              <Button size="lg" fullWidth>
                Enroll Now
              </Button>
              <List spacing="xs" size="sm" center>
                {features.map((feature) => (
                  <List.Item
                    key={feature}
                    icon={
                      <ThemeIcon color="teal" size={20} radius="xl">
                        <IconCheck style={{ width: rem(12), height: rem(12) }} />
                      </ThemeIcon>
                    }>
                    {feature}
                  </List.Item>
                ))}
              </List>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
