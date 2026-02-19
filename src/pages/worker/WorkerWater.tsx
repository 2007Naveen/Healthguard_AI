import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Droplets, CheckCircle } from 'lucide-react';

const WorkerWater = () => {
  const [sourceId, setSourceId] = useState('');
  const [ph, setPh] = useState('');
  const [turbidity, setTurbidity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getRiskLevel = () => {
    const phNum = parseFloat(ph);
    const turbNum = parseFloat(turbidity);
    if (!phNum || !turbNum) return null;
    if (phNum < 6.5 || phNum > 8.5 || turbNum > 5) return 'danger';
    if (phNum < 6.8 || phNum > 8.2 || turbNum > 3) return 'warning';
    return 'safe';
  };

  const risk = getRiskLevel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceId || !ph || !turbidity) return;
    // Send water sample data to backend API here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSourceId(''); setPh(''); setTurbidity(''); setTemperature('');
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-6 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-info" /> Water Sample Entry
          </h3>

          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground">Sample Recorded</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Water Source ID / Name</label>
                <input value={sourceId} onChange={e => setSourceId(e.target.value)} placeholder="e.g., Village Pond A" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">pH Level</label>
                  <input type="number" step="0.1" value={ph} onChange={e => setPh(e.target.value)} placeholder="6.5-8.5" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Turbidity (NTU)</label>
                  <input type="number" step="0.1" value={turbidity} onChange={e => setTurbidity(e.target.value)} placeholder="0-10" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Temperature °C</label>
                  <input type="number" step="0.1" value={temperature} onChange={e => setTemperature(e.target.value)} placeholder="20-35" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm" />
                </div>
              </div>

              {risk && (
                <div className={`p-4 rounded-lg border animate-fade-in ${
                  risk === 'safe' ? 'bg-success/10 border-success/30 text-success' :
                  risk === 'warning' ? 'bg-warning/10 border-warning/30 text-warning' :
                  'bg-danger/10 border-danger/30 text-danger'
                }`}>
                  <p className="font-semibold text-sm">
                    Risk Assessment: {risk === 'safe' ? '✅ Safe' : risk === 'warning' ? '⚠️ Warning' : '🔴 Danger'}
                  </p>
                </div>
              )}

              <button type="submit" className="w-full py-2.5 rounded-lg gradient-hero text-primary-foreground font-semibold text-sm">
                Submit Water Sample
              </button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerWater;
