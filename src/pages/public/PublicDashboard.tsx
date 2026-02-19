import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { HeartPulse, Droplets, AlertTriangle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicDashboard = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<HeartPulse className="w-5 h-5" />} label="Local Health Status" value={null} variant="success" />
        <StatCard icon={<Droplets className="w-5 h-5" />} label="Water Safety" value={null} variant="info" />
        <StatCard icon={<AlertTriangle className="w-5 h-5" />} label="Active Alerts" value={null} variant="warning" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-3">Health Status</h3>
          <div className="border border-border rounded-lg p-8 flex items-center justify-center bg-muted">
            <p className="text-muted-foreground text-sm">Health data will be displayed here</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-3">Water Safety</h3>
          <div className="border border-border rounded-lg p-8 flex items-center justify-center bg-muted">
            <p className="text-muted-foreground text-sm">Water quality data will be displayed here</p>
          </div>
        </div>
      </div>

      <Link to="/dashboard/chatbot" className="block bg-accent rounded-lg border border-primary/20 shadow-card p-6 hover:shadow-card-hover transition-all">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Health Assistant</h3>
            <p className="text-sm text-muted-foreground">Get basic health guidance and preventive care tips</p>
          </div>
        </div>
      </Link>
    </div>
  </DashboardLayout>
);

export default PublicDashboard;
