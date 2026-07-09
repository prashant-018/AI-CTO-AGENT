'use client';

import { Download, FileText, Clipboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { exportUtils, ExportData } from '@/lib/export';
import toast from 'react-hot-toast';

interface ActionButtonsProps {
  data: ExportData;
}

export default function ActionButtons({ data }: ActionButtonsProps) {
  const handleDownloadMarkdown = () => {
    exportUtils.downloadMarkdown(data);
    toast.success('Downloaded as Markdown');
  };

  const handleDownloadPDF = () => {
    exportUtils.downloadPDF(data);
    toast.success('Downloaded as PDF');
  };

  const handleCopyAll = async () => {
    await exportUtils.copyToClipboard(data);
    toast.success('Copied entire blueprint to clipboard');
  };

  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownloadMarkdown}
        className="glass px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        <span>Download .md</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownloadPDF}
        className="glass px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopyAll}
        className="glass px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
      >
        <Clipboard className="w-4 h-4" />
        <span>Copy All</span>
      </motion.button>
    </div>
  );
}