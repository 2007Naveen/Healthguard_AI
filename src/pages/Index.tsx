import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Shield, Activity, Droplets, ArrowRight, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const steps = [
  { icon: <Droplets className="w-8 h-8" />, title: 'Monitor Water Sources', desc: 'Health workers collect and report water quality data from rural sources.' },
  { icon: <Activity className="w-8 h-8" />, title: 'Track Health Symptoms', desc: 'Citizens and workers report symptoms for real-time disease surveillance.' },
  { icon: <AlertTriangle className="w-8 h-8" />, title: 'Early Warning Alerts', desc: 'System detects risk patterns and sends alerts to authorities and communities.' },
  { icon: <CheckCircle className="w-8 h-8" />, title: 'Rapid Response', desc: 'Authorities coordinate interventions to prevent disease outbreaks.' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Rural healthcare monitoring" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <HeartPulse className="w-12 h-12 text-primary-foreground" />
            <span className="text-2xl font-display font-bold text-primary-foreground">HealthWatch NE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground leading-tight mb-6">
            Protecting Rural Communities Through Early Health Intelligence
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            A smart community health monitoring and early warning system for water-borne diseases in Northeast India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg gradient-hero text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Users className="w-6 h-6 text-primary" />, label: 'Villages Monitored', id: 'totalVillages' },
            { icon: <AlertTriangle className="w-6 h-6 text-warning" />, label: 'Active Health Alerts', id: 'activeAlerts' },
            { icon: <Droplets className="w-6 h-6 text-info" />, label: 'Water Sources Tested', id: 'waterTested' },
            { icon: <Shield className="w-6 h-6 text-success" />, label: 'Lives Impacted', id: 'livesImpacted' },
          ].map((stat) => (
            <div key={stat.id} className="text-center p-6 rounded-lg bg-background border border-border animate-fade-in">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold font-display text-foreground" id={stat.id}>—</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">How the System Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center p-6 rounded-lg border border-border bg-card shadow-card hover:shadow-card-hover transition-all animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
                <h3 className="font-display font-semibold text-card-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HeartPulse className="w-6 h-6 text-sidebar-primary" />
            <span className="font-display font-bold text-sidebar-primary">HealthWatch NE</span>
          </div>
          <p className="text-sidebar-foreground/70 text-sm">
            Smart India Hackathon 2025 • SIH25008 • Community Health Monitoring System
          </p>
          <p className="text-sidebar-foreground/50 text-xs mt-2">Emergency Helpline: 108 | Health Helpline: 104</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
