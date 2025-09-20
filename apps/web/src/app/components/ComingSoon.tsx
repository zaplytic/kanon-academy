import { Container, Title, Text, Button, Stack, ThemeIcon, rem } from "@mantine/core";
import { IconTools } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <Container
      style={{
        height: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <Stack align="center" gap="xl">
        <ThemeIcon size={rem(100)} radius={rem(100)} variant="light">
          <IconTools style={{ width: rem(60), height: rem(60) }} />
        </ThemeIcon>
        <Title order={1} ta="center">
          Coming Soon!
        </Title>
        <Text c="dimmed" size="lg" ta="center" maw={500}>
          We're working hard to build this page. Please check back later to see what's new. We
          promise it'll be worth the wait!
        </Text>
        <Button component={Link} to="/" size="md" variant="light">
          Go back to Homepage
        </Button>
      </Stack>
    </Container>
  );
}
