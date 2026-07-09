'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import MarkdownRenderer from './MarkdownRenderer';

interface AssistantBubbleProps {
  content: string;
}

export default function AssistantBubble({
  content,
}: AssistantBubbleProps) {

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex justify-start w-full">

      <div className="relative w-full rounded-2xl bg-[#1E1F22] border border-white/10 p-6 group">

        <MarkdownRenderer content={content} />

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400 hover:text-white" />
          )}
        </motion.button>

      </div>

    </div>
  );
}