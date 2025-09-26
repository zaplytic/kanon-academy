import { Avatar, Text, Group, Menu, UnstyledButton, useMantineTheme } from "@mantine/core";
import {
  IconChevronDown,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconUser
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import cx from "clsx";
import classes from "./UserMenu.module.css";
import { useAuthStore } from "../../stores/authStore";

export default function UserMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false);
  const theme = useMantineTheme();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal>
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar alt={"User profile picture"} radius="xl" size={"md"}>
              {user?.full_name == null ? "MK" : user.full_name.slice(0, 2)}
            </Avatar>
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user?.full_name}
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => navigate("/profile")}
          leftSection={<IconUser size={16} color={theme.colors.green[6]} stroke={1.5} />}>
          Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconHeart size={16} color={theme.colors.red[6]} stroke={1.5} />}>
          Liked Courses
        </Menu.Item>
        <Menu.Item leftSection={<IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />}>
          Saved Courses
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMessage size={16} color={theme.colors.blue[6]} stroke={1.5} />}>
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}>
          Change account
        </Menu.Item>
        <Menu.Item onClick={clearAuth} leftSection={<IconLogout size={16} stroke={1.5} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
