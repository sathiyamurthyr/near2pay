import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Layers,
  Calendar,
  Receipt,
  History,
  Users,
  BarChart3,
  CheckCircle2,
  BellRing,
  Shield,
  ArrowRight,
  Sparkles,
  QrCode,
  FileSpreadsheet,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { INDIAN_IMAGES } from "@/data/images";

export const metadata = {
  title: "Product Features — Online Education Fee Management",
  description:
    "Explore Near2Pay's comprehensive suite of features: Multi-rail UPI payments, dynamic fee structures, instalment tracking, digital receipts, and automated reconciliation for Indian institutions.",
};

const FEATURES = [
  {
    id: "online-payments",
    title: "1. Multi-Rail Online Fee Payments",
    tagline: "Instant checkout with zero friction for Indian parents",
    description:
      "Support UPI applications (Google Pay, PhonePe, Paytm, BHIM), RuPay debit and credit cards, and Net Banking across 50+ Indian banks with 99.9% gateway uptime.",
    icon: <QrCode className="w-6 h-6" />,
    badge: "Core Rail",
    benefits: [
      "Dynamic on-screen UPI QR code generation",
      "Instant confirmation within 3 seconds",
      "Direct bank-grade encrypted channels",
    ],
  },
  {
    id: "fee-structures",
    title: "2. Flexible Fee Structure Management",
    tagline: "Configurable heads for tuition, exams, transport & labs",
    description:
      "Design distinct fee structures across grades, streams (Science, Commerce, Arts), and courses with optional components like bus transport, hostel, and sports clubs.",
    icon: <Layers className="w-6 h-6" />,
    badge: "Administration",
    benefits: [
      "Support for CBSE, ICSE & State Board guidelines",
      "Mandatory vs optional fee item classification",
      "Scholarship, sibling & staff discount concession slabs",
    ],
  },
  {
    id: "instalments",
    title: "3. Milestone-Based Instalment Tracking",
    tagline: "Break down large fees into manageable terms",
    description:
      "Offer families structured quarterly, term-wise, or monthly instalment plans with automated due dates, grace periods, and transparent breakdown of balances.",
    icon: <Calendar className="w-6 h-6" />,
    badge: "Parent Friendly",
    benefits: [
      "Automated split schedules (Quarterly, Half-yearly)",
      "Partial payment acceptance with balance roll-over",
      "Customizable late fee rules and waiver controls",
    ],
  },
  {
    id: "digital-receipts",
    title: "4. Tamper-Evident Digital Receipts",
    tagline: "Immediate official acknowledgment with verification QR",
    description:
      "Generate computer-verified PDF receipts featuring the institution's official logo, student details, GSTIN particulars, and cryptographic verification stamps.",
    icon: <Receipt className="w-6 h-6" />,
    badge: "Compliance",
    benefits: [
      "Instant PDF download upon payment success",
      "Automated copy sent to registered WhatsApp & email",
      "QR code for instant administrative authenticity verification",
    ],
  },
  {
    id: "payment-history",
    title: "5. Comprehensive Student Payment Ledger",
    tagline: "Complete multi-year fee records at a glance",
    description:
      "Provide both parents and administrative staff with a permanent chronological record of past fee receipts, dues, and transaction UTR references.",
    icon: <History className="w-6 h-6" />,
    badge: "Transparency",
    benefits: [
      "Full academic year financial ledger",
      "Reprint lost or historical receipts anytime",
      "Income tax 80C fee certificate generation support",
    ],
  },
  {
    id: "student-records",
    title: "6. Centralized Student Information Hub",
    tagline: "Synced records by class, section, and roll number",
    description:
      "Maintain a secure, searchable directory of student profiles, contact details, parent phone numbers, and enrolled fee plans with bulk Excel import support.",
    icon: <Users className="w-6 h-6" />,
    badge: "Data Management",
    benefits: [
      "One-click search by name, admission no, or roll no",
      "Class and section bulk student migration",
      "Exportable student fee status rosters",
    ],
  },
  {
    id: "collection-reports",
    title: "7. Executive Collection Analytics & Reports",
    tagline: "Actionable cash-flow insights for principals & trustees",
    description:
      "Real-time visual dashboards and downloadable reports displaying daily collections, class-wise completion percentages, and outstanding balances.",
    icon: <BarChart3 className="w-6 h-6" />,
    badge: "Analytics",
    benefits: [
      "Daily, weekly, and monthly collection aggregations",
      "Department-wise and campus-wise comparisons",
      "Instant export to Excel, CSV, and Tally ERP formats",
    ],
  },
  {
    id: "reconciliation",
    title: "8. Automated Bank Nodal Reconciliation",
    tagline: "Eliminate manual bank statement matching forever",
    description:
      "Our system matches gateway transactions against bank credit advice files automatically, highlighting discrepancies or refunds in real time.",
    icon: <CheckCircle2 className="w-6 h-6" />,
    badge: "Accounting",
    benefits: [
      "T+1 automatic settlement matching",
      "Zero manual bank passbook tallying",
      "Audit-ready transaction records with bank UTR tags",
    ],
  },
  {
    id: "payment-reminders",
    title: "9. Automated WhatsApp & SMS Payment Reminders",
    tagline: "Respectful, automated alerts that accelerate collections",
    description:
      "Schedule gentle fee due notices delivered directly to parents' mobile phones with personalized pre-filled payment links, reducing overdue fees by up to 50%.",
    icon: <BellRing className="w-6 h-6" />,
    badge: "Automation",
    benefits: [
      "Customizable templates in English and regional languages",
      "One-click UPI payment links inside notifications",
      "Automated reminder escalation 7, 3, and 1 day prior to due date",
    ],
  },
  {
    id: "administration",
    title: "10. Institutional Role-Based Access Control",
    tagline: "Secure administrative access with granular permissions",
    description:
      "Grant specific roles to school bursars, principals, trustees, and department heads, ensuring financial confidentiality and audit compliance.",
    icon: <Shield className="w-6 h-6" />,
    badge: "Security",
    benefits: [
      "Distinct permissions for accountant, cashier, and management",
      "Immutable audit log of all manual changes and fee waivers",
      "Two-factor authentication for administrative log-ins",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Features" }]} className="mb-4" />
          <div className="max-w-3xl space-y-4">
            <Badge variant="burgundy">End-to-End Capabilities</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight">
              Platform Features Built for Modern Indian Education
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Explore how Near2Pay by Sathus Technology Pvt. Ltd. digitizes every phase of the education fee collection lifecycle—from payment links to bank reconciliation.
            </p>
          </div>
        </div>
      </div>

      {/* DETAILED FEATURES GRID */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="p-8 rounded-3xl border border-surface-border bg-white hover:border-brand-burgundy/40 hover:shadow-cardHover transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
                    {feature.icon}
                  </div>
                  <Badge variant="neutral">{feature.badge}</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-primary font-display">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-burgundy mt-1">
                    {feature.tagline}
                  </p>
                </div>

                <p className="text-sm text-neutral-secondary leading-relaxed">
                  {feature.description}
                </p>

                <div className="pt-2 border-t border-surface-border space-y-2">
                  <span className="text-xs font-bold text-neutral-primary uppercase tracking-wider">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-secondary">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between text-xs text-neutral-secondary">
                <span className="flex items-center gap-1 font-semibold text-brand-burgundy">
                  <Sparkles className="w-3 h-3 text-brand-orangeDark" />
                  Planned Enterprise Feature
                </span>
                <Link
                  href="/request-demo"
                  className="font-semibold text-neutral-primary hover:text-brand-burgundy inline-flex items-center gap-1"
                >
                  Request Demo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO HIGHLIGHT SECTION */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-surface-border aspect-[4/3]">
              <Image
                src={INDIAN_IMAGES.schoolAdmin.url}
                alt={INDIAN_IMAGES.schoolAdmin.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="orange">Institution Focused</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary font-display">
                Empowering Campus Administrators Across India
              </h2>
              <p className="text-sm text-neutral-secondary leading-relaxed">
                Schools and colleges save hundreds of administrative staff hours each billing cycle. Instead of manual receipt book entries and bank verification queues, Near2Pay delivers an automated, audit-ready dashboard tailored for Indian accountants and principals.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/institution-management" variant="primary">
                  View Demo Dashboard
                </Button>
                <Button href="/request-demo" variant="outline">
                  Schedule Walkthrough
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
