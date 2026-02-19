import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Bell } from 'lucide-react';

const WorkerAlerts = () => (
  <DashboardLayout>
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-warning" /> Alerts & Tasks
        </h3>
        <div className="border border-border rounded-lg p-10 flex items-center justify-center bg-muted">
          <p className="text-muted-foreground text-sm">No alerts available</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default WorkerAlerts;
