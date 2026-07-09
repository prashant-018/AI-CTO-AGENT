'use client';

import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            {/* Header Skeleton */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
              <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-3/6 bg-white/10 rounded animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
