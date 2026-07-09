'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div
      className="
      prose
      prose-invert
      max-w-none

      prose-headings:text-white
      prose-headings:font-bold

      prose-h1:text-3xl
      prose-h2:text-2xl
      prose-h3:text-xl

      prose-p:text-gray-300
      prose-p:leading-8

      prose-strong:text-white

      prose-li:text-gray-300
      prose-li:marker:text-blue-400

      prose-code:text-green-300
      prose-code:bg-[#1A1A1A]
      prose-code:px-1
      prose-code:rounded

      prose-pre:bg-transparent

      prose-hr:border-white/10

      prose-table:border
      prose-th:text-white
      prose-td:text-gray-300
    "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className } = props;

            const match = /language-(\w+)/.exec(className || '');

            if (match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    borderRadius: 14,
                    padding: 18,
                    fontSize: 14,
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }

            return (
              <code className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}