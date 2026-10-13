import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  BedDouble,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INDIAN_IMAGES } from "@/data/images";

export const metadata = {
  title: "College & University Fee Management System — Near2Pay",
  description:
    "Enterprise fee management platform for Indian universities, engineering colleges, and autonomous institutions. Multi-department fee routing, semester dues, hostel fees, and bank reconciliation.",
};

export default function CollegesSolutionPage() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Solutions", href: "/#solutions" },
              { label: "For Colleges & Universities" },
            ]}
            className="mb-4"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="burgundy">Higher Education Platforms</Badge>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
                Enterprise Fee Management for Indian Colleges & Universities
              </h1>
              <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
                Streamline complex semester billing, department-level bank allocations, hostel room bookings, and university examination fee cycles across thousands of students.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/request-demo" variant="primary" size="lg">
                  Request Higher-Ed Demo
                </Button>
                <Button href="/institution-management" variant="outline" size="lg">
                  Explore Admin Dashboard
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border-2 border-surface-border shadow-card aspect-[4/3]">
              <Image
                src={INDIAN_IMAGES.collegeCampus.url}
                alt={INDIAN_IMAGES.collegeCampus.alt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* HIGHER EDUCATION MODULES */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Higher-Ed Infrastructure"
          title="Engineered for Scalable Campus Financial Governance"
          subtitle="Support multi-faculty architectures (Engineering, Medicine, Arts, Management) with automated ledger splits."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Semester & Credit Fees
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Structure fees by academic year, semester (Even / Odd), and degree program (B.Tech, M.Tech, MBA, B.Sc). Enable credit-based course registration fee collection.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Semester registration clearance tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Credit backlog exam fee workflows</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Multi-Account Department Routing
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Route fees directly into designated bank accounts based on department regulations—such as routing lab charges to research trust accounts and tuition to general accounts.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Automated ledger-level account split</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trustee and auditing committee reports</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center">
              <BedDouble className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Hostel, Mess & Amenities Dues
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Collect residential room rent, caution deposits, and monthly or annual cafeteria meal subscriptions with instant no-dues clearance certification.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Caution deposit refund status tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Instant automated &quot;No Dues&quot; certificate</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CAMPUS PHOTO FEATURE */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-surface-border aspect-[4/3]">
              <Image
                src={INDIAN_IMAGES.collegeLibrary.url}
                alt={INDIAN_IMAGES.collegeLibrary.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="orange">Campus Automation</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary font-display">
                Automated No-Dues Clearance for Exam Hall Tickets
              </h2>
              <p className="text-sm text-neutral-secondary leading-relaxed">
                Before semester examinations or convocation, colleges spend weeks compiling dues across library books, hostel rooms, and lab damages. With Near2Pay, students clear all dues online and instantly receive a digital Clearance Stamp for hall ticket issuance.
              </p>
              <div className="pt-2">
                <Button href="/request-demo" variant="primary">
                  Request College Pilot Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
