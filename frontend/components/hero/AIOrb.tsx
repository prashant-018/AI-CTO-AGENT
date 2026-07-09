'use client';

import { motion } from 'framer-motion';

export default function AIOrb() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* Main Orb */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
      >
        {/* Gradient Sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-90" />

        {/* Glass overlay */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm" />

        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
      </motion.div>

      {/* Outer glow effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-3xl opacity-50"
      />
    </div>
  );
}
