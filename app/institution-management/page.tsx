import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { InstitutionDashboardDemo } from "@/components/demo/InstitutionDashboardDemo";
import { Info } from "lucide-react";

export const metadata = {
  title: "Institution Management Console (Demonstration) — Near2Pay",
  description:
    "Interactive demonstration of Near2Pay's administrator console for Indian schools and colleges: Student fee rosters, real-time collection metrics, and automated bank reconciliation.",
};

export default function InstitutionManagementPage() {
  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-surface-border bg-surface-subtle py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Institution Management" }]}
            className="mb-4"
          />
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="burgundy">Administrator Console</Badge>
              <Badge variant="demo">Frontend Simulation</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-primary font-display tracking-tight leading-tight">
              Real-Time Campus Fee Intelligence & Reconciliation
            </h1>
            <p className="text-base sm:text-lg text-neutral-secondary leading-relaxed">
              Explore how school principals, trustees, and finance heads track daily fee collections, manage multi-tier fee structures, dispatch payment reminders, and reconcile bank nodal statements.
            </p>
          </div>
        </div>
      </div>

      {/* DASHBOARD DEMONSTRATION SECTION */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">Demonstration Dataset Notice:</h4>
            <p>
              The dashboard below presents illustrative sample data for a model campus (&quot;Delhi Public Academy&quot;).
              All statistics, collection figures, student names, and transaction IDs are synthetic demonstrations and not real company figures.
            </p>
          </div>
        </div>

        <InstitutionDashboardDemo />
      </section>
    </div>
  );
}
