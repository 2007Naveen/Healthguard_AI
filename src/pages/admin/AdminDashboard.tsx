import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { LayoutDashboard, AlertTriangle, Droplets, Users, FileText, Activity } from 'lucide-react';

const AdminDashboard = () => {
  // All values will be populated from backend API
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<LayoutDashboard className="w-5 h-5" />} label="Villages Monitored" value={null} variant="info" />
          <StatCard icon={<AlertTriangle className="w-5 h-5" />} label="Active Disease Alerts" value={null} variant="danger" />
          <StatCard icon={<Droplets className="w-5 h-5" />} label="Unsafe Water Sources" value={null} variant="warning" />
          <StatCard icon={<FileText className="w-5 h-5" />} label="Reports Received" value={null} variant="success" />
        </div>

        {/* Disease Surveillance placeholder */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Disease Surveillance
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm">
              <option value="">All Districts</option>
              {/* District options will be populated from backend */}
            </select>
            <input type="date" className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm" />
            <input type="date" className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm" />
          </div>
          <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted">
            <p className="text-muted-foreground text-sm">Disease trend chart will be populated from backend API</p>
          </div>
        </div>

        {/* Water Quality Table */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-info" /> Water Quality Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Source ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">pH Level</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Turbidity</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Risk Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-10 text-center text-muted-foreground">
                    Awaiting data from server
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert Control */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" /> Alert & Early Warning Control
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Create Alert</h4>
              <div className="space-y-3">
                <input placeholder="Alert title" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground" />
                <textarea placeholder="Alert description" rows={3} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground resize-none" />
                <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm">
                  <option>Low Severity</option>
                  <option>Medium Severity</option>
                  <option>High Severity</option>
                </select>
                <button className="px-4 py-2 rounded-lg gradient-hero text-primary-foreground text-sm font-medium">
                  Create Alert
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Active Alerts</h4>
              <div className="border border-border rounded-lg p-6 flex items-center justify-center bg-muted">
                <p className="text-muted-foreground text-sm">No active alerts</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> User & Worker Management
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Region</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-10 text-center text-muted-foreground">
                    Awaiting data from server
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
