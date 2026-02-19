import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ClipboardList, CheckCircle } from 'lucide-react';

const symptoms = [
  'Diarrhea', 'Vomiting', 'Fever', 'Abdominal Pain', 'Dehydration',
  'Nausea', 'Skin Rash', 'Jaundice', 'Fatigue', 'Loss of Appetite'
];

const WorkerSymptoms = () => {
  const [village, setVillage] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!village || !ageGroup || selectedSymptoms.length === 0) return;
    // Send symptom data to backend API here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setVillage(''); setAgeGroup(''); setSelectedSymptoms([]); setDuration('');
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h3 className="font-display font-semibold text-card-foreground mb-6 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" /> Symptom Data Collection
          </h3>

          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground">Report Submitted Successfully</p>
              <p className="text-sm text-muted-foreground mt-2">The data has been recorded.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Village / Location</label>
                <input value={village} onChange={e => setVillage(e.target.value)} placeholder="Enter village name" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Patient Age Group</label>
                <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm" required>
                  <option value="">Select age group</option>
                  <option>0-5 years</option>
                  <option>6-12 years</option>
                  <option>13-18 years</option>
                  <option>19-45 years</option>
                  <option>46-60 years</option>
                  <option>60+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Symptoms Observed</label>
                <div className="grid grid-cols-2 gap-2">
                  {symptoms.map(s => (
                    <button key={s} type="button" onClick={() => toggleSymptom(s)}
                      className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                        selectedSymptoms.includes(s) ? 'border-primary bg-accent text-accent-foreground font-medium' : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Duration</label>
                <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 3 days" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg gradient-hero text-primary-foreground font-semibold text-sm">
                Submit Symptom Report
              </button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerSymptoms;
