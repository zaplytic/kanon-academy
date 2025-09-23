import { Text, Container, ActionIcon, Group, rem } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

const data = [
  {
    title: "About",
    links: [
      { label: "Pricing", link: "/pricing" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" }
    ]
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "https://github.com/zaplytic/kanon-academy" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" }
    ]
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      {
        label: "GitHub discussions",
        link: "https://github.com/zaplytic/kanon-academy/discussions/landing"
      }
    ]
  }
];

export default function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} className={classes.link} to={link.link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <div className={classes.logo}>
          <Text size="xl" fw={700}>
            Kanon Academy
          </Text>
          <Text size="xs" c="dimmed">
            Unlock your potential.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container size="lg" className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} Kanon Academy. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
