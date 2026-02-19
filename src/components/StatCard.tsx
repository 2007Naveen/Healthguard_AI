import React from 'react';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number | null;
  trend?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const variantStyles = {
  default: 'border-border',
  success: 'border-success/30 bg-success/5',
  warning: 'border-warning/30 bg-warning/5',
  danger: 'border-danger/30 bg-danger/5',
  info: 'border-info/30 bg-info/5',
};

const iconStyles = {
  default: 'bg-accent text-accent-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-info/10 text-info',
};

const StatCard = ({ icon, label, value, trend, variant = 'default' }: StatCardProps) => (
  <div className={`bg-card rounded-lg border p-5 shadow-card transition-all hover:shadow-card-hover animate-fade-in ${variantStyles[variant]}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold font-display text-card-foreground mt-1">
          {value !== null && value !== undefined ? value : <span className="text-muted-foreground text-base">—</span>}
        </p>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </div>
      <div className={`p-2.5 rounded-lg ${iconStyles[variant]}`}>{icon}</div>
    </div>
  </div>
);

export default StatCard;
