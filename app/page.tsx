import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  School,
  GraduationCap,
  BookOpen,
  Receipt,
  FileCheck,
  Zap,
  Lock,
  Smartphone,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeePaymentWorkflowDemo } from "@/components/demo/FeePaymentWorkflowDemo";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { INDIAN_IMAGES } from "@/data/images";

export const metadata = {
  title: "Near4Pay — Simplified Education Fee Payments for Indian Institutions",
  description:
    "Near4Pay by Sathus Technology Pvt. Ltd. empowers Indian schools, colleges, and coaching centres with instant UPI fee collections, automated bank reconciliation, and digital receipts.",
};

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="burgundy">
                  Sathus Technology Initiative
                </Badge>
                <Badge variant="orange">
                  Next-Gen Education Payments
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-primary tracking-tight font-display leading-[1.12]">
                Education Fee Payments,{" "}
                <span className="text-brand-burgundy underline decoration-brand-orange decoration-4 underline-offset-8">
                  Simplified
                </span>{" "}
                for India.
              </h1>

              <p className="text-lg sm:text-xl text-neutral-secondary leading-relaxed max-w-2xl">
                Near4Pay connects Indian schools, colleges, and coaching centres with parents and students through seamless UPI fee collections, instant digital receipts, and real-time bank reconciliation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  href="/student-parent-payments"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Pay Student Fees
                </Button>
                <Button
                  href="/institution-management"
                  variant="outline"
                  size="lg"
                >
                  For Institutions
                </Button>
                <Button
                  href="/request-demo"
                  variant="ghost"
                  size="lg"
                  className="text-neutral-secondary"
                >
                  Book a Demo
                </Button>
              </div>

              {/* Trust Pillars Checklist */}
              <div className="pt-4 border-t border-surface-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-secondary">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Instant UPI & QR Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Automated Digital Receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero Manual Reconciliation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Indian Hero Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-surface-border shadow-cardHover bg-surface-subtle">
                <div className="aspect-[4/3] sm:aspect-[5/4] relative">
                  <Image
                    src={INDIAN_IMAGES.hero.url}
                    alt={INDIAN_IMAGES.hero.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTION CATEGORY TILES */}
      <section className="py-16 sm:py-20 bg-surface-subtle border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Tailored Solutions"
            title="Customized Fee Systems for Every Educational Segment"
            subtitle="Whether managing school bus routes, university semester credits, or coaching test-series instalments, Near4Pay accommodates your institutional workflows."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* SCHOOLS CARD */}
            <Card hoverable className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight flex items-center justify-center text-brand-burgundy mb-5">
                  <School className="w-6 h-6" />
                </div>
                <Badge variant="burgundy" className="mb-2">K-12 Education</Badge>
                <h3 className="text-xl font-bold text-neutral-primary font-display">
                  For Schools
                </h3>
                <p className="text-sm text-neutral-secondary mt-2.5 leading-relaxed">
                  Consolidate tuition fees, admission charges, annual examinations, and GPS-tracked bus transport fees with flexible quarterly instalments.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-neutral-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>CBSE, ICSE & State Board fee structures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Automated parent SMS & WhatsApp reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Term-wise class-wise defaulter tracking</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-border">
                <Button
                  href="/solutions/schools"
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore School Solutions
                </Button>
              </div>
            </Card>

            {/* COLLEGES CARD */}
            <Card hoverable className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight flex items-center justify-center text-brand-burgundy mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <Badge variant="burgundy" className="mb-2">Higher Education</Badge>
                <h3 className="text-xl font-bold text-neutral-primary font-display">
                  For Colleges & Universities
                </h3>
                <p className="text-sm text-neutral-secondary mt-2.5 leading-relaxed">
                  Streamline semester tuition, departmental lab charges, hostel accommodations, mess subscriptions, and university examination fees.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-neutral-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Multi-department bank account splits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Hostel, mess & library deposit tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Bulk bank nodal reconciliation</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-border">
                <Button
                  href="/solutions/colleges"
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore College Solutions
                </Button>
              </div>
            </Card>

            {/* COACHING CENTRES CARD */}
            <Card hoverable className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-orangeLight flex items-center justify-center text-brand-orangeDark mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Badge variant="orange" className="mb-2">Test Preparation</Badge>
                <h3 className="text-xl font-bold text-neutral-primary font-display">
                  For Coaching Centres
                </h3>
                <p className="text-sm text-neutral-secondary mt-2.5 leading-relaxed">
                  Manage JEE, NEET, UPSC, and foundation course fee plans, monthly instalment cards, study material dispatches, and mock test enrollments.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-neutral-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                    <span>Batch-wise and course-wise fee slabs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                    <span>Scholarship & early-bird discount codes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                    <span>Instalment milestone automated triggers</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-border">
                <Button
                  href="/solutions/coaching-centres"
                  variant="secondary"
                  size="sm"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Coaching Solutions
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES HIGHLIGHTS */}
      <section className="py-16 sm:py-24 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Platform Capabilities"
            title="Engineered to Solve Core Operational Fee Bottlenecks"
            subtitle="Built from the ground up for Indian bursars, school accountants, and busy parents seeking complete transparency."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-surface-border bg-white hover:border-brand-burgundy/40 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-primary text-base">Multi-Rail UPI & Cards</h4>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                Parents pay in seconds via PhonePe, Google Pay, Paytm, BHIM, RuPay debit cards, and Net Banking across 50+ Indian banks.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-surface-border bg-white hover:border-brand-burgundy/40 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-primary text-base">Tamper-Proof Receipts</h4>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                Computer-generated receipts with official institution insignia, unique transaction UTRs, and QR codes for effortless fee verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-surface-border bg-white hover:border-brand-burgundy/40 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-primary text-base">Instant Bank Reconciliation</h4>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                Automated matching of collections directly with bank statements. Eliminate hours spent manually tracking unverified bank credits.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-surface-border bg-white hover:border-brand-burgundy/40 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-primary text-base">Gentle Automated Alerts</h4>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                Pre-configured SMS and WhatsApp payment notifications with direct, pre-filled payment links, boosting timely fee settlements by 45%.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              href="/features"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Full List of 10+ Product Features
            </Button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMONSTRATION SECTION */}
      <section className="py-16 sm:py-24 bg-surface-subtle border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Live Interactive Experience"
            title="Experience the Near4Pay Student Fee Journey"
            subtitle="Try out the interactive student payment simulation below. Select an institution, review fee breakdown, and generate a sample digital receipt."
          />

          <FeePaymentWorkflowDemo />
        </div>
      </section>

      {/* SECURITY & TRUST BANNER */}
      <section className="py-16 sm:py-20 border-b border-surface-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-surface-border bg-brand-burgundyLight/20 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <Badge variant="burgundy">Security First Architecture</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary font-display">
                  Institutional Security, Data Privacy & RBI Compliance Principles
                </h3>
                <p className="text-sm text-neutral-secondary leading-relaxed">
                  Near4Pay is designed to respect the highest standards of student data confidentiality.
                  Our proposed architecture incorporates 256-bit encryption, role-based access for school staff,
                  and alignment with Reserve Bank of India (RBI) payment aggregator security guidelines.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-neutral-primary">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-burgundy" /> 256-Bit TLS In-Transit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-brand-burgundy" /> Strict Role-Based Access Control
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-burgundy" /> Audit Trail Integrity
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Button
                  href="/security"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Read Security Principles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW SECTION */}
      <section className="py-16 sm:py-24 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Frequently Asked Questions"
            title="Common Questions from Parents & Administrators"
            subtitle="Get clear answers about payment methods, digital receipt validity, and the Near4Pay onboarding roadmap."
          />

          <FaqAccordion limit={5} />

          <div className="mt-10 text-center">
            <Button
              href="/faqs"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Browse All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION: REQUEST A DEMO BANNER */}
      <section className="py-16 sm:py-24 bg-surface-subtle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="orange" size="md">
            Schedule a Guided Tour
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-primary tracking-tight font-display">
            Ready to Modernize Your Campus Fee Collections?
          </h2>

          <p className="text-base sm:text-lg text-neutral-secondary max-w-2xl mx-auto leading-relaxed">
            Join educational institutions across India exploring faster fee collections, zero reconciliation delays, and delighted parents with Near4Pay by Sathus Technology.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              href="/request-demo"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Request an Institution Demo
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
            >
              Contact Our Team
            </Button>
          </div>

          <p className="text-xs text-neutral-secondary pt-2">
            Free demonstration session • Tailored to your school, college, or coaching fee structures.
          </p>
        </div>
      </section>
    </div>
  );
}
