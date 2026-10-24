"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { getSafeRedirectUrl } from "@/lib/auth/validation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect");
  const redirectUrl = getSafeRedirectUrl(rawRedirect, "/student-parent-payments");

  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      await refreshUser();
      router.push(redirectUrl);
    } catch {
      setError("Unable to connect to the authentication service. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-subtle">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-surface-border shadow-card">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-burgundyLight text-brand-burgundy text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Customer Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-primary font-display tracking-tight">
            Log in to Near4Pay
          </h2>
          <p className="text-sm text-neutral-secondary">
            Manage your student fee dues, digital receipts, and payment accounts.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-semibold">Authentication Notice</p>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5" htmlFor="login-email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-light" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase text-neutral-secondary" htmlFor="login-password">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-brand-burgundy hover:text-brand-burgundyDark underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-light" />
              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {loading ? "Authenticating securely..." : "Sign In to Account"}
          </Button>

          <div className="pt-4 border-t border-surface-border text-center text-xs text-neutral-secondary">
            <span>Don&apos;t have an account yet? </span>
            <Link
              href={`/register${rawRedirect ? `?redirect=${encodeURIComponent(rawRedirect)}` : ""}`}
              className="font-bold text-brand-burgundy hover:underline"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-neutral-secondary">Loading portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
