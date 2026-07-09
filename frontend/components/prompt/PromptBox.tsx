'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PromptBoxProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export default function PromptBox({
  onSendMessage,
  isLoading = false,
}: PromptBoxProps) {
  const [message, setMessage] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = '0px';
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 'px';
  }, [message]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!message.trim() || isLoading) return;

    onSendMessage(message.trim());

    setMessage('');
  };

  return (
    <div className="sticky bottom-0 z-20 w-full bg-[#0B1020]/90 backdrop-blur-xl py-6">

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-3xl border border-white/10 bg-[#171B2E] shadow-2xl">

          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            disabled={isLoading}
            placeholder="Message AI CTO Agent..."
            onChange={(e) => setMessage(e.target.value)}
            className="
              w-full
              resize-none
              bg-transparent
              px-6
              pt-5
              pb-3
              text-white
              placeholder:text-gray-500
              outline-none
              max-h-[220px]
              overflow-y-auto
            "
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          <div className="flex items-center justify-between px-4 pb-4">

            <button
              type="button"
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!message.trim() || isLoading}
              type="submit"
              className={cn(
                'rounded-xl p-3 transition',
                message.trim()
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-gray-500'
              )}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>

          </div>

        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          AI CTO Agent can make mistakes. Verify important information.
        </p>

      </form>

    </div>
  );
}