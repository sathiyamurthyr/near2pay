"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Send, Info } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institutionName: "",
    category: "general",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (formData.phone.trim() && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      errs.phone = "Please enter a valid 10-digit Indian phone number.";
    }
    if (!formData.institutionName.trim()) {
      errs.institutionName = "Institution or organisation name is required.";
    }
    if (!formData.message.trim()) {
      errs.message = "Message or enquiry description cannot be empty.";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Please provide at least 15 characters describing your enquiry.";
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

    // Simulate client-side validation check without server transmission
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
          <strong className="font-semibold">Demonstration Mode Notice:</strong> This contact form
          evaluates client-side input validation and error feedback. No information is transmitted to
          a backend server or persisted in cookies/local storage.
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-8 space-y-4 animate-in fade-in">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neutral-primary">
            Enquiry Validated Successfully (Demo)
          </h3>
          <p className="text-sm text-neutral-secondary max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-neutral-primary">{formData.name}</strong>. Your message
            regarding <strong className="text-neutral-primary">{formData.institutionName}</strong> has
            passed all local validation criteria.
          </p>
          <div className="p-3 bg-surface-subtle border border-surface-border rounded-xl text-xs text-neutral-secondary max-w-md mx-auto">
            Live submission pipelines will be enabled during the upcoming production integration phase
            by Sathus Technology Pvt. Ltd.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                institutionName: "",
                category: "general",
                message: "",
              });
            }}
          >
            Submit Another Demo Enquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                Your Full Name <span className="text-brand-burgundy">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Ramesh Kumar"
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
                Official Email Address <span className="text-brand-burgundy">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@school.edu.in"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-rose-300 ring-rose-100 focus:ring-rose-400"
                    : "border-surface-border focus:ring-brand-burgundy"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
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
                placeholder="+91 98765 43210"
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
                Institution Name <span className="text-brand-burgundy">*</span>
              </label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                placeholder="e.g. Modern Public School"
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
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
              Enquiry Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy bg-white"
            >
              <option value="general">General Platform Enquiry</option>
              <option value="schools">School Fee Collection Solutions</option>
              <option value="colleges">College & University Fee Integration</option>
              <option value="coaching">Coaching Centre Instalment Plans</option>
              <option value="partnership">Bank / Payment Partner Integration</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
              Message / Specific Requirements <span className="text-brand-burgundy">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your campus fee requirements, student count, or existing payment methods..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.message
                  ? "border-rose-300 ring-rose-100 focus:ring-rose-400"
                  : "border-surface-border focus:ring-brand-burgundy"
              }`}
            />
            {errors.message && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            fullWidth
            icon={<Send className="w-4 h-4" />}
          >
            {isSubmitting ? "Validating Enquiry..." : "Submit Message (Demo Mode)"}
          </Button>
        </form>
      )}
    </div>
  );
};
