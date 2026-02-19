import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerSymptoms from "./pages/worker/WorkerSymptoms";
import WorkerWater from "./pages/worker/WorkerWater";
import WorkerAlerts from "./pages/worker/WorkerAlerts";
import PublicDashboard from "./pages/public/PublicDashboard";
import PublicSymptoms from "./pages/public/PublicSymptoms";
import PublicAlerts from "./pages/public/PublicAlerts";
import PublicAwareness from "./pages/public/PublicAwareness";
import HealthChatbot from "./pages/public/HealthChatbot";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole?: string }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<LoginPage />} />

    {/* Admin routes */}
    <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/diseases" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/water" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/alerts" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />

    {/* Worker routes */}
    <Route path="/worker" element={<ProtectedRoute allowedRole="worker"><WorkerDashboard /></ProtectedRoute>} />
    <Route path="/worker/symptoms" element={<ProtectedRoute allowedRole="worker"><WorkerSymptoms /></ProtectedRoute>} />
    <Route path="/worker/water" element={<ProtectedRoute allowedRole="worker"><WorkerWater /></ProtectedRoute>} />
    <Route path="/worker/alerts" element={<ProtectedRoute allowedRole="worker"><WorkerAlerts /></ProtectedRoute>} />

    {/* Public routes */}
    <Route path="/dashboard" element={<ProtectedRoute allowedRole="public"><PublicDashboard /></ProtectedRoute>} />
    <Route path="/dashboard/symptoms" element={<ProtectedRoute allowedRole="public"><PublicSymptoms /></ProtectedRoute>} />
    <Route path="/dashboard/alerts" element={<ProtectedRoute allowedRole="public"><PublicAlerts /></ProtectedRoute>} />
    <Route path="/dashboard/awareness" element={<ProtectedRoute allowedRole="public"><PublicAwareness /></ProtectedRoute>} />
    <Route path="/dashboard/chatbot" element={<ProtectedRoute allowedRole="public"><HealthChatbot /></ProtectedRoute>} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
