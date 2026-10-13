import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Building2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY_DETAILS } from "@/data/company";

export const metadata = {
  title: "Contact Us — Near2Pay by Sathus Technology",
  description:
    "Get in touch with the Near2Pay team at Sathus Technology Pvt. Ltd. for school fee partnerships, college onboarding, and platform inquiries.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact Us" }]} className="mb-4" />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Get in Touch</Badge>
              <Badge variant="neutral">Support &amp; Inquiries</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Connect with the Near2Pay Team
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Have questions regarding our school fee payment solutions, integration timeline, or institutional onboarding? Reach out to Sathus Technology Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: DETAILS & FORM */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Particulars & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-primary font-display">
                Corporate Communications
              </h2>
              <p className="text-sm text-neutral-secondary mt-2 leading-relaxed">
                Our product advisors and engineering specialists are available to discuss your campus fee requirements across India.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl border border-surface-border bg-surface-subtle flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-secondary">
                    {COMPANY_DETAILS.hq.label}
                  </h4>
                  <div className="text-sm font-bold text-neutral-primary mt-0.5">
                    {COMPANY_DETAILS.name}
                  </div>
                  <div className="text-xs text-neutral-secondary mt-1.5 leading-relaxed">
                    <p>{COMPANY_DETAILS.hq.line1}</p>
                    <p>{COMPANY_DETAILS.hq.line2}</p>
                    <p>{COMPANY_DETAILS.hq.area}, {COMPANY_DETAILS.hq.city} – {COMPANY_DETAILS.hq.pincode}</p>
                    <p>{COMPANY_DETAILS.hq.state}, {COMPANY_DETAILS.hq.country}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-surface-border bg-surface-subtle flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-secondary">
                    Email Inquiries
                  </h4>
                  <div className="text-sm font-bold text-neutral-primary mt-0.5">
                    contact@near2pay.com
                  </div>
                  <div className="text-xs text-neutral-secondary mt-1">
                    General, institutional onboarding &amp; partnerships
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-surface-border bg-surface-subtle flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-secondary">
                    Operating Hours
                  </h4>
                  <div className="text-sm font-bold text-neutral-primary mt-0.5">
                    Monday to Friday, 9:30 AM – 6:30 PM IST
                  </div>
                  <div className="text-xs text-neutral-secondary mt-1">
                    Excluding Indian national holidays
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
