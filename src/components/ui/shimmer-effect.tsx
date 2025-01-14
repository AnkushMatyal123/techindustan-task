"use client";

import { motion } from "framer-motion";

interface ShimmerEffectProps {
  width: string;
  height: string;
  className?: string;
}

export function ShimmerEffect({
  width,
  height,
  className = "",
}: ShimmerEffectProps) {
  return (
    <div
      style={{ width, height }}
      className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          translateX: ["0%", "100%"],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
        }}
      />
    </div>
  );
}
