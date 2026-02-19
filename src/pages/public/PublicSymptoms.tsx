import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { FileText, CheckCircle } from 'lucide-react';

const symptoms = ['Diarrhea', 'Vomiting', 'Fever', 'Stomach Pain', 'Headache', 'Skin Rash', 'Fatigue', 'Dehydration'];

const PublicSymptoms = () => {
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggle = (s: string) => setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!village || selectedSymptoms.length === 0) return;
    // Send data to backend API here
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setName(''); setVillage(''); setSelectedSymptoms([]); setDuration(''); }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Report Your Symptoms
          </h3>
          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground">Thank you for your report</p>
              <p className="text-sm text-muted-foreground mt-2">A health worker will be notified.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Your Name (optional)</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Village</label>
                <input value={village} onChange={e => setVillage(e.target.value)} placeholder="Your village name" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What symptoms do you have?</label>
                <div className="grid grid-cols-2 gap-2">
                  {symptoms.map(s => (
                    <button key={s} type="button" onClick={() => toggle(s)}
                      className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                        selectedSymptoms.includes(s) ? 'border-primary bg-accent text-accent-foreground font-medium' : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">How long? (e.g., 2 days)</label>
                <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg gradient-hero text-primary-foreground font-semibold text-sm">
                Submit Report
              </button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PublicSymptoms;
