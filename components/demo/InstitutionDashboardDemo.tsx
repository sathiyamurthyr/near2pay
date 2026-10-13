"use client";

import React, { useState } from "react";
import {
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Download,
  Calendar,
  Building,
  ArrowUpRight,
  RefreshCw,
  Sliders,
} from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { formatINR } from "@/lib/currency";

interface StudentRecord {
  id: string;
  name: string;
  class: string;
  parent: string;
  totalFee: number;
  paidFee: number;
  status: "Paid" | "Partial" | "Overdue";
  lastDate: string;
}

const SAMPLE_STUDENTS: StudentRecord[] = [
  {
    id: "STU-101",
    name: "Aarav Sharma",
    class: "Grade 10-A",
    parent: "Rajesh Sharma",
    totalFee: 26000,
    paidFee: 26000,
    status: "Paid",
    lastDate: "Today, 10:14 AM",
  },
  {
    id: "STU-102",
    name: "Ananya Iyer",
    class: "Grade 12-Science",
    parent: "Venkatesh Iyer",
    totalFee: 34000,
    paidFee: 17000,
    status: "Partial",
    lastDate: "08 Oct 2026",
  },
  {
    id: "STU-103",
    name: "Rohan Verma",
    class: "Grade 8-B",
    parent: "Sunil Verma",
    totalFee: 22000,
    paidFee: 0,
    status: "Overdue",
    lastDate: "Due: 30 Sep 2026",
  },
  {
    id: "STU-104",
    name: "Diya Patel",
    class: "Grade 10-B",
    parent: "Mukesh Patel",
    totalFee: 26000,
    paidFee: 26000,
    status: "Paid",
    lastDate: "11 Oct 2026",
  },
  {
    id: "STU-105",
    name: "Karan Malhotra",
    class: "B.Com Sem IV",
    parent: "Rajeev Malhotra",
    totalFee: 42000,
    paidFee: 21000,
    status: "Partial",
    lastDate: "05 Oct 2026",
  },
  {
    id: "STU-106",
    name: "Meera Nambiar",
    class: "JEE Target Batch",
    parent: "Suresh Nambiar",
    totalFee: 55000,
    paidFee: 0,
    status: "Overdue",
    lastDate: "Due: 01 Oct 2026",
  },
];

