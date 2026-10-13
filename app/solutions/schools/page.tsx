import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  School,
  Bus,
  FileCheck,
  CheckCircle2,
  Users,
  Smartphone,
  Receipt,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INDIAN_IMAGES } from "@/data/images";

export const metadata = {
  title: "School Fee Payment & Management System — Near2Pay",
  description:
    "Comprehensive school fee collection platform for Indian K-12, CBSE, ICSE, and State Board schools. Simplify tuition, transport, exam fees, and automated parent payment reminders.",
};

export default function SchoolsSolutionPage() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Solutions", href: "/#solutions" },
              { label: "For Schools" },
            ]}
            className="mb-4"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="burgundy">K-12 School Solutions</Badge>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
                Effortless Fee Collections for Indian Schools
              </h1>
              <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
                From pre-primary to senior secondary, Near2Pay streamlines tuition payments, transport routes, examination charges, and parent communication for CBSE, ICSE, and State Board schools.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/request-demo" variant="primary" size="lg">
                  Request School Demo
                </Button>
                <Button href="/student-parent-payments" variant="outline" size="lg">
                  Try Parent Payment Demo
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border-2 border-surface-border shadow-card aspect-[4/3]">
              <Image
                src={INDIAN_IMAGES.schoolStudents.url}
                alt={INDIAN_IMAGES.schoolStudents.alt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED SCHOOL PILLARS */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="School Operations"
          title="Designed for Every Department of School Administration"
          subtitle="Empower your principal, bursar, transport manager, and class teachers with unified fee visibility."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center">
              <School className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Tuition & Admission Fees
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Configure term-wise and quarterly tuition fees mapped to specific grades and academic streams. Seamlessly handle new student admission deposits and security charges.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quarterly and half-yearly split plans</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sibling concessions & merit scholarships</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Route-Based Transport Fees
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Define distance and stop-based bus charges. Parents can choose to opt into school bus transit during term checkout with automated capacity tracking.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Zone-based bus fee matrix</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Flexible one-way or two-way transit options</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Exams, Labs & Activity Levies
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Consolidate board exam registration fees, annual STEM and computer lab charges, library memberships, and sports uniforms into an itemized transparent invoice.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Itemized invoice transparency for parents</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero hidden levies or confusion</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* PARENT EXPERIENCE HIGHLIGHT */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-surface-border aspect-[4/3]">
              <Image
                src={INDIAN_IMAGES.parentsAndStudent.url}
                alt={INDIAN_IMAGES.parentsAndStudent.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="burgundy">Parent Convenience</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary font-display">
                Delight Parents with WhatsApp Links & UPI Instant Checkouts
              </h2>
              <p className="text-sm text-neutral-secondary leading-relaxed">
                Parents no longer need to take leave from work or wait in long administrative office queues on fee due dates. A simple SMS or WhatsApp alert directs them to their child&apos;s verified fee card where they can pay using PhonePe, Google Pay, or Paytm in under 30 seconds.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-surface-border">
                  <div className="font-bold text-brand-burgundy text-lg font-display">45% Faster</div>
                  <div className="text-neutral-secondary mt-0.5">Average collection turnaround</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-surface-border">
                  <div className="font-bold text-brand-orangeDark text-lg font-display">Zero Queues</div>
                  <div className="text-neutral-secondary mt-0.5">Eliminate cash counting at reception</div>
                </div>
              </div>
              <div className="pt-2">
                <Button href="/request-demo" variant="primary">
                  Schedule a School Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
