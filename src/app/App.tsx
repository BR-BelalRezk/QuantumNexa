import { ConfigProvider, theme } from "antd";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import IntroScreen from "@/components/screens/intro-screen";
import MainScreen from "@/components/screens/main-screen";

import { ThemeProvider, useTheme } from "@/context/theme";
import { Home } from "@/components/pages";

function AppContent() {
  const { theme: currentTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4F46E5",
          borderRadius: 10,
          fontFamily: "inherit",
        },
      }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <IntroScreen key="intro" />
        ) : (
          <MainScreen key="main">
            <Home />
          </MainScreen>
        )}
      </AnimatePresence>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AppContent />
    </ThemeProvider>
  );
}
