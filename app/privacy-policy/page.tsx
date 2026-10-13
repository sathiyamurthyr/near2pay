import React from "react";
import Link from "next/link";
import { Shield, AlertCircle, FileText } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_DETAILS } from "@/data/company";

export const metadata = {
  title: "Privacy Policy (Draft for Review) — Near2Pay",
  description:
    "Draft privacy policy for the Near2Pay platform by Sathus Technology Pvt. Ltd., detailing student data protection principles, purpose limitation, and demonstration website scope.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="neutral">Draft Legal Document</Badge>
              <Badge variant="demo">Pending Legal Review</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-neutral-secondary">
              Product: <strong>Near2Pay</strong> • Parent Entity:{" "}
              <strong>Sathus Technology Pvt. Ltd.</strong> • Status: Pre-Launch Draft (Subject to Legal Review)
            </p>
          </div>
        </div>
      </div>

      {/* POLICY CONTENT */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 mb-8 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">Demonstration Scope Disclaimer:</h4>
            <p>
              This draft policy outlines the planned privacy framework for the upcoming commercial release of Near2Pay.
              The current website is a frontend-only demonstration that does not collect, process, or store real student, parental, or institutional data.
              This document is marked for formal legal review prior to production publication.
            </p>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none space-y-8 text-sm text-neutral-secondary leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              1. Introduction &amp; Ownership
            </h2>
            <p>
              Near2Pay is a fintech software initiative operated by{" "}
              <strong>Sathus Technology Pvt. Ltd.</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to protecting the privacy of educational institutions, students, parents, and guardians who interact with our services in India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              2. Demonstration Website Limitations
            </h2>
            <p>
              Visitors should note that this current website release functions solely as a technology preview. Features simulating student lookups, fee calculations, and transaction checkouts operate using synthetic, hard-coded sample records. No personally identifiable information (PII) or banking credentials are requested, collected, or retained.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              3. Information Planned for Future Production Collection
            </h2>
            <p>
              Upon live commercial deployment, Near2Pay will act primarily as a Data Processor on behalf of educational institutions (the Data Fiduciaries). The platform will process only necessary details, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Student Admission / Roll Number, Student Name, Standard/Grade, and Section.</li>
              <li>Parent or Guardian contact phone number and email address for receipt dispatch.</li>
              <li>Fee breakdown details (tuition, transport route, lab dues).</li>
              <li>Transaction reference identifiers, bank UTRs, and payment status stamps.</li>
            </ul>
            <p>
              Near2Pay will never store debit/credit card CVVs, net banking passwords, or UPI PINs. All payment tokenization will be processed exclusively through RBI-authorized payment aggregators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              4. Purpose Limitation &amp; Student Data Protection
            </h2>
            <p>
              Sathus Technology Pvt. Ltd. maintains a strict ethical policy regarding student information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Student data will be used solely for fee processing, receipt issuance, and institutional reconciliation.</li>
              <li>We will not sell, rent, or lease student or parental contact lists to third-party commercial lenders, marketing aggregators, or educational advertisers.</li>
              <li>We will not profile students for behavioral or advertising purposes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              5. Data Security Principles
            </h2>
            <p>
              In our planned production environment, all data in transit will be protected by 256-bit TLS encryption. Access by institutional personnel will be governed by strict role-based controls and two-factor authentication.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              6. Legal Contact &amp; Grievance Redressal
            </h2>
            <p>
              For questions regarding this draft policy or future data governance standards, please contact Sathus Technology Pvt. Ltd.:
            </p>
            <div className="p-4 rounded-xl border border-surface-border bg-surface-subtle text-xs text-neutral-primary font-mono space-y-1">
              <div>{COMPANY_DETAILS.name}</div>
              <div>Attention: Privacy &amp; Data Governance Office</div>
              <div>HQ: {COMPANY_DETAILS.hq.fullAddress}</div>
              <div>Email: {COMPANY_DETAILS.contact.email} / {COMPANY_DETAILS.contact.supportEmail}</div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
