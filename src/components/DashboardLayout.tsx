import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  HeartPulse, LayoutDashboard, Activity, Droplets, AlertTriangle,
  Users, LogOut, Menu, X, FileText, ClipboardList, Bell, BookOpen, MessageCircle
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Disease Surveillance', path: '/admin/diseases', icon: <Activity className="w-5 h-5" /> },
  { label: 'Water Quality', path: '/admin/water', icon: <Droplets className="w-5 h-5" /> },
  { label: 'Alerts', path: '/admin/alerts', icon: <AlertTriangle className="w-5 h-5" /> },
  { label: 'User Management', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
];

const workerNav: NavItem[] = [
  { label: 'Dashboard', path: '/worker', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Report Symptoms', path: '/worker/symptoms', icon: <ClipboardList className="w-5 h-5" /> },
  { label: 'Water Samples', path: '/worker/water', icon: <Droplets className="w-5 h-5" /> },
  { label: 'Alerts & Tasks', path: '/worker/alerts', icon: <Bell className="w-5 h-5" /> },
];

const publicNav: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Report Symptoms', path: '/dashboard/symptoms', icon: <FileText className="w-5 h-5" /> },
  { label: 'Alerts', path: '/dashboard/alerts', icon: <AlertTriangle className="w-5 h-5" /> },
  { label: 'Health Tips', path: '/dashboard/awareness', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Health Assistant', path: '/dashboard/chatbot', icon: <MessageCircle className="w-5 h-5" /> },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = user?.role === 'admin' ? adminNav : user?.role === 'worker' ? workerNav : publicNav;
  const roleLabel = user?.role === 'admin' ? 'Admin Panel' : user?.role === 'worker' ? 'Health Worker' : 'Community Portal';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
            <HeartPulse className="w-7 h-7 text-sidebar-primary" />
            <div>
              <h1 className="font-display font-bold text-sidebar-primary text-lg leading-tight">HealthWatch NE</h1>
              <span className="text-xs text-sidebar-foreground/70">{roleLabel}</span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 py-4 border-t border-sidebar-border">
            <div className="text-xs text-sidebar-foreground/60 mb-2 px-3 truncate">{user?.email}</div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 w-full transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-3 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-display font-semibold text-foreground text-lg">
            {navItems.find(n => n.path === location.pathname)?.label || 'Dashboard'}
          </h2>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
