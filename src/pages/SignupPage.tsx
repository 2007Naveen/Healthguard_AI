import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HeartPulse, UserPlus, CheckCircle } from "lucide-react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [village, setVillage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // ✅ AuthContext handles backend + storage
      await signup(email, password);

      setSubmitted(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <HeartPulse className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold">HealthWatch NE</h1>
          </div>
          <p className="text-muted-foreground">
            Join your community health network
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border shadow">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <p className="text-lg font-semibold">Account Created!</p>
              <p className="text-sm text-muted-foreground">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 rounded bg-danger/10 text-danger text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />

                <input
                  type="text"
                  placeholder="Village / Location"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded bg-primary text-white font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </button>
              </form>

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-primary underline">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
