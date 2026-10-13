import React from "react";
import { Calendar, CheckCircle2, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoRequestForm } from "@/components/forms/DemoRequestForm";

export const metadata = {
  title: "Request a Product Demo — Near2Pay",
  description:
    "Schedule an interactive product walkthrough of Near2Pay for your school, college, or coaching institute. Experience customized fee structures, automated reminders, and bank reconciliation.",
};

export default function RequestDemoPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Request a Demo" }]} className="mb-4" />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="orange">Personalized Walkthrough</Badge>
              <Badge variant="burgundy">For Institutional Leaders</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              See Near2Pay in Action for Your Campus
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Discover how Near2Pay can be customized for your institution&apos;s specific fee heads, instalment schedules, and accounting software. Fill in the parameters below to test the demonstration request workflow.
            </p>
          </div>
        </div>
      </div>

      {/* FORM & VALUE PROPOSITION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: What You'll Experience in a Demo */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-primary font-display">
                What We Cover in a Product Walkthrough
              </h2>
              <p className="text-sm text-neutral-secondary mt-2 leading-relaxed">
                A 30-minute tailored overview focused exclusively on eliminating your campus fee collection challenges:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-surface-border bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-primary">
                  <CheckCircle2 className="w-4 h-4 text-brand-burgundy" />
                  <span>Custom Fee Head Mapping</span>
                </div>
                <p className="text-xs text-neutral-secondary pl-6 leading-relaxed">
                  We show how your current fee tiers (tuition, exam, transport routes, and hostel charges) configure into Near2Pay.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-surface-border bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-primary">
                  <CheckCircle2 className="w-4 h-4 text-brand-burgundy" />
                  <span>Automated WhatsApp Link Demonstration</span>
                </div>
                <p className="text-xs text-neutral-secondary pl-6 leading-relaxed">
                  Experience firsthand how parents receive one-tap UPI payment notices on their smartphones.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-surface-border bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-primary">
                  <CheckCircle2 className="w-4 h-4 text-brand-burgundy" />
                  <span>Bank Statement Reconciliation Preview</span>
                </div>
                <p className="text-xs text-neutral-secondary pl-6 leading-relaxed">
                  Inspect our T+1 automated settlement match system that eliminates manual bank passbook tallying.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-surface-border bg-surface-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-primary">
                  <CheckCircle2 className="w-4 h-4 text-brand-orangeDark" />
                  <span>Data Migration Support Plan</span>
                </div>
                <p className="text-xs text-neutral-secondary pl-6 leading-relaxed">
                  Learn how easy it is to import existing student records from Excel or legacy school ERP systems.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Demo Booking Form */}
          <div className="lg:col-span-7">
            <DemoRequestForm />
          </div>
        </div>
      </section>
    </div>
  );
}
