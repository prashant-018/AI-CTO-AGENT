'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ref.current) {
      try {
        mermaid.initialize({
          startOnLoad: true,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#fff',
            primaryBorderColor: '#60a5fa',
            lineColor: '#60a5fa',
            secondaryColor: '#8b5cf6',
            tertiaryColor: '#ec4899',
            background: '#0A0E1A',
            mainBkg: '#1e293b',
            secondBkg: '#334155',
            textColor: '#e2e8f0',
            border1: '#475569',
            border2: '#64748b',
          },
        });

        mermaid.contentLoaded();
        setError(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(true);
      }
    }
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
        Failed to render diagram
      </div>
    );
  }

  return (
    <div className="mermaid-container bg-black/20 p-4 rounded-lg overflow-x-auto">
      <div ref={ref} className="mermaid">
        {chart}
      </div>
    </div>
  );
}
