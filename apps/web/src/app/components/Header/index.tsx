import { AppShell, Burger, Group, Button, Text, useMantineTheme, Image } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthStore } from "../../stores/authStore";
import { protectedNavLinks, publicNavLinks } from "../../config/links";
import UserMenu from "./UserMenu";

interface NavbarProps {
  children: ReactNode;
}

export default function Header({ children }: NavbarProps) {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const user = useAuthStore((state) => state.user);

  const links = user === null ? publicNavLinks : protectedNavLinks;

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
            {links.map((link) => (
              <Button component={Link} to={link.to} variant="subtle">
                {link.label}
              </Button>
            ))}
          </Group>
          {/* Nav Actions */}
          {user === null ? (
            <Group>
              <Button component={Link} to="/auth/login" variant="default">
                Log In
              </Button>
              <Button component={Link} to="/auth/register">
                Sign Up
              </Button>
            </Group>
          ) : (
            <UserMenu />
          )}
        </Group>
      </AppShell.Header>

      {isMobile && (
        <AppShell.Navbar p="md">
          {links.map((link) => (
            <Button component={Link} to={link.to} variant="subtle" fullWidth>
              {link.label}
            </Button>
          ))}
        </AppShell.Navbar>
      )}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
