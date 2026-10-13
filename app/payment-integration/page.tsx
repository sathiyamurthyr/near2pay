import React from "react";
import Link from "next/link";
import {
  QrCode,
  CreditCard,
  Building,
  Zap,
  ShieldCheck,
  ArrowRight,
  Info,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Payment Rails & Integration Architecture — Near2Pay",
  description:
    "Learn about Near2Pay's planned multi-rail Indian payment architecture: UPI QR, RuPay, cards, Net Banking, and BBPS integration designed for institutional compliance.",
};

export default function PaymentIntegrationPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Payment Integration" }]}
            className="mb-4"
          />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Payment Architecture</Badge>
              <Badge variant="orange">Indian Financial Rails</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Planned Indian Payment Rails & Gateway Architecture
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              An architectural overview of how Near2Pay is engineered to integrate leading Indian payment aggregators, NPCI UPI rails, and banking nodal networks for educational institutions.
            </p>
          </div>
        </div>
      </div>

      {/* ROADMAP / ARCHITECTURE NOTICE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">Architectural Roadmap Note:</h4>
            <p>
              This informational page outlines the planned payment integration framework. Live payment APIs, SDKs, and banking webhooks will be connected during our upcoming production release in partnership with licensed RBI Payment Aggregators.
            </p>
          </div>
        </div>
      </div>

      {/* PAYMENT RAILS MATRIX */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Supported Instruments"
          title="Designed for 100% Indian Family Convenience"
          subtitle="Support the exact payment modes Indian parents use every day with transparent transaction charges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
              <QrCode className="w-6 h-6" />
            </div>
            <Badge variant="orange">Planned Primary Rail</Badge>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Unified Payments Interface (UPI)
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Instant mobile intent checkout and dynamic QR code generation supporting Google Pay, PhonePe, Paytm, BHIM, and bank UPI apps.
            </p>
            <ul className="pt-2 space-y-1 text-xs text-neutral-secondary">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero surcharge options</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sub-3 second settlement confirmation</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <Badge variant="burgundy">Planned Rail</Badge>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              RuPay & Domestic Debit Cards
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Broad acceptance across all Indian bank debit cards with RBI Two-Factor Authentication (OTP verification) via secure bank gateways.
            </p>
            <ul className="pt-2 space-y-1 text-xs text-neutral-secondary">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>RuPay debit card priority</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted card tokenization</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <Badge variant="burgundy">Planned Rail</Badge>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              Net Banking (50+ Banks)
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Direct corporate and retail banking connectivity with State Bank of India, HDFC Bank, ICICI Bank, Axis Bank, and regional cooperative banks.
            </p>
            <ul className="pt-2 space-y-1 text-xs text-neutral-secondary">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>High ticket transaction support</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct server-to-server callbacks</span>
              </li>
            </ul>
          </Card>

          <Card hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <Badge variant="orange">Roadmap Integration</Badge>
            <h3 className="text-lg font-bold text-neutral-primary font-display">
              BBPS Bharat BillPay Ready
            </h3>
            <p className="text-xs text-neutral-secondary leading-relaxed">
              Future alignment with NPCI&apos;s Bharat Bill Payment System, enabling parents to discover and settle school dues directly from any consumer banking app.
            </p>
            <ul className="pt-2 space-y-1 text-xs text-neutral-secondary">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>National fetch & pay standard</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orangeDark" />
                <span>Centralized dispute management</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SETTLEMENT TIMELINE & ARCHITECTURE */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Settlement Pipeline"
            title="How Educational Funds Move Directly to Campus Accounts"
            subtitle="Ensuring clear separation of funds, automated nodal escrow compliance, and rapid T+1 settlement cycles."
          />

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-surface-border text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-burgundyLight text-brand-burgundy font-bold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h4 className="font-bold text-neutral-primary text-sm">Parent Authorizes Payment</h4>
              <p className="text-xs text-neutral-secondary">
                Parent scans UPI QR or approves card transaction through verified two-factor authentication.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-surface-border text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-burgundyLight text-brand-burgundy font-bold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h4 className="font-bold text-neutral-primary text-sm">Escrow Nodal Processing</h4>
              <p className="text-xs text-neutral-secondary">
                Funds are routed via an RBI-regulated nodal bank account with automated transaction UTR tagging.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-surface-border text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-orangeLight text-brand-orangeDark font-bold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h4 className="font-bold text-neutral-primary text-sm">Direct Campus Credit (T+1)</h4>
              <p className="text-xs text-neutral-secondary">
                Net funds credit to the school or college bank account with zero manual intervention.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button href="/request-demo" variant="primary">
              Discuss Payment Setup with Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
