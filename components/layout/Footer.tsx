import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { Logo } from "../brand/Logo";
import { COMPANY_DETAILS } from "@/data/company";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-surface-border mt-auto" role="contentinfo">
      {/* Top Banner: Trust & Indian Banking Rails */}
      <div className="bg-surface-subtle border-b border-surface-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-brand-burgundyLight flex items-center justify-center text-brand-burgundy flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-primary">
                  Designed for Indian Education Financial Compliance
                </h4>
                <p className="text-xs text-neutral-secondary">
                  Aligned with RBI payment aggregator guidelines, instant digital receipts & automated reconciliations
                </p>
              </div>
            </div>

            {/* Payment Rails Logos / Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-secondary">
              <span className="px-2.5 py-1 bg-white border border-surface-border rounded-md shadow-xs">
                UPI
              </span>
              <span className="px-2.5 py-1 bg-white border border-surface-border rounded-md shadow-xs">
                RuPay
              </span>
              <span className="px-2.5 py-1 bg-white border border-surface-border rounded-md shadow-xs">
                Debit / Credit Cards
              </span>
              <span className="px-2.5 py-1 bg-white border border-surface-border rounded-md shadow-xs">
                Net Banking (50+ Banks)
              </span>
              <span className="px-2.5 py-1 bg-brand-orangeLight text-brand-orangeDark border border-brand-orange/30 rounded-md shadow-xs">
                BBPS Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-neutral-secondary leading-relaxed max-w-sm">
              Near2Pay is a next-generation education fee payment and reconciliation platform engineered by{" "}
              <strong className="text-neutral-primary font-semibold">Sathus Technology Pvt. Ltd.</strong> for schools, colleges, and coaching institutes across India.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-neutral-secondary">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-burgundy flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-neutral-primary block font-semibold">
                    HQ: {COMPANY_DETAILS.name}
                  </strong>
                  <span>{COMPANY_DETAILS.hq.fullAddress}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-burgundy flex-shrink-0" />
                <span>{COMPANY_DETAILS.contact.email} / {COMPANY_DETAILS.contact.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Column 1: Solutions */}
          <div>
            <h3 className="text-xs font-bold text-neutral-primary uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/solutions/schools"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  For Schools (K-12)
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/colleges"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  For Colleges & Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/coaching-centres"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  For Coaching Centres
                </Link>
              </li>
              <li>
                <Link
                  href="/student-parent-payments"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Parent & Student Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/institution-management"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Institution Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h3 className="text-xs font-bold text-neutral-primary uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Features Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/payment-integration"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Payment Rails & BBPS
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Security & Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/request-demo"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Schedule Product Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h3 className="text-xs font-bold text-neutral-primary uppercase tracking-wider mb-4">
              Policies & Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  About Sathus Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Help & Support Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-neutral-secondary hover:text-brand-burgundy transition-colors"
                >
                  Refund & Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-surface-subtle border border-surface-border text-xs text-neutral-secondary leading-relaxed">
          <p className="font-semibold text-neutral-primary mb-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-brand-orangeDark" />
            Demonstration Release Notice
          </p>
          Near2Pay is an enterprise software product developed by{" "}
          <strong>Sathus Technology Pvt. Ltd.</strong> This website is an interactive demonstration of
          the upcoming education fee management platform. All student records, institution metrics,
          and payment journey simulations use synthetic data for illustrative purposes. No real bank
          credentials or live transactions are accepted.
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-secondary">
          <p>© {new Date().getFullYear()} Near2Pay by Sathus Technology Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-brand-burgundy">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-burgundy">
              Terms
            </Link>
            <Link href="/refund-policy" className="hover:text-brand-burgundy">
              Refunds
            </Link>
            <Link href="/support" className="hover:text-brand-burgundy">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
