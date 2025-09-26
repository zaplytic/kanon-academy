import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { protectedNavLinks, publicNavLinks } from "../config/links";

interface NavBarProps {
  opened: boolean;
  toggle: () => void;
}

export default function NavBar({ opened, toggle }: NavBarProps) {
  const user = useAuthStore((state) => state.user);
  const links = user === null ? publicNavLinks : protectedNavLinks;
  return (
    <>
      {links.map((link) => (
        <Button
          component={Link}
          to={link.to}
          variant="subtle"
          fullWidth
          onClick={toggle}
          key={`linkNav-${link.to}`}>
          {link.label}
        </Button>
      ))}
    </>
  );
}
