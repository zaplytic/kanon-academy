import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { AppShell, useMantineTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import AppRouter from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

export default function App() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
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
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      {isMobile && (
        <AppShell.Navbar p="md">
          <NavBar opened={opened} toggle={toggle} />
        </AppShell.Navbar>
      )}

      <AppShell.Main>
        <AppRouter />
      </AppShell.Main>
      <Footer />
      <Notifications />
    </AppShell>
  );
}
