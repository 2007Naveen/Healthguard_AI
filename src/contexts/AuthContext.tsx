import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type UserRole = "admin" | "worker" | "public";

interface AuthUser {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// 🔐 FIXED DEFAULT ADMIN
const DEFAULT_ADMIN = {
  email: "admin@healthguard.com",
  password: "admin123",
  role: "admin" as UserRole,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔑 LOGIN
  const login = async (
    email: string,
    password: string,
    role: UserRole
  ) => {
    // ✅ ADMIN LOGIN (NO BACKEND)
    if (role === "admin") {
      if (
        email === DEFAULT_ADMIN.email &&
        password === DEFAULT_ADMIN.password
      ) {
        const adminUser = { email, role: "admin" as UserRole };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        return;
      } else {
        throw new Error("Invalid admin credentials");
      }
    }

    // ✅ WORKER / PUBLIC → BACKEND
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // 📝 SIGNUP (PUBLIC ONLY)
  const signup = async (email: string, password: string) => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        role: "public",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
