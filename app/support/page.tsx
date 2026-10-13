import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  AlertTriangle,
  Receipt,
  RotateCcw,
  Search,
  MessageSquare,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Help & Support Hub — Near2Pay by Sathus Technology",
  description:
    "Near2Pay customer support hub: Common fee payment troubleshooting, digital receipt verification guides, bank reconciliation assistance, and support contacts.",
};

const TROUBLESHOOTING_TOPICS = [
  {
    icon: <RotateCcw className="w-5 h-5 text-brand-burgundy" />,
    title: "Amount Debited but Fee Receipt Not Generated?",
    desc: "In rare instances of mobile network dropouts, amounts debited are held in bank escrow. Our planned reconciliation automatically re-checks status and delivers receipts within 15 minutes, or reverses funds within standard RBI windows.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-brand-orangeDark" />,
    title: "How to Download a Past Fee Receipt?",
    desc: "Visit the Student & Parent Payment portal, select your institution, and enter your Admission Number. Your complete chronological payment ledger and PDF receipt download buttons will appear on screen.",
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-brand-burgundy" />,
    title: "Duplicate Deduction by Mistake?",
    desc: "If a double payment occurs due to clicking pay twice, one transaction automatically flags as a duplicate. Once verified by the institution nodal bank, the excess deduction will be scheduled for automatic reversal.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    title: "Need an Income Tax 80C Fee Certificate?",
    desc: "Digital receipts generated on Near2Pay itemize tuition fees distinctly from transport and uniform levies, making them fully compliant for parental 80C deduction submissions.",
  },
];

export default function SupportPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Support Hub" }]} className="mb-4" />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Help &amp; Guidance</Badge>
              <Badge variant="neutral">Support Hub</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Near2Pay Help &amp; Support Hub
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Find instant troubleshooting guidance for parents and institutions, explore frequently encountered payment questions, or submit a support query.
            </p>
          </div>
        </div>
      </div>

      {/* TOP TROUBLESHOOTING ARTICLES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-surface-border">
        <SectionHeader
          badge="Troubleshooting Guides"
          title="Common Questions &amp; Solutions"
          subtitle="Quick answers to common payment status and receipt verification queries."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TROUBLESHOOTING_TOPICS.map((topic, i) => (
            <Card key={i} hoverable className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle flex items-center justify-center">
                  {topic.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-primary font-display">
                  {topic.title}
                </h3>
              </div>
              <p className="text-xs text-neutral-secondary leading-relaxed pl-13">
                {topic.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CONTACT & SUPPORT FORM */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-primary font-display">
                Need Dedicated Assistance?
              </h2>
              <p className="text-sm text-neutral-secondary mt-2 leading-relaxed">
                If your query cannot be resolved via our self-help guides, our team at Sathus Technology Pvt. Ltd. is standing by.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-surface-border bg-surface-subtle space-y-4 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-neutral-secondary">
                  Official Support Email
                </span>
                <div className="font-bold text-sm text-neutral-primary mt-1">
                  support@near2pay.com
                </div>
                <div className="text-neutral-secondary mt-0.5">
                  Expected response within 24 business hours
                </div>
              </div>

              <div className="pt-3 border-t border-surface-border">
                <span className="font-bold uppercase tracking-wider text-neutral-secondary">
                  Institution Dedicated Hotline
                </span>
                <div className="font-bold text-sm text-neutral-primary mt-1">
                  +91 (0) 80 ••••••••
                </div>
                <div className="text-neutral-secondary mt-0.5">
                  Available for registered campus accounts during business hours
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
