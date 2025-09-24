import AppRouter from "./router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, MantineColorsTuple, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const myColor: MantineColorsTuple = [
  "#dffbff",
  "#caf2ff",
  "#99e2ff",
  "#64d2ff",
  "#3cc4fe",
  "#23bcfe",
  "#00b5ff",
  "#00a1e4",
  "#008fcd",
  "#007cb6"
];

const theme = createTheme({
  colors: {
    myColor
  }
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar>
          <AppRouter />
        </Navbar>
        <Footer />
      </div>
    </MantineProvider>
  );
}
