'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LucideIcon } from 'lucide-react';
import CodeBlock from '../common/CodeBlock';
import MermaidDiagram from '../common/MermaidDiagram';
import toast from 'react-hot-toast';

interface EnhancedResultCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  index: number;
  isStreaming?: boolean;
}

export default function EnhancedResultCard({
  title,
  content,
  icon: Icon,
  index,
  isStreaming = false
}: EnhancedResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [displayedContent, setDisplayedContent] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (!isStreaming || !content) {
      setDisplayedContent(content);
      setTypingComplete(true);
      return;
    }

    setDisplayedContent('');
    setTypingComplete(false);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedContent(content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 10); // Adjust speed here

    return () => clearInterval(typingInterval);
  }, [content, isStreaming]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success(`${title} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl p-6 relative group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 p-2 rounded-lg"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </motion.button>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold text-white mb-3 mt-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-semibold text-white mb-2 mt-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-medium text-white mb-2 mt-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-300 text-sm leading-relaxed mb-3">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 mb-3">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1 mb-3">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-300 text-sm leading-relaxed">{children}</li>
            ),
            code: ({ inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const codeString = String(children).replace(/\n$/, '');

              // Check if it's a mermaid diagram
              if (match && match[1] === 'mermaid') {
                return <MermaidDiagram chart={codeString} />;
              }

              return !inline && match ? (
                <CodeBlock code={codeString} language={match[1]} />
              ) : (
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-blue-300" {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <div className="mb-3">{children}</div>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-white">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-gray-300">{children}</em>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-3">
                <table className="min-w-full divide-y divide-gray-700">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-white/5">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 text-sm text-gray-300">
                {children}
              </td>
            ),
          }}
        >
          {displayedContent}
        </ReactMarkdown>

        {/* Typing cursor */}
        {isStreaming && !typingComplete && (
          <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1" />
        )}
      </div>
    </motion.div>
  );
}
