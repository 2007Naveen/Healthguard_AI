import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { AlertTriangle } from 'lucide-react';

const PublicAlerts = () => (
  <DashboardLayout>
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" /> Alerts & Advisories
        </h3>
        <div className="border border-border rounded-lg p-10 flex items-center justify-center bg-muted">
          <p className="text-muted-foreground text-sm">No active alerts for your area</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default PublicAlerts;
