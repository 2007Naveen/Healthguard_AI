import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { HeartPulse, Users, UserPlus, CheckCircle } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Backend signup API will be integrated here
    setSubmitted(true);
    setTimeout(() => {
      login(email, password, 'public');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <HeartPulse className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold font-display text-foreground">HealthWatch NE</h1>
          </div>
          <p className="text-muted-foreground">Join your community health network</p>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6 border border-border">
          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <p className="text-lg font-semibold font-display text-card-foreground">Account Created!</p>
              <p className="text-sm text-muted-foreground mt-2">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent">
                  <Users className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold font-display text-card-foreground">Public User Sign Up</h2>
                  <p className="text-xs text-muted-foreground">Citizens / Community Members</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm animate-fade-in">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Village / Location</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="Enter your village name"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min 6 characters)"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg gradient-hero text-primary-foreground font-semibold transition-all hover:opacity-90"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-5">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
