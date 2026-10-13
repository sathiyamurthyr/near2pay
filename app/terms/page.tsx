import React from "react";
import Link from "next/link";
import { AlertCircle, FileText } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Terms & Conditions (Draft for Review) — Near2Pay",
  description:
    "Draft Terms & Conditions for the Near2Pay platform by Sathus Technology Pvt. Ltd., establishing informational website terms, demonstration scope, and intellectual property.",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Terms & Conditions" }]} className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="neutral">Draft Legal Terms</Badge>
              <Badge variant="demo">Pending Legal Review</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm sm:text-base text-neutral-secondary">
              Product: <strong>Near2Pay</strong> • Owner:{" "}
              <strong>Sathus Technology Pvt. Ltd.</strong> • Status: Pre-Launch Draft
            </p>
          </div>
        </div>
      </div>

      {/* TERMS CONTENT */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 mb-8 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">Demonstration Release Limitation:</h4>
            <p>
              These draft terms govern access to the Near2Pay informational website. No binding commercial fee payment processing contracts or financial obligations are created through this demonstration preview. Formal terms will be executed separately between Sathus Technology Pvt. Ltd. and onboarding institutions.
            </p>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none space-y-8 text-sm text-neutral-secondary leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Near2Pay website (www.near2pay.com), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions established by{" "}
              <strong>Sathus Technology Pvt. Ltd.</strong> If you do not agree with any part of these terms, you must discontinue website access immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              2. Nature of the Website
            </h2>
            <p>
              This website serves an informational and preview demonstration purpose. Interactive modules—including student fee lookups, simulated UPI QR generation, and digital receipt previews—are simulated demonstrations using synthetic mock data. The website does not provide banking services, issue credit, or maintain deposit accounts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              3. Intellectual Property Rights
            </h2>
            <p>
              All brand names, trademarks, software code, user interface designs, visual layouts, and content associated with Near2Pay and Sathus Technology Pvt. Ltd. (including the Near4You emblem and Near2Pay mark) are the exclusive intellectual property of Sathus Technology Pvt. Ltd. Unauthorized reproduction, reverse engineering, scraping, or copying of website elements is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              4. Institutional Scope &amp; Responsibility
            </h2>
            <p>
              In our planned commercial platform, educational institutions are solely responsible for defining fee amounts, instalment schedules, concession policies, and verifying student enrollment eligibility. Near2Pay provides the software rails to facilitate digital collection and reporting as authorized by the institution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              5. Disclaimer of Warranties
            </h2>
            <p>
              This demonstration website is provided &ldquo;as is&rdquo; without warranties of any kind, whether express or implied. Sathus Technology Pvt. Ltd. makes no representations regarding the immediate operational readiness of payment gateways on this demonstration preview.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with the website shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
