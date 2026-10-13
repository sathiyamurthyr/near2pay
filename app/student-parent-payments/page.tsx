import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { FeePaymentWorkflowDemo } from "@/components/demo/FeePaymentWorkflowDemo";
import { ShieldCheck, Info } from "lucide-react";

export const metadata = {
  title: "Student & Parent Fee Payment Portal (Demonstration) — Near2Pay",
  description:
    "Interactive frontend demonstration of Near2Pay's parent fee payment experience: Search school, inspect student fee breakdown, simulate UPI payment, and preview digital receipt.",
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
              <Badge variant="demo">Frontend Simulation</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Pay Educational Fees in Under 60 Seconds
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Experience the fast, transparent fee payment workflow designed for Indian families. Search for your child&apos;s educational institution, verify outstanding dues, and simulate an instant UPI payment.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE WORKFLOW DEMONSTRATION */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">Demonstration Scope & Notice:</h4>
            <p>
              This interactive module demonstrates the proposed Near2Pay frontend experience using synthetic test records.
              It does not collect real student data, require bank accounts, or execute real transactions.
            </p>
          </div>
        </div>

        <FeePaymentWorkflowDemo />
      </section>
    </div>
  );
}
