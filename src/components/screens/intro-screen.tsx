import { motion } from "motion/react";
import Logo from "../shared/logo";

export default function IntroScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.92,
        filter: "blur(18px)",
        transition: {
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.25,
          y: 30,
          filter: "blur(20px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          delay: 0.5,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Logo size="lg" />
      </motion.div>

      <motion.p
        className="mt-4 text-sm uppercase tracking-[0.35em] text-slate-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.8,
        }}
      >
        Craft Your Dream PC
      </motion.p>
    </motion.div>
  );
}
