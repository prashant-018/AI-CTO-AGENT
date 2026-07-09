'use client';

import { useState } from 'react';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Hero from '@/components/hero/Hero';
import PromptBox from '@/components/prompt/PromptBox';
import FeatureGrid from '@/components/cards/FeatureGrid';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import Toast from '@/components/common/Toast';
import ChatContainer from '@/components/chat/ChatContainer';

import { useEnhancedChat } from '@/hooks/useEnhancedChat';

export default function Home() {

  const {
    isLoading,
    error,
    messages,
    history,
    scrollRef,
    sendMessage,
    loadFromHistory,
    clearHistory,
    deleteChat,
    retry,
    reset,
  } = useEnhancedChat();

  const [showHero, setShowHero] = useState(true);

  /* -----------------------------
      Send Message
  ------------------------------ */

  const handleSendMessage = async (
    message: string
  ) => {

    if (!message.trim()) return;

    setShowHero(false);

    await sendMessage(message);

  };

  /* -----------------------------
      Load History
  ------------------------------ */

  const handleLoadHistory = (
    id: string
  ) => {

    setShowHero(false);

    loadFromHistory(id);

  };

  /* -----------------------------
      New Chat
  ------------------------------ */

  const handleNewChat = () => {

    reset();

    setShowHero(true);

  };

  /* -----------------------------
      Delete Chat
  ------------------------------ */

  const handleDeleteChat = (
    id: string
  ) => {

    deleteChat(id);

    if (messages.length <= 2) {

      setShowHero(true);

    }

  };

  return (

    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0E1A] via-[#0D1220] to-[#0A0E1A]">

      {/* Background */}

      <div className="fixed top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="fixed bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none -z-10" />

      <Toast />

      <Sidebar
        history={history}
        onLoadHistory={handleLoadHistory}
        onClearHistory={clearHistory}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      <main className="ml-[290px] flex min-h-screen flex-1 flex-col">

        <Header />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
        >          {/* =========================
                Hero Screen
          ========================== */}

          {showHero &&
          messages.length === 0 &&
          !isLoading ? (

            <div className="flex min-h-[75vh] flex-col items-center justify-center px-8">

              <Hero />

              <div className="mt-10 w-full max-w-4xl">

                <PromptBox
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />

              </div>

              <div className="mt-10 w-full">

                <FeatureGrid />

              </div>

            </div>

          ) : (

            <div className="mx-auto w-full max-w-5xl px-8 py-8">

              {/* Chat */}

              <ChatContainer
                messages={messages}
              />

              {/* Loading */}

              {isLoading && (

                <div className="mt-6">

                  <LoadingSkeleton />

                </div>

              )}

              {/* Error */}

              {error && (

                <div className="mt-5">

                  <ErrorMessage
                    message={error}
                    onRetry={retry}
                  />

                </div>

              )}

            </div>

          )}

        </div>        {/* =========================
              Sticky Prompt
        ========================== */}

        {(!showHero || messages.length > 0) && (

          <div className="sticky bottom-0 border-t border-white/5 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/95 to-transparent backdrop-blur-xl">

            <div className="mx-auto w-full max-w-5xl px-8 py-5">

              <PromptBox
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />

            </div>

          </div>

        )}

      </main>

    </div>

  );

}