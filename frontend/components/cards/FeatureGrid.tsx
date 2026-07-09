'use client';

import FeatureCard from './FeatureCard';
import { Box, Database, Zap, Map, DollarSign, Cloud } from 'lucide-react';

const features = [
  {
    title: 'Smart Budget',
    description: "A budget that fits your lifestyle, not the other way around",
    icon: DollarSign,
  },
  {
    title: 'Analytics',
    description: 'Analytics empowers individuals and businesses to make smarter',
    icon: Box,
  },
  {
    title: 'Spending',
    description: 'Spending is the way individuals and businesses use their fina',
    icon: Zap,
  },
];

export default function FeatureGrid() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
}
