import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { LayoutDashboard, Bell, MapPin, ClipboardList, Droplets, AlertTriangle } from 'lucide-react';

const WorkerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={<MapPin className="w-5 h-5" />} label="Assigned Villages" value={null} variant="info" />
          <StatCard icon={<Bell className="w-5 h-5" />} label="Active Alerts" value={null} variant="warning" />
          <StatCard icon={<ClipboardList className="w-5 h-5" />} label="Tasks Today" value={null} variant="success" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Assigned area */}
          <div className="bg-card rounded-lg border border-border shadow-card p-6">
            <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-info" /> Assigned Area
            </h3>
            <div className="border border-border rounded-lg p-8 flex items-center justify-center bg-muted">
              <p className="text-muted-foreground text-sm">Assigned villages will appear here</p>
            </div>
          </div>

          {/* Active alerts */}
          <div className="bg-card rounded-lg border border-border shadow-card p-6">
            <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Regional Alerts
            </h3>
            <div className="border border-border rounded-lg p-8 flex items-center justify-center bg-muted">
              <p className="text-muted-foreground text-sm">No alerts available</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerDashboard;
