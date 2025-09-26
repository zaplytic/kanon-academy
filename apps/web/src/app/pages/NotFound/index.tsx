import { Button, Container, Group, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Illustration } from "./Illustration";
import classes from "./NotFound.module.css";

interface NotFoundProps {
  title: string;
}

export function NotFoundPage({ title }: NotFoundProps) {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>{title}</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Button component={Link} to="/" size="md">
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
