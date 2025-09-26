import { Burger, Group, Button, Text, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { protectedNavLinks, publicNavLinks } from "../../config/links";
import UserMenu from "./UserMenu";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const links = user === null ? publicNavLinks : protectedNavLinks;

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="md"
          size="sm"
          aria-label={opened ? "Close navigation" : "Open navigation"}
        />
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
          <Button component={Link} to={link.to} variant="subtle" key={`linkHeader${link.to}`}>
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
  );
}
