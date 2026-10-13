"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Calendar, Sparkles, Shield, Info } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export const DemoRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    workEmail: "",
    phone: "",
    institutionType: "School",
    institutionName: "",
    studentCount: "500-1500",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Contact name is required.";
    }
    if (!formData.workEmail.trim()) {
      errs.workEmail = "Work or official email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = "Please enter a valid official email address.";
    }
    if (formData.phone.trim() && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      errs.phone = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (!formData.institutionName.trim()) {
      errs.institutionName = "Institution name is required.";
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-surface-border shadow-card">
      {/* Demo Notification Notice */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Demonstration Mode Notice:</strong> This schedule
          booking form runs entirely client-side. No calendar bookings or marketing emails are dispatched.
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-8 space-y-4 animate-in fade-in">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neutral-primary">
            Demo Request Validated (Simulation)
          </h3>
          <p className="text-sm text-neutral-secondary max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-neutral-primary">{formData.name}</strong> from{" "}
            <strong className="text-neutral-primary">{formData.institutionName}</strong>. Your
            parameters for <strong className="text-brand-burgundy">{formData.studentCount} students</strong>{" "}
            have been processed locally.
          </p>
          <div className="p-3 bg-surface-subtle border border-surface-border rounded-xl text-xs text-neutral-secondary max-w-md mx-auto">
            Live enterprise demonstration scheduling will be activated with Sathus Technology&apos;s
            onboarding team upon general release.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                workEmail: "",
                phone: "",
                institutionType: "School",
                institutionName: "",
                studentCount: "500-1500",
                message: "",
              });
            }}
          >
            Schedule Another Simulated Demo
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                Representative Name <span className="text-brand-burgundy">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Principal S. Sharma"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-rose-300 ring-rose-100 focus:ring-rose-400"
                    : "border-surface-border focus:ring-brand-burgundy"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                Work / Official Email <span className="text-brand-burgundy">*</span>
              </label>
              <input
                type="email"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="admin@institution.edu.in"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.workEmail
                    ? "border-rose-300 ring-rose-100 focus:ring-rose-400"
                    : "border-surface-border focus:ring-brand-burgundy"
                }`}
              />
              {errors.workEmail && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.workEmail}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                Phone Number <span className="text-neutral-light">(Optional)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-rose-300 ring-rose-100 focus:ring-rose-400"
                    : "border-surface-border focus:ring-brand-burgundy"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                Institution Type
              </label>
              <select
                value={formData.institutionType}
                onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy bg-white"
              >
                <option value="School">School (CBSE / ICSE / State Board)</option>
                <option value="College">College / Autonomous University</option>
                <option value="Coaching">Coaching Centre / Test Prep</option>
                <option value="Multi-Campus">Multi-Campus Educational Group</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                Institution Name <span className="text-brand-burgundy">*</span>
              </label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                placeholder="e.g. St. Xavier's Academy"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.institutionName
                    ? "border-rose-300 ring-rose-100 focus:ring-rose-400"
                    : "border-surface-border focus:ring-brand-burgundy"
                }`}
              />
              {errors.institutionName && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.institutionName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                Approximate Student Count <span className="text-neutral-light">(Optional)</span>
              </label>
              <select
                value={formData.studentCount}
                onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy bg-white"
              >
                <option value="Under 500">Under 500 students</option>
                <option value="500-1500">500 – 1,500 students</option>
                <option value="1500-5000">1,500 – 5,000 students</option>
                <option value="5000+">5,000+ students (Enterprise)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
              Specific Objectives / Current Pain Points <span className="text-neutral-light">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Need automated reconciliation for 3,000 students across 3 fee instalments..."
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            fullWidth
            icon={<Calendar className="w-4 h-4" />}
          >
            {isSubmitting ? "Validating Demo Request..." : "Request Product Walkthrough (Demo)"}
          </Button>
        </form>
      )}
    </div>
  );
};
