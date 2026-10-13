import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck2,
  AlertCircle,
  Database,
  Server,
  EyeOff,
  Info,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Security, Trust & Compliance Principles — Near2Pay",
  description:
    "Learn about Near2Pay's planned security architecture: 256-bit encryption, role-based access control, transaction verification, and adherence to Indian financial data protection principles.",
};

export default function SecurityPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Security & Trust" }]} className="mb-4" />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Security Principles</Badge>
              <Badge variant="neutral">Data Integrity</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Security, Data Protection & Trust Principles
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Educational fee data demands unwavering privacy, institutional confidentiality, and financial auditability. Learn about the engineering principles guiding Near2Pay by Sathus Technology Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>

      {/* ROADMAP / ACCURACY DISCLAIMER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">Transparency & Roadmap Notice:</h4>
            <p>
              This page describes the architectural standards and security design principles planned for the Near2Pay platform.
              Near2Pay does not claim third-party certifications (such as ISO 27001 or PCI-DSS Level 1) or independent security audits that have not yet been formally completed. All security safeguards will be verified during full commercial deployment.
            </p>
          </div>
        </div>
      </div>

      {/* 4 CORE SECURITY PILLARS */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Guiding Architecture"
          title="The Four Pillars of Near2Pay Security"
          subtitle="Engineered to protect student identities, family banking confidentiality, and institutional ledger records."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-primary font-display">
              1. Data Protection & In-Transit Encryption
            </h3>
            <p className="text-sm text-neutral-secondary leading-relaxed">
              All communications between parents&apos; web browsers, institution dashboards, and payment servers are planned to use 256-bit TLS (Transport Layer Security) encryption. Sensitive fields such as student identifiers and parent phone numbers are treated with strict confidentiality.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Modern TLS 1.3 cryptographic cipher suites</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero client-side storage of financial credentials or CVV numbers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted database fields for student parent phone records</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-primary font-display">
              2. Granular Role-Based Access Control (RBAC)
            </h3>
            <p className="text-sm text-neutral-secondary leading-relaxed">
              School accountants, cashiers, class teachers, and trustees operate with distinct, compartmentalized permission levels. Cashiers can only inspect daily receipts, while structural fee changes and bank account settings require multi-step administrative authorizations.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Role separation: Accountant, Cashier, Principal, Trustee</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Two-Factor Authentication (2FA) for administrative access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Session timeouts on shared school administration computers</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-primary font-display">
              3. Cryptographic Transaction Verification
            </h3>
            <p className="text-sm text-neutral-secondary leading-relaxed">
              Every digital receipt generated by Near2Pay includes a cryptographic hash and verification QR code. This prevents altered or fraudulent paper receipts from being submitted to school counters or tax authorities.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Unique tamper-evident receipt verification stamp</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Bank UTR cross-reference for every issued receipt</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Immediate detection of duplicate transaction submissions</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-primary font-display">
              4. Immutable Audit Logs & Traceability
            </h3>
            <p className="text-sm text-neutral-secondary leading-relaxed">
              All financial actions—including fee waiver authorizations, student grade transfers, concession approvals, and settlement account modifications—generate immutable audit entries with timestamps, staff user IDs, and IP addresses.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Comprehensive audit trails ready for annual chartered accountants review</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Permanent historical transaction records</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Exportable verification bundles for institutional governance</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* INDIAN DATA RESIDENCY & ETHICS */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <Badge variant="burgundy">Data Sovereignty</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary font-display">
            Planned Indian Data Residency & Student Privacy
          </h2>
          <p className="text-sm text-neutral-secondary leading-relaxed max-w-2xl mx-auto">
            Near2Pay adheres to strict principles regarding student data. Educational records belong exclusively to the enrolled student and their educational institution. We will never monetize student demographic data, share contact lists with commercial lenders, or display third-party advertisements.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button href="/contact" variant="outline">
              Inquire About Data Governance
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