export const InstitutionDashboardDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"students" | "structures" | "transactions" | "reconciliation">("students");
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [reminderSent, setReminderSent] = useState<string | null>(null);

  const filteredStudents = SAMPLE_STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      student.class.toLowerCase().includes(searchFilter.toLowerCase()) ||
      student.id.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === "All" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReminder = (studentId: string, studentName: string) => {
    setReminderSent(studentId);
    setTimeout(() => {
      setReminderSent(null);
    }, 2500);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden">
      {/* Top Banner: Prominent Synthetic Notice */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Badge variant="demo">Interactive Sandbox</Badge>
          <span>
            Demonstration Institutional Administrator Workspace. All metrics are illustrative sample figures.
          </span>
        </div>
        <span className="font-mono text-[11px] text-amber-800">Campus: Delhi Public Academy (Demo)</span>
      </div>

      {/* KPI Stats Bar */}
      <div className="p-6 sm:p-8 bg-surface-subtle border-b border-surface-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-xs">
            <div className="flex items-center justify-between text-neutral-secondary text-xs font-semibold">
              <span>Total Collections (Oct)</span>
              <div className="w-8 h-8 rounded-lg bg-brand-burgundyLight text-brand-burgundy flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-neutral-primary font-display mt-2">
              {formatINR(4875000)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.4% vs last billing cycle</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-xs">
            <div className="flex items-center justify-between text-neutral-secondary text-xs font-semibold">
              <span>Collection Efficiency</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-neutral-primary font-display mt-2">
              94.2%
            </div>
            <div className="text-xs text-neutral-secondary mt-1">
              1,248 of 1,324 students cleared
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-xs">
            <div className="flex items-center justify-between text-neutral-secondary text-xs font-semibold">
              <span>Pending Outstanding</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-brand-burgundy font-display mt-2">
              {formatINR(315000)}
            </div>
            <div className="text-xs text-neutral-secondary mt-1">
              76 overdue instalment notices
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-xs">
            <div className="flex items-center justify-between text-neutral-secondary text-xs font-semibold">
              <span>Today&apos;s Live Settlements</span>
              <div className="w-8 h-8 rounded-lg bg-brand-orangeLight text-brand-orangeDark flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-neutral-primary font-display mt-2">
              {formatINR(182500)}
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">
              28 automated UPI reconciliations
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 border-b border-surface-border flex items-center gap-6 overflow-x-auto">
        {[
          { id: "students", label: "Student Ledger" },
          { id: "structures", label: "Fee Structure Config" },
          { id: "transactions", label: "Live Transaction Feed" },
          { id: "reconciliation", label: "Daily Bank Reconciliation" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "border-brand-burgundy text-brand-burgundy"
                : "border-transparent text-neutral-secondary hover:text-neutral-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8">
        {/* TAB 1: STUDENT LEDGER */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-secondary" />
                <input
                  type="text"
                  placeholder="Filter by student name, roll or class..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-secondary">Status:</span>
                {["All", "Paid", "Partial", "Overdue"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      statusFilter === st
                        ? "bg-brand-burgundy text-white border-brand-burgundy"
                        : "bg-white text-neutral-secondary border-surface-border hover:border-brand-burgundy/40"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Students Table */}
            <div className="border border-surface-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-subtle border-b border-surface-border font-bold text-neutral-secondary uppercase">
                      <th className="py-3 px-4">Student & ID</th>
                      <th className="py-3 px-4">Class</th>
                      <th className="py-3 px-4">Parent Guardian</th>
                      <th className="py-3 px-4">Fee Dues</th>
                      <th className="py-3 px-4">Payment Status</th>
                      <th className="py-3 px-4">Last Activity</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {filteredStudents.map((stu) => (
                      <tr key={stu.id} className="hover:bg-surface-subtle transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-neutral-primary">{stu.name}</div>
                          <div className="font-mono text-[11px] text-neutral-secondary">{stu.id}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-neutral-primary">{stu.class}</td>
                        <td className="py-3.5 px-4 text-neutral-secondary">{stu.parent}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-neutral-primary">
                            {formatINR(stu.paidFee)}{" "}
                            <span className="text-[11px] text-neutral-secondary font-normal">
                              / {formatINR(stu.totalFee)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={
                              stu.status === "Paid"
                                ? "success"
                                : stu.status === "Partial"
                                ? "orange"
                                : "burgundy"
                            }
                          >
                            {stu.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-secondary">{stu.lastDate}</td>
                        <td className="py-3.5 px-4 text-right">
                          {stu.status !== "Paid" ? (
                            <button
                              onClick={() => handleSendReminder(stu.id, stu.name)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-brand-burgundy bg-brand-burgundyLight hover:bg-brand-burgundy hover:text-white rounded-md transition-colors"
                            >
                              <Send className="w-3 h-3" />
                              {reminderSent === stu.id ? "Sent!" : "Remind"}
                            </button>
                          ) : (
                            <button
                              onClick={() => alert(`Simulated: Downloaded receipt for ${stu.name}`)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-neutral-secondary hover:text-neutral-primary bg-surface-subtle border border-surface-border rounded-md"
                            >
                              <Download className="w-3 h-3" />
                              Receipt
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FEE STRUCTURE CONFIG */}
        {activeTab === "structures" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-neutral-primary">
                  Configured Institutional Fee Structures (Academic Year 2024-25)
                </h4>
                <p className="text-xs text-neutral-secondary mt-0.5">
                  Set up custom fee tiers by class, semester, transport route, and scholarship slabs.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert("Demonstration mode: Adding new fee heads is simulated.")}
              >
                + Add Fee Head
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Pre-Primary & Primary (K-5)",
                  tuition: `${formatINR(14500)} / term`,
                  components: ["Activity Fee", "Term Examination", "Library"],
                  frequency: "Quarterly (4 Instalments)",
                  students: 380,
                },
                {
                  title: "Middle & Secondary (6-10)",
                  tuition: `${formatINR(18500)} / term`,
                  components: ["Science Lab", "Computer Lab", "Sports Club", "Board Prep"],
                  frequency: "Term-wise (3 Instalments)",
                  students: 440,
                },
                {
                  title: "Senior Secondary (11-12)",
                  tuition: `${formatINR(24000)} / term`,
                  components: ["Physics/Chem Lab", "CS Practical", "Career Guidance"],
                  frequency: "Half-Yearly (2 Instalments)",
                  students: 320,
                },
              ].map((tier, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-surface-border bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-burgundy uppercase tracking-wider">
                      Fee Tier {idx + 1}
                    </span>
                    <Badge variant="neutral">{tier.students} Students</Badge>
                  </div>
                  <h5 className="font-bold text-neutral-primary text-sm">{tier.title}</h5>
                  <div className="text-lg font-extrabold text-neutral-primary font-display">
                    {tier.tuition}
                  </div>
                  <div className="pt-2 border-t border-surface-border text-xs text-neutral-secondary space-y-1">
                    <div>
                      <strong className="text-neutral-primary">Billing Cycle:</strong> {tier.frequency}
                    </div>
                    <div>
                      <strong className="text-neutral-primary">Components:</strong>{" "}
                      {tier.components.join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE TRANSACTION FEED */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-secondary">
              <span>Showing last 5 simulated gateway transactions</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Live Feed Active
              </span>
            </div>

            <div className="border border-surface-border rounded-2xl overflow-hidden divide-y divide-surface-border text-xs">
              {[
                {
                  id: "TXN-984102",
                  student: "Aarav Sharma (10-A)",
                  mode: "UPI (Google Pay)",
                  utr: "428901238910",
                  amount: formatINR(26000),
                  time: "Today, 10:14 AM",
                  status: "Settled",
                },
                {
                  id: "TXN-984101",
                  student: "Sneha Reddy (12-B)",
                  mode: "RuPay Debit Card",
                  utr: "428901238909",
                  amount: formatINR(18500),
                  time: "Today, 09:42 AM",
                  status: "Settled",
                },
                {
                  id: "TXN-984100",
                  student: "Kabir Mehta (9-C)",
                  mode: "Net Banking (SBI)",
                  utr: "428901238908",
                  amount: formatINR(22000),
                  time: "Today, 08:30 AM",
                  status: "Settled",
                },
                {
                  id: "TXN-984099",
                  student: "Diya Patel (10-B)",
                  mode: "UPI (PhonePe)",
                  utr: "428901238907",
                  amount: formatINR(26000),
                  time: "Yesterday, 06:15 PM",
                  status: "Settled",
                },
              ].map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-surface-subtle transition-colors">
                  <div className="space-y-0.5">
                    <div className="font-bold text-neutral-primary flex items-center gap-2">
                      <span>{tx.student}</span>
                      <span className="font-mono text-[10px] text-neutral-secondary bg-surface-subtle px-1.5 py-0.5 rounded border border-surface-border">
                        {tx.id}
                      </span>
                    </div>
                    <div className="text-neutral-secondary text-[11px]">
                      UTR: <span className="font-mono">{tx.utr}</span> • {tx.mode} • {tx.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-neutral-primary">{tx.amount}</div>
                    <Badge variant="success" size="sm">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BANK RECONCILIATION */}
        {activeTab === "reconciliation" && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>100% Automated T+1 Match:</strong> All 28 transactions from yesterday have been matched to the institution&apos;s designated nodal bank account.
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert("Simulated: Daily settlement CSV export downloaded.")}
                className="bg-white"
              >
                Download Statement CSV
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-surface-border bg-white">
                <span className="text-neutral-secondary">Direct Bank Settlements</span>
                <div className="text-lg font-bold text-neutral-primary mt-1">{formatINR(4692500)}</div>
                <p className="text-[11px] text-neutral-secondary mt-1">Directly credited to Bank of Baroda</p>
              </div>
              <div className="p-4 rounded-xl border border-surface-border bg-white">
                <span className="text-neutral-secondary">In-Flight / Pending Settlements</span>
                <div className="text-lg font-bold text-brand-orangeDark mt-1">{formatINR(182500)}</div>
                <p className="text-[11px] text-neutral-secondary mt-1">Scheduled for T+1 window batch</p>
              </div>
              <div className="p-4 rounded-xl border border-surface-border bg-white">
                <span className="text-neutral-secondary">Reconciliation Mismatch Errors</span>
                <div className="text-lg font-bold text-emerald-600 mt-1">0 Discrepancies</div>
                <p className="text-[11px] text-neutral-secondary mt-1">Zero orphan transactions reported</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
