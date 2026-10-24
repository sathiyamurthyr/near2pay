"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Mail, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devToken, setDevToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.devResetToken) {
        setDevToken(data.devResetToken);
      }
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-subtle">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-surface-border shadow-card">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-burgundyLight text-brand-burgundy text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Account Recovery</span>
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-primary font-display">
            Reset Your Password
          </h2>
          <p className="text-xs text-neutral-secondary">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4 py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-neutral-primary text-base">Request Processed</h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              If an account with <strong>{email}</strong> exists, password reset instructions have been initiated.
            </p>

            {devToken && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs space-y-1">
                <span className="font-bold text-amber-900 block">Development Sandbox Notice:</span>
                <p className="text-amber-800">Direct password reset link:</p>
                <Link
                  href={`/reset-password?token=${devToken}`}
                  className="font-mono text-brand-burgundy font-bold break-all underline block"
                >
                  /reset-password?token={devToken}
                </Link>
              </div>
            )}

            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-burgundy hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5" htmlFor="forgot-email">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-light" />
                <input
                  id="forgot-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
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
              {loading ? "Processing..." : "Send Reset Link"}
            </Button>

            <div className="pt-4 border-t border-surface-border text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-secondary hover:text-brand-burgundy"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
