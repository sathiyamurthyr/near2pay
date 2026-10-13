import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, MessageSquare } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";

export const metadata = {
  title: "Frequently Asked Questions (FAQs) — Near2Pay",
  description:
    "Find comprehensive answers about Near2Pay: Platform capabilities, payment methods, digital receipt validity, institutional reporting, and roadmap.",
};

export default function FaqsPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "FAQs" }]} className="mb-4" />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Knowledge Base</Badge>
              <Badge variant="neutral">Common Inquiries</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Find transparent answers about Near2Pay&apos;s product features, payment rails, digital receipt verification, and our rollout roadmap for Indian institutions.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCHABLE FAQS ACCORDION SECTION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion showSearch />
      </section>

      {/* STILL HAVE QUESTIONS BANNER */}
      <section className="py-16 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-primary font-display">
            Still Have Questions About Your Institution?
          </h2>
          <p className="text-sm text-neutral-secondary max-w-xl mx-auto leading-relaxed">
            Our educational technology specialists are here to address your specific campus fee rules, accounting software imports, or parent communication requirements.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary">
              Contact Our Advisors
            </Button>
            <Button href="/request-demo" variant="outline">
              Request a Guided Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
