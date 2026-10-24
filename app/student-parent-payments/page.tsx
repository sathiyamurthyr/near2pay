import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { FeePaymentWorkflowDemo } from "@/components/demo/FeePaymentWorkflowDemo";
import { ShieldCheck, Info } from "lucide-react";

export const metadata = {
  title: "Student & Parent Fee Payment Portal — Near4Pay",
  description:
    "Production-grade education fee payment experience: Verify student ledger, customize optional charges including bus transport, pay with verified Razorpay gateway, and retrieve official digital receipts.",
};

export default function StudentParentPaymentsPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Student & Parent Payments" }]}
            className="mb-4"
          />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Parent & Student Portal</Badge>
              <Badge variant="orange">Verified Gateway Integration</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Pay Educational Fees in Under 60 Seconds
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Experience the fast, transparent fee payment workflow designed for Indian families. Search for your child&apos;s educational institution, verify outstanding dues, select optional services like bus transport, and execute secure payments.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE WORKFLOW */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-blue-950">Authoritative Fee Calculation & Payment Sandbox Active:</h4>
            <p>
              Fee breakdowns are authoritatively computed and validated by the Near4Pay server. Optional charges can be selected or deselected with real-time recalculation. Payments execute via the integrated Razorpay sandbox rail with full cryptographic HMAC-SHA256 signature verification.
            </p>
          </div>
        </div>

        <FeePaymentWorkflowDemo />
      </section>
    </div>
  );
}
