import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Shield, HeartPulse, Users, LogIn } from 'lucide-react';

const roles: { value: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'admin', label: 'Admin', icon: <Shield className="w-6 h-6" />, desc: 'Government / Health Authorities' },
  { value: 'worker', label: 'Health Worker', icon: <HeartPulse className="w-6 h-6" />, desc: 'ASHA / Field Staff / Volunteers' },
  { value: 'public', label: 'Public User', icon: <Users className="w-6 h-6" />, desc: 'Citizens / Community Members' },
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('public');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password, selectedRole);
    // Route based on role
    const routes: Record<UserRole, string> = {
      admin: '/admin',
      worker: '/worker',
      public: '/dashboard',
    };
    navigate(routes[selectedRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <HeartPulse className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold font-display text-foreground">HealthWatch NE</h1>
          </div>
          <p className="text-muted-foreground">Smart Community Health Monitoring System</p>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6 border border-border">
          <h2 className="text-lg font-semibold font-display mb-6 text-card-foreground">Sign In</h2>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm ${
                  selectedRole === role.value
                    ? 'border-primary bg-accent text-accent-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                }`}
              >
                {role.icon}
                <span className="font-medium">{role.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mb-6">
            {roles.find(r => r.value === selectedRole)?.desc}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email / Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg gradient-hero text-primary-foreground font-semibold transition-all hover:opacity-90"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            New community member?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
