import { motion } from "motion/react";

type props = {
  children: React.ReactNode;
};

export default function MainScreen({ children }: props) {
  return (
    <motion.main
      className="min-h-screen bg-slate-950 text-white"
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
