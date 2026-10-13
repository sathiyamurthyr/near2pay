import React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, HelpCircle, FileText } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Refund & Cancellation Policy (Draft for Review) — Near2Pay",
  description:
    "Informational policy explaining Near2Pay's planned fee refund workflows, technical transaction reversal principles, and institutional autonomy regarding fee refunds.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Refund & Cancellation Policy" }]}
            className="mb-4"
          />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="neutral">Financial Policy</Badge>
              <Badge variant="demo">Demonstration Scope</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-sm sm:text-base text-neutral-secondary">
              Product: <strong>Near2Pay</strong> • Parent Entity:{" "}
              <strong>Sathus Technology Pvt. Ltd.</strong> • Status: Informational Draft
            </p>
          </div>
        </div>
      </div>

      {/* POLICY CONTENT */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 mb-8 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">Demonstration Scope Notice:</h4>
            <p>
              Live financial transactions, payment cancellations, and money refunds are not active on this demonstration website.
              No actual charges are debited during simulated payment tests. This policy outlines the intended dispute and reversal principles planned for our future production integration.
            </p>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none space-y-8 text-sm text-neutral-secondary leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              1. Overview &amp; Two-Tier Refund Framework
            </h2>
            <p>
              Near2Pay operates as a technology facilitator between educational institutions and families. Consequently, fee adjustments and refunds fall under two distinct categories:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-surface-border bg-surface-subtle space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-burgundy">
                  A. Technical Gateway Reversals
                </h4>
                <p className="text-xs">
                  Occurs when an amount is debited from a parent&apos;s bank account but the gateway transaction fails or drops before reaching the institution.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-surface-border bg-surface-subtle space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-orangeDark">
                  B. Institutional Academic Refunds
                </h4>
                <p className="text-xs">
                  Occurs when a student withdraws admission, transfers school, or claims a fee concession post successful settlement.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              2. Technical Failed Transaction Reversals
            </h2>
            <p>
              In our planned production release, technical transaction failures (such as bank timeouts, UPI network drops, or duplicate debits) will be governed by standard RBI turnaround time (TAT) guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Amounts debited but not settled will be automatically reconciled via the acquiring bank network.</li>
              <li>Reversals are credited back to the parent&apos;s original payment instrument (UPI VPAs, source bank account, or card).</li>
              <li>Near2Pay will provide automated transaction UTR references to help parents track reconciliation with their issuing bank.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              3. Institutional Policy Autonomy (School &amp; College Discretion)
            </h2>
            <p>
              Near2Pay does not determine, influence, or override the fee refund policies of enrolled schools, colleges, or coaching centres. All decisions regarding admission fee cancellations, term fee refunds, caution deposit returns, or transport charge deductions are governed exclusively by the enrolled institution&apos;s official prospectus and management regulations.
            </p>
            <p>
              Parents seeking fee refunds due to student withdrawal or category changes must apply directly to their respective school principal or college administration office.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-primary font-display">
              4. Support Contacts for Technical Inquiries
            </h2>
            <p>
              For questions regarding transaction verification or payment rail status, please reach out via our{" "}
              <Link href="/support" className="text-brand-burgundy font-semibold underline">
                Support Hub
              </Link>{" "}
              or email Sathus Technology Pvt. Ltd. at <span className="font-mono">support@near2pay.com</span>.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
