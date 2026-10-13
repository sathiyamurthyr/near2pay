import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Users2,
  CalendarDays,
  Percent,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INDIAN_IMAGES } from "@/data/images";

export const metadata = {
  title: "Coaching Centre & Institute Fee Management — Near2Pay",
  description:
    "Flexible fee collection platform for Indian competitive test preparation institutes (JEE, NEET, UPSC, CA, Gate). Batch management, instalments, and scholarship fee tracking.",
};

export default function CoachingCentresSolutionPage() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Solutions", href: "/#solutions" },
              { label: "For Coaching Centres" },
            ]}
            className="mb-4"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="orange">Competitive Coaching Solutions</Badge>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
                Flexible Batch Fee Management for Indian Coaching Institutes
              </h1>
              <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
                Whether managing JEE, NEET, UPSC, or CA coaching batches, Near2Pay simplifies course admissions, structured instalment plans, study package dispatches, and mock test access.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/request-demo" variant="primary" size="lg">
                  Request Coaching Demo
                </Button>
                <Button href="/student-parent-payments" variant="outline" size="lg">
                  View Demo Student Flow
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border-2 border-surface-border shadow-card aspect-[4/3]">
              <Image
                src={INDIAN_IMAGES.coachingClass.url}
                alt={INDIAN_IMAGES.coachingClass.alt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* COACHING FEATURES */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Batch & Course Operations"
          title="Engineered for Fast-Paced Coaching Enrollments"
          subtitle="Keep admissions running at peak speed while securing full fee visibility across branches and batches."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Course & Batch Architecture
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Define fee packages by program (e.g., 2-Year Classroom JEE, 1-Year Dropper NEET, Weekend Foundation). Limit admission quotas per batch dynamically.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Morning, evening & weekend batch fee tiers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Classroom vs hybrid online course fees</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Customized Instalment Plans
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Allow parents to split high coaching fees into 2 to 6 convenient instalments. Synchronize test series access and study material issue with instalment clearance.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Automated WhatsApp instalment reminders</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Fee milestone unlock for mock test papers</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Scholarship & Admission Test Slabs
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Integrate talent search or admission entrance exam scorecards directly. Apply automated tuition fee fee waivers (10% to 100% scholarship slabs) seamlessly.
            </p>
            <ul className="pt-2 space-y-1.5 text-xs text-neutral-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Scorecard-linked discount vouchers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Early bird admission coupon verification</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <Badge variant="burgundy">Multi-Branch Coaching Networks</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-primary font-display">
            Scale From One Branch to Multiple City Campuses
          </h2>
          <p className="text-sm text-neutral-secondary leading-relaxed max-w-2xl mx-auto">
            Manage student registrations, batch capacities, and fee collections across Kota, Delhi, Bengaluru, Hyderabad, and regional study centres from a single master dashboard.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button href="/request-demo" variant="primary">
              Book a Coaching Demonstration
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
