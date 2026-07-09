'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  MoreHorizontal,
  MessageSquare,
  Command,
  Sparkles,
  Pencil,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { ConversationHistory } from '@/lib/storage';

interface SidebarProps {
  history: ConversationHistory[];
  onLoadHistory: (id: string) => void;
  onClearHistory: () => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

function getGroupLabel(timestamp: number) {
  const now = new Date();
  const date = new Date(timestamp);

  const diff =
    (now.getTime() - date.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diff < 1) return 'Today';
  if (diff < 2) return 'Yesterday';
  if (diff < 7) return 'Previous 7 Days';

  return 'Older';
}

export default function Sidebar({
  history,
  onLoadHistory,
  onClearHistory,
  onNewChat,
  onDeleteChat,
}: SidebarProps) {

  const [search, setSearch] = useState('');

  const [activeChat, setActiveChat] = useState('');

  const [menuChatId, setMenuChatId] =
    useState<string | null>(null);

  const [deleteChatId, setDeleteChatId] =
    useState<string | null>(null);

  const groupedHistory = useMemo(() => {

    const groups: Record<
      string,
      ConversationHistory[]
    > = {
      Today: [],
      Yesterday: [],
      'Previous 7 Days': [],
      Older: [],
    };

    history
      .filter(chat =>
        chat.message
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => b.timestamp - a.timestamp)
      .forEach(chat => {
        groups[getGroupLabel(chat.timestamp)].push(chat);
      });

    return groups;

  }, [history, search]);

  return (

    <aside className="fixed left-0 top-0 h-screen w-[290px] bg-[#0F1117] border-r border-white/10 flex flex-col">

      {/* Logo */}

      <div className="px-5 py-5 border-b border-white/5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">

            <Sparkles className="w-6 h-6 text-white" />

          </div>

          <div>

            <h2 className="text-lg font-semibold text-white">

              AI CTO Agent

            </h2>

            <p className="text-xs text-gray-500">

              Build Production Apps

            </p>

          </div>

        </div>

      </div>

      {/* New Chat */}

      <div className="p-4">

        <button
          onClick={() => {
            setActiveChat('');
            setMenuChatId(null);
            onNewChat();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-medium text-black transition hover:bg-gray-200"
        >

          <Plus size={18} />

          New Chat

        </button>

      </div>

      {/* Search */}

      <div className="px-4">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search chats..."
            className="w-full rounded-xl border border-white/5 bg-[#1B1E27] py-3 pl-10 pr-10 text-white outline-none focus:border-blue-500"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500">

            <Command size={13} />

            K

          </div>

        </div>

      </div>

      {/* Chat History */}

      <div className="mt-6 flex-1 space-y-6 overflow-y-auto px-3">        {Object.entries(groupedHistory).map(([group, chats]) => {

          if (chats.length === 0) return null;

          return (

            <div key={group}>

              <div className="mb-2 px-2">

                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">

                  {group}

                </h3>

              </div>

              <div className="space-y-1">

                {chats.map((chat) => (

                  <motion.div
                    key={chat.id}
                    whileHover={{ x: 3 }}
                    className={`group relative rounded-xl border transition-all ${
                      activeChat === chat.id
                        ? "border-blue-500/30 bg-blue-500/10"
                        : "border-transparent hover:bg-white/5"
                    }`}
                  >

                    {/* Chat Row */}

                    <div
                      onClick={() => {
                        setActiveChat(chat.id);
                        setMenuChatId(null);
                        onLoadHistory(chat.id);
                      }}
                      className="flex cursor-pointer items-start gap-3 p-3"
                    >

                      <div
                        className={`mt-1 ${
                          activeChat === chat.id
                            ? "text-blue-400"
                            : "text-gray-500"
                        }`}
                      >

                        <MessageSquare size={17} />

                      </div>

                      <div className="flex-1 overflow-hidden">

                        <p className="truncate text-sm font-medium text-white">

                          {chat.message}

                        </p>

                        <p className="mt-1 text-[11px] text-gray-500">

                          {new Date(
                            chat.timestamp
                          ).toLocaleString()}

                        </p>

                      </div>

                      {/* 3 Dots */}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          setMenuChatId(
                            menuChatId === chat.id
                              ? null
                              : chat.id
                          );
                        }}
                        className="rounded-lg p-1 opacity-0 transition group-hover:opacity-100 hover:bg-white/10"
                      >

                        <MoreHorizontal
                          size={17}
                          className="text-gray-400"
                        />

                      </button>

                    </div>

                    {/* Dropdown */}

                    <AnimatePresence>

                      {menuChatId === chat.id && (

                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          className="absolute right-3 top-12 z-50 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#1A1D29] shadow-2xl"
                        >

                          <button
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white transition hover:bg-white/5"
                          >

                            <Pencil size={16} />

                            Rename

                          </button>

                          <button
                            onClick={() => {

                              setDeleteChatId(chat.id);

                              setMenuChatId(null);

                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                          >

                            <Trash2 size={16} />

                            Delete

                          </button>

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </motion.div>

                ))}

              </div>

            </div>

          );

        })}

      </div>      {/* =========================
            Delete Modal
      ========================== */}

      <AnimatePresence>

        {deleteChatId && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-[380px] rounded-2xl border border-white/10 bg-[#171A22] p-6 shadow-2xl"
            >

              <h2 className="text-xl font-semibold text-white">

                Delete Chat

              </h2>

              <p className="mt-3 text-sm text-gray-400">

                Are you sure you want to delete this chat?

                <br />

                This action cannot be undone.

              </p>

              <div className="mt-6 flex justify-end gap-3">

                <button
                  onClick={() => setDeleteChatId(null)}
                  className="rounded-xl bg-white/5 px-5 py-2.5 text-white transition hover:bg-white/10"
                >

                  Cancel

                </button>

                <button
                  onClick={() => {

                    onDeleteChat(deleteChatId);

                    setDeleteChatId(null);

                    if (activeChat === deleteChatId) {

                      setActiveChat('');

                    }

                  }}
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-white transition hover:bg-red-700"
                >

                  Delete

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* =========================
              Footer
      ========================== */}

      <div className="border-t border-white/10 bg-[#0B0D12] p-4">

        <button
          onClick={onClearHistory}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 text-red-400 transition hover:bg-red-500/20"
        >

          <Trash2 size={18} />

          Clear History

        </button>

        <div className="flex items-center gap-3 rounded-xl bg-[#161922] p-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-bold text-white">

            P

          </div>

          <div className="flex-1 overflow-hidden">

            <p className="truncate text-sm font-semibold text-white">

              Prashant Shrivastava

            </p>

            <p className="text-xs text-gray-500">

              AI Engineer

            </p>

          </div>

        </div>

      </div>

    </aside>

  );

}