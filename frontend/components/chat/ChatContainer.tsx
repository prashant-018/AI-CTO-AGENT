'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from '@/hooks/useEnhancedChat';

import UserBubble from './UserBubble';
import AssistantBubble from './AssistantBubble';

interface ChatContainerProps {
  messages: Message[];
}

export default function ChatContainer({
  messages,
}: ChatContainerProps) {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  if (!messages.length) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8">

      <AnimatePresence>

        {messages.map((message) => (

          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >

            {message.role === 'user' ? (
              <UserBubble content={message.content} />
            ) : (
              <AssistantBubble content={message.content} />
            )}

          </motion.div>

        ))}

      </AnimatePresence>

      <div ref={bottomRef} />

    </div>
  );
}