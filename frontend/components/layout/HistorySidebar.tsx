'use client';

import { useState } from 'react';
import { History, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConversationHistory } from '@/lib/storage';

interface HistorySidebarProps {
  history: ConversationHistory[];
  onLoadHistory: (id: string) => void;
  onClearHistory: () => void;
}

export default function HistorySidebar({ history, onLoadHistory, onClearHistory }: HistorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-4 z-40 glass p-3 rounded-xl text-gray-300 hover:text-white transition-colors"
        title="Conversation History"
      >
        <History className="w-5 h-5" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full md:w-96 glass-strong border-l border-white/10 z-50 p-6 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-gray-300" />
                  <h2 className="text-lg font-semibold text-white">History</h2>
                </div>

                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClearHistory}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Clear history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* History Items */}
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No conversation history yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...history].reverse().map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onLoadHistory(item.id);
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-4 glass rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <p className="text-white text-sm font-medium mb-1 line-clamp-2">
                        {item.message}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
