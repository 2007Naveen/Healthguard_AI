import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { BookOpen, Droplets, ShieldCheck, Apple, HandHelping } from 'lucide-react';

const tips = [
  { icon: <Droplets className="w-6 h-6" />, title: 'Boil Drinking Water', desc: 'Always boil water for at least 1 minute before drinking, especially during monsoon season.' },
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Wash Hands Regularly', desc: 'Wash hands with soap before eating, after using the toilet, and after handling animals.' },
  { icon: <Apple className="w-6 h-6" />, title: 'Eat Fresh Food', desc: 'Avoid eating stale or uncovered food. Wash fruits and vegetables before consumption.' },
  { icon: <HandHelping className="w-6 h-6" />, title: 'Seek Help Early', desc: 'If you experience diarrhea, vomiting, or fever for more than 2 days, visit a health center immediately.' },
];

const PublicAwareness = () => (
  <DashboardLayout>
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <h3 className="font-display font-semibold text-card-foreground mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Health Awareness & Tips
        </h3>
        <div className="space-y-4">
          {tips.map((tip, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg border border-border bg-background hover:shadow-card transition-all animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="p-2 rounded-lg bg-accent text-accent-foreground shrink-0">{tip.icon}</div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default PublicAwareness;
