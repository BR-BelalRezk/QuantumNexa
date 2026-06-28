import { motion } from "motion/react";
import { useTheme } from "@/context/theme";

type props = {
  children: React.ReactNode;
};

export default function MainScreen({ children }: props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.main
      className={`min-h-screen ${isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}
      initial={{
        opacity: 0,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.main>
  );
}
