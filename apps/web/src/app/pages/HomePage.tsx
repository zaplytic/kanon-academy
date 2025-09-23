import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  Grid,
  Card,
  ThemeIcon,
  Group,
  Skeleton
} from "@mantine/core";
import { IconRocket, IconUsers, IconCertificate } from "@tabler/icons-react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [animationData, setAnimationData] = useState<unknown>("");

  useEffect(() => {
    import("../../assets/SocialStrategy.json").then(setAnimationData);
  }, []);

  return (
    <>
      <Container size="lg" py="xl">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Title order={1} size={"3rem"} fw={900}>
              Unlock Your Potential.
              <Text span c="blue" inherit>
                {" "}
                Redefine Your Future.
              </Text>
            </Title>
            <Text size="xl" mt="xl">
              Kanon Academy offers immersive, expert-led courses designed to elevate your skills and
              propel your career forward.
            </Text>
            <Group mt="xl">
              <Button component={Link} to="/courses" size="lg" radius="md">
                Explore Courses
              </Button>
              <Button component={Link} to="/about" size="lg" radius="md" variant="outline">
                Learn More
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            {animationData ? (
              <Lottie animationData={animationData} style={{ height: 450 }} />
            ) : (
              <Skeleton h={450} />
            )}
          </Grid.Col>
        </Grid>
      </Container>

      <Container size="lg" py="xl">
        <Title order={2} ta="center" size="2.3rem" mb="xl">
          Why Kanon Academy?
        </Title>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}>
                <IconRocket size={28} />
              </ThemeIcon>
              <Title order={3} mt="md">
                Learn from the Best
              </Title>
              <Text mt="sm">
                Our instructors are industry veterans, bringing invaluable real-world wisdom to
                every lesson.
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}>
                <IconUsers size={28} />
              </ThemeIcon>
              <Title order={3} mt="md">
                Thrive in Community
              </Title>
              <Text mt="sm">
                Connect, collaborate, and grow with a network of driven peers and supportive
                mentors.
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}>
                <IconCertificate size={28} />
              </ThemeIcon>
              <Title order={3} mt="md">
                Future-Proof Your Skills
              </Title>
              <Text mt="sm">
                Our curriculum is designed to equip you with the in-demand skills for today's and
                tomorrow's job market.
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container size="lg" py="xl">
        <Group justify="center">
          <Stack align="center" gap="md">
            <Title order={2} ta="center">
              Join Our Community
            </Title>
            <Text ta="center" maw={600}>
              Take the next step in your learning journey. Explore our courses and become part of a
              growing network of tech professionals.
            </Text>
            <Button component={Link} to="/courses" size="lg" radius="md" mt="md">
              Explore Courses
            </Button>
          </Stack>
        </Group>
      </Container>
    </>
  );
}
