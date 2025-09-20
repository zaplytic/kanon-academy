import { AppShell, Burger, Group, Button, Text, useMantineTheme, Image } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={
        isMobile
          ? {
              width: 300,
              breakpoint: "md",
              collapsed: { mobile: !opened }
            }
          : undefined
      }>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                gap: "var(--mantine-spacing-xs)"
              }}>
              <Image
                src="/assets/logo.png"
                alt={"Kanon Academy Logo"}
                h={36}
                style={{ paddingBottom: 4 }}
              />
              <Text fw={700} size={"1.5rem"} style={{ whiteSpace: "nowrap" }} visibleFrom={"md"}>
                Kanon Academy
              </Text>
            </Link>
          </Group>
          <Group visibleFrom="md">
            <Button component={Link} to="/courses" variant="subtle">
              Courses
            </Button>
            <Button component={Link} to="/pricing" variant="subtle">
              Pricing
            </Button>
            <Button component={Link} to="/about" variant="subtle">
              About
            </Button>
          </Group>
          <Group>
            <Button component={Link} to="/auth/login" variant="default">
              Log In
            </Button>
            <Button component={Link} to="/auth/register">
              Sign Up
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      {isMobile && (
        <AppShell.Navbar p="md">
          <Button component={Link} to="/courses" variant="subtle" fullWidth>
            Courses
          </Button>
          <Button component={Link} to="/pricing" variant="subtle" fullWidth>
            Pricing
          </Button>
          <Button component={Link} to="/about" variant="subtle" fullWidth>
            About
          </Button>
        </AppShell.Navbar>
      )}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
