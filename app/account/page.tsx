"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Receipt,
  LogOut,
  Edit2,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building,
} from "lucide-react";

export default function AccountPage() {
  const { user, loading, logout, refreshUser } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 text-sm text-neutral-secondary">
        Verifying customer credentials...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-brand-burgundy" />
        <h2 className="text-2xl font-bold text-neutral-primary">Authentication Required</h2>
        <p className="text-sm text-neutral-secondary max-w-md">
          Please log in with your Near4Pay account to access your customer profile and payment records.
        </p>
        <Button href="/login" variant="primary">
          Log In to Account
        </Button>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error || "Failed to update profile.");
        return;
      }

      await refreshUser();
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-surface-subtle min-h-[85vh] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-burgundy text-white flex items-center justify-center font-bold text-2xl font-display shadow-md">
              {user.name ? user.name.slice(0, 2).toUpperCase() : "U"}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-neutral-primary font-display">
                  {user.name}
                </h1>
                <Badge variant="burgundy">{user.role.toUpperCase()}</Badge>
              </div>
              <p className="text-xs text-neutral-secondary flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-light" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/account/orders"
              variant="outline"
              size="md"
              icon={<Receipt className="w-4 h-4" />}
            >
              Order & Payment History
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              size="md"
              className="text-rose-600 hover:text-rose-700 hover:border-rose-300"
              icon={<LogOut className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        {saveError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-surface-border shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-border">
              <div>
                <h3 className="text-lg font-bold text-neutral-primary">Customer Profile Details</h3>
                <p className="text-xs text-neutral-secondary">
                  Your registered contact details used for digital payment receipts.
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-burgundy hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1">
                    Email Address (Immutable Login ID)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-subtle text-sm text-neutral-secondary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name || "");
                      setPhone(user.phone || "");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={saving}>
                    {saving ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-surface-subtle rounded-2xl border border-surface-border space-y-1">
                  <span className="text-xs text-neutral-secondary font-semibold uppercase">Customer Name</span>
                  <p className="font-bold text-neutral-primary">{user.name}</p>
                </div>

                <div className="p-4 bg-surface-subtle rounded-2xl border border-surface-border space-y-1">
                  <span className="text-xs text-neutral-secondary font-semibold uppercase">Email Address</span>
                  <p className="font-bold text-neutral-primary">{user.email}</p>
                </div>

                <div className="p-4 bg-surface-subtle rounded-2xl border border-surface-border space-y-1">
                  <span className="text-xs text-neutral-secondary font-semibold uppercase">Mobile Phone</span>
                  <p className="font-bold text-neutral-primary">{user.phone || "Not provided"}</p>
                </div>

                <div className="p-4 bg-surface-subtle rounded-2xl border border-surface-border space-y-1">
                  <span className="text-xs text-neutral-secondary font-semibold uppercase">Account Role</span>
                  <p className="font-bold text-neutral-primary capitalize">{user.role}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions & Security */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card space-y-4">
              <h3 className="text-base font-bold text-neutral-primary">Quick Navigation</h3>
              <div className="space-y-2">
                <Button
                  href="/student-parent-payments"
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<CreditCard className="w-4 h-4" />}
                >
                  Pay Educational Fees
                </Button>
                <Button
                  href="/account/orders"
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={<Receipt className="w-4 h-4" />}
                >
                  View Receipts
                </Button>
              </div>
            </div>

            <div className="bg-brand-burgundyLight/40 p-6 rounded-3xl border border-brand-burgundy/20 space-y-3">
              <div className="flex items-center gap-2 text-brand-burgundy font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Security Assurance</span>
              </div>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                Your account is protected with salted scrypt encryption, session-level token invalidation, and strict role-based access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
