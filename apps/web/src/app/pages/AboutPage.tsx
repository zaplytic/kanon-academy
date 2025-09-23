import { Container, Title, Text, Grid, Card, Avatar, ThemeIcon, Skeleton } from "@mantine/core";
import { IconAward, IconUsers, IconBulb } from "@tabler/icons-react";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const teamMembers = [
  {
    name: "Jahid Hasan Imon",
    title: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg"
  },
  {
    name: "Rehnuma Tabassum",
    title: "Head of Curriculum",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg"
  },
  {
    name: "Tahmid Arefin",
    title: "Lead Instructor",
    avatar: "https://randomuser.me/api/portraits/men/69.jpg"
  }
];

const values = [
  {
    title: "Excellence",
    description:
      "We are committed to providing the highest quality learning experience, with expert-led courses and a world-class platform.",
    icon: IconAward
  },
  {
    title: "Community",
    description:
      "We believe in the power of connection. Our platform fosters a supportive and collaborative network of peers and mentors.",
    icon: IconUsers
  },
  {
    title: "Innovation",
    description:
      "The digital landscape is always evolving. We stay at the forefront of technology to deliver a modern, engaging, and effective curriculum.",
    icon: IconBulb
  }
];

export default function AboutPage() {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    import("../../assets/CreatingApplication.json").then(setAnimationData);
  }, []);

  return (
    <>
      <Container size="lg" py="xl">
        <Title order={1} ta="center" size={"2.3rem"} fw={900}>
          We are on a mission to redefine the future of learning.
        </Title>
        <Text c="dimmed" size="xl" ta="center" mt="md" maw={800} mx="auto">
          Kanon Academy was founded on a simple principle: education should be accessible, engaging,
          and directly applicable to your career goals. We are breaking down the barriers to
          high-quality tech education.
        </Text>
      </Container>

      <Container size="lg" py="xl">
        <Grid gutter={{ base: "xl", md: 50 }}>
          <Grid.Col span={{ base: 12, md: 6 }} mt={-40} visibleFrom="sm">
            {animationData ? (
              <Lottie animationData={animationData} style={{ height: 450 }} />
            ) : (
              <Skeleton h={450} />
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} mb="lg">
              Our Story
            </Title>
            <Text mb="md">
              Born from a passion for technology and a frustration with outdated educational models,
              Kanon Academy was created to bridge the gap between ambition and opportunity. We saw a
              need for a platform that not only teaches skills but also fosters a community and
              provides a clear path to success in the tech industry.
            </Text>
            <Text mb="md">
              Today, we are proud to have helped hundreds of students launch new careers, master new
              skills, and redefine their futures. Our journey is just beginning.
            </Text>
            <Text mb="md">
              We empower innovators through a hands-on curriculum built on real-world projects. Our
              courses constantly evolve with the tech landscape, keeping our students ahead of the
              curve and ready for the future.
            </Text>
            <Text mb="md">
              Join us as we build a global community of learners, creators, and leaders. Together,
              we can shape the future of technology and create a world where passion is the only
              prerequisite for innovation.
            </Text>
          </Grid.Col>
        </Grid>
      </Container>

      <Container size="lg" py="xl">
        <Title order={2} ta="center" mb="xl">
          Our Core Values
        </Title>
        <Grid gutter="xl">
          {values.map((value) => (
            <Grid.Col span={{ base: 12, md: 4 }} key={value.title}>
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <ThemeIcon size="xl" radius="md" variant="light">
                  <value.icon style={{ width: 28, height: 28 }} />
                </ThemeIcon>
                <Title order={3} mt="md">
                  {value.title}
                </Title>
                <Text mt="sm" c="dimmed">
                  {value.description}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Container size="lg" py="xl">
        <Title order={2} ta="center" mb="xl">
          Meet the Team
        </Title>
        <Grid gutter="xl">
          {teamMembers.map((member) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={member.name}>
              <Card withBorder padding="xl" radius="md" ta="center">
                <Avatar src={member.avatar} size={120} radius={120} mx="auto" />
                <Title order={4} mt="md">
                  {member.name}
                </Title>
                <Text c="dimmed" size="sm">
                  {member.title}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
