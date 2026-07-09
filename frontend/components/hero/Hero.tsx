'use client';

import { useState, useEffect } from 'react';
import AIOrb from './AIOrb';
import { motion } from 'framer-motion';

export default function Hero() {
  const [greeting, setGreeting] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = 'Good Evening';

    if (hour < 12) {
      greetingText = 'Good Morning';
    } else if (hour < 18) {
      greetingText = 'Good Afternoon';
    }

    setGreeting(greetingText);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="text-center mb-12">
        <AIOrb />
        <div className="h-32" /> {/* Placeholder to prevent layout shift */}
      </section>
    );
  }

  return (
    <section className="text-center mb-12">
      <AIOrb />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
          {greeting}, DeepAI.
        </h1>
        <p className="text-xl text-gray-400">
          Can I help you with anything?
        </p>
      </motion.div>
    </section>
  );
}
