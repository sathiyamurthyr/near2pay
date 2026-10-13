import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users2,
  MapPin,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INDIAN_IMAGES } from "@/data/images";
import { COMPANY_DETAILS } from "@/data/company";

export const metadata = {
  title: "About Us — Near2Pay by Sathus Technology Pvt. Ltd.",
  description:
    "Discover Near2Pay, an education fee technology initiative by Sathus Technology Pvt. Ltd. committed to simplifying fee collections and reconciliations for Indian educational institutions.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "About Us" }]} className="mb-4" />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Corporate Background</Badge>
              <Badge variant="orange">Sathus Technology Initiative</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              About Near2Pay &amp; Sathus Technology
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Near2Pay is a dedicated education fee payment and reconciliation product initiative engineered by{" "}
              <strong className="text-neutral-primary font-semibold">Sathus Technology Pvt. Ltd.</strong> to modernize financial operations for schools, colleges, and coaching institutes across India.
            </p>
          </div>
        </div>
      </div>

      {/* MISSION & VISION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              badge="Our Mission"
              title="Modernizing the Educational Fee Experience in India"
              subtitle="Eliminating friction for parents while empowering campus administrators with real-time financial clarity."
              align="left"
              className="mb-6 sm:mb-8"
            />
            <div className="space-y-4 text-sm text-neutral-secondary leading-relaxed">
              <p>
                In millions of Indian households, paying school or college fees has historically involved physical bank challans, long queues at campus fee counters, manual cash counting, and misplaced receipt paper slips.
              </p>
              <p>
                Meanwhile, school bursars and chartered accountants spend countless hours each quarter manually cross-referencing bank passbooks against student rolls to determine which parents have settled their dues.
              </p>
              <p>
                <strong>Near2Pay</strong> was conceived by Sathus Technology Pvt. Ltd. to bridge this operational gap. By combining modern UPI payment rails with automated ledger reconciliation, we create a transparent, reliable, and respectful fee management ecosystem for educational institutions of every size.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-neutral-primary">
              <div className="p-4 rounded-xl border border-surface-border bg-surface-subtle flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-burgundy flex-shrink-0 mt-0.5" />
                <span>Engineered specifically for Indian institutional realities and curriculum models.</span>
              </div>
              <div className="p-4 rounded-xl border border-surface-border bg-surface-subtle flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-orangeDark flex-shrink-0 mt-0.5" />
                <span>Strict adherence to student data confidentiality and ethical standards.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border-2 border-surface-border shadow-card aspect-[4/3]">
            <Image
              src={INDIAN_IMAGES.teamSathus.url}
              alt={INDIAN_IMAGES.teamSathus.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Guiding Principles"
            title="The Values Behind Our Engineering"
            subtitle="Built on trust, accessibility, and respect for educational communities across India."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-primary font-display">
                Data Sovereignty &amp; Privacy
              </h3>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                Student and parental records are never commercialized, resold, or exposed to third-party marketing firms. Educational data belongs strictly to the family and their school.
              </p>
            </Card>

            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center font-bold">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-primary font-display">
                Accessibility Across Bharat
              </h3>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                We design lightweight, responsive interfaces that perform smoothly on entry-level smartphones, intermittent mobile connections, and regional browser setups.
              </p>
            </Card>

            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-primary font-display">
                Honest, Transparent Operations
              </h3>
              <p className="text-xs text-neutral-secondary leading-relaxed">
                Zero hidden convenience surcharges or unannounced deductions. Institutions and families always see exact, itemized amounts with full digital verification.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CORPORATE DETAILS */}
      <section className="py-16 border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="neutral">Corporate Office</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary font-display">
            {COMPANY_DETAILS.name}
          </h2>
          <p className="text-sm text-neutral-secondary leading-relaxed max-w-xl mx-auto">
            Incorporated in India, Sathus Technology Pvt. Ltd. builds software platforms that solve operational complexities for enterprises and educational institutions.
          </p>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-surface-subtle border border-surface-border text-left flex items-start gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-secondary">
                {COMPANY_DETAILS.hq.label}
              </span>
              <p className="text-xs text-neutral-primary font-medium mt-1 leading-relaxed">
                {COMPANY_DETAILS.hq.fullAddress}
              </p>
              <p className="text-xs text-neutral-secondary mt-1">
                Email: {COMPANY_DETAILS.contact.email} • Hours: {COMPANY_DETAILS.contact.hours}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="primary">
              Contact Sathus Technology
            </Button>
            <Button href="/request-demo" variant="outline">
              Request Platform Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
