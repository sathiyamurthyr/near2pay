"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  CheckCircle2,
  Receipt,
  Download,
  Printer,
  CreditCard,
  QrCode,
  Building,
  User,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { formatINR } from "@/lib/currency";

interface Institution {
  id: string;
  name: string;
  type: string;
  location: string;
  board: string;
}

const SAMPLE_INSTITUTIONS: Institution[] = [
  {
    id: "inst-1",
    name: "Delhi Public Global Academy",
    type: "School",
    location: "Vasant Kunj, New Delhi",
    board: "CBSE Affiliated",
  },
  {
    id: "inst-2",
    name: "St. Xavier's Autonomous College",
    type: "College",
    location: "South Mumbai, Maharashtra",
    board: "University of Mumbai",
  },
  {
    id: "inst-3",
    name: "Apex JEE & NEET Career Institute",
    type: "Coaching Centre",
    location: "Koramangala, Bengaluru",
    board: "Competitive Test Prep",
  },
  {
    id: "inst-4",
    name: "National Model Matriculation Higher Sec School",
    type: "School",
    location: "Peelamedu, Coimbatore",
    board: "Tamil Nadu State Board",
  },
];

export const FeePaymentWorkflowDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(
    SAMPLE_INSTITUTIONS[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [studentIdInput, setStudentIdInput] = useState("STU-2024-8891");
  const [studentError, setStudentError] = useState("");

  // Fee items selection
  const [feeItems, setFeeItems] = useState([
    { id: "tuition", name: "Term 2 Tuition Fee", amount: 18500, required: true, selected: true },
    { id: "lab", name: "Computer & STEM Lab Charges", amount: 2500, required: true, selected: true },
    { id: "exam", name: "Annual Board Assessment Fee", amount: 1200, required: true, selected: true },
    { id: "transport", name: "School Bus Route #14 Transport", amount: 3800, required: false, selected: true },
    { id: "sports", name: "Sports Complex & Club Membership", amount: 1000, required: false, selected: false },
  ]);

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [txnRef, setTxnRef] = useState("N2P-2026-98124");

  const filteredInstitutions = SAMPLE_INSTITUTIONS.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFeeItem = (id: string) => {
    setFeeItems((items) =>
      items.map((item) =>
        item.id === id && !item.required ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const totalAmount = feeItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.amount, 0);

  const handleStudentLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentIdInput.trim()) {
      setStudentError("Please enter a student admission number or ID.");
      return;
    }
    setStudentError("");
    setCurrentStep(3);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      setTxnRef(`N2P-${Date.now().toString().slice(-6)}`);
      setCurrentStep(5);
    }, 1500);
  };

  const resetDemo = () => {
    setCurrentStep(1);
    setPaymentComplete(false);
    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden">
      {/* Top Banner: Prominent Demo Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Badge variant="demo">Frontend Demo Only</Badge>
          <span>
            Simulated student fee journey. No financial transactions or live data stored.
          </span>
        </div>
        <button
          onClick={resetDemo}
          className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold underline text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo
        </button>
      </div>

      {/* Step Progress Bar */}
      <div className="px-6 py-4 bg-surface-subtle border-b border-surface-border overflow-x-auto">
        <div className="flex items-center justify-between min-w-[550px]">
          {[
            { step: 1, label: "Institution" },
            { step: 2, label: "Student ID" },
            { step: 3, label: "Fee Details" },
            { step: 4, label: "Review & Pay" },
            { step: 5, label: "Receipt" },
          ].map((item) => (
            <div key={item.step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === item.step
                    ? "bg-brand-burgundy text-white shadow-sm ring-4 ring-brand-burgundy/15"
                    : currentStep > item.step
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-neutral-secondary border border-surface-border"
                }`}
              >
                {currentStep > item.step ? <Check className="w-4 h-4" /> : item.step}
              </div>
              <span
                className={`ml-2 text-xs font-medium whitespace-nowrap ${
                  currentStep === item.step
                    ? "text-brand-burgundy font-bold"
                    : currentStep > item.step
                    ? "text-neutral-primary"
                    : "text-neutral-secondary"
                }`}
              >
                {item.label}
              </span>
              {item.step < 5 && (
                <div
                  className={`w-12 h-0.5 mx-3 ${
                    currentStep > item.step ? "bg-emerald-600" : "bg-surface-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-8">
        {/* STEP 1: SELECT INSTITUTION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-primary">
                Step 1: Select Your Educational Institution
              </h3>
              <p className="text-sm text-neutral-secondary mt-1">
                Choose from sample schools, colleges, or coaching centres registered on Near4Pay.
              </p>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-secondary" />
              <input
                type="text"
                placeholder="Search school or college by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInstitutions.map((inst) => {
                const isSelected = selectedInstitution?.id === inst.id;
                return (
                  <div
                    key={inst.id}
                    onClick={() => setSelectedInstitution(inst)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-brand-burgundy bg-brand-burgundyLight/30 ring-2 ring-brand-burgundy/20"
                        : "border-surface-border hover:border-brand-burgundy/40 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 rounded-lg bg-surface-subtle flex items-center justify-center text-brand-burgundy mb-2">
                        <Building className="w-5 h-5" />
                      </div>
                      <Badge variant={inst.type === "Coaching Centre" ? "orange" : "burgundy"}>
                        {inst.type}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-neutral-primary text-sm mt-1">{inst.name}</h4>
                    <p className="text-xs text-neutral-secondary mt-0.5">{inst.location}</p>
                    <div className="mt-2 text-[11px] font-medium text-brand-burgundy">
                      {inst.board}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-border">
              <Button
                variant="primary"
                onClick={() => setCurrentStep(2)}
                disabled={!selectedInstitution}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Student Lookup
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: STUDENT ID LOOKUP */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-neutral-primary">
                  Step 2: Enter Student Identification
                </h3>
                <p className="text-sm text-neutral-secondary mt-1">
                  Selected Institution:{" "}
                  <strong className="text-brand-burgundy">{selectedInstitution?.name}</strong>
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-brand-burgundy underline hover:text-brand-burgundyDark"
              >
                Change Institution
              </button>
            </div>

            <form onSubmit={handleStudentLookup} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-secondary mb-1.5">
                  Student Admission / Enrollment Number
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-secondary" />
                  <input
                    type="text"
                    value={studentIdInput}
                    onChange={(e) => setStudentIdInput(e.target.value)}
                    placeholder="e.g. STU-2024-8891"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-surface-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
                  />
                </div>
                {studentError && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {studentError}
                  </p>
                )}
              </div>

              <div className="p-3.5 bg-surface-subtle rounded-xl border border-surface-border text-xs text-neutral-secondary">
                <span className="font-semibold text-neutral-primary">Quick Demo Pre-fills:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["STU-2024-8891", "ADM-DEL-4029", "ROLL-JEE-1044"].map((demoId) => (
                    <button
                      key={demoId}
                      type="button"
                      onClick={() => setStudentIdInput(demoId)}
                      className="px-2.5 py-1 bg-white border border-surface-border rounded text-[11px] font-mono hover:border-brand-burgundy text-neutral-primary"
                    >
                      {demoId}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Fetch Fee Breakdown
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: STUDENT PROFILE & FEE DETAILS */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-primary">
                Step 3: Student Details & Fee Selection
              </h3>
              <p className="text-sm text-neutral-secondary mt-1">
                Verify student record and customize optional term fee items.
              </p>
            </div>

            {/* Verified Student Record Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-subtle border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-brand-burgundy text-white flex items-center justify-center font-bold text-lg">
                  AS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-neutral-primary">Aarav Sharma</h4>
                    <Badge variant="success">Active Student</Badge>
                  </div>
                  <p className="text-xs text-neutral-secondary mt-0.5">
                    Class 10-A (CBSE) • Roll No: 24 • Adm No: {studentIdInput}
                  </p>
                  <p className="text-xs text-neutral-secondary">
                    Parent: Mr. Rajesh Sharma • Phone: +91 98765 •••••
                  </p>
                </div>
              </div>
              <div className="text-right sm:border-l sm:border-surface-border sm:pl-6">
                <span className="text-xs text-neutral-secondary">Academic Session</span>
                <div className="text-sm font-bold text-brand-burgundy">2024–2025 (Term II)</div>
              </div>
            </div>

            {/* Fee Items Table */}
            <div className="border border-surface-border rounded-2xl overflow-hidden">
              <div className="bg-surface-subtle px-4 py-3 border-b border-surface-border flex items-center justify-between text-xs font-bold text-neutral-secondary uppercase tracking-wider">
                <span>Fee Component</span>
                <span>Amount (INR)</span>
              </div>
              <div className="divide-y divide-surface-border">
                {feeItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleFeeItem(item.id)}
                    className={`px-4 py-3.5 flex items-center justify-between transition-colors ${
                      item.required
                        ? "bg-white"
                        : "cursor-pointer hover:bg-surface-subtle"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        disabled={item.required}
                        onChange={() => toggleFeeItem(item.id)}
                        className="w-4 h-4 text-brand-burgundy rounded border-surface-border focus:ring-brand-burgundy"
                      />
                      <div>
                        <div className="text-sm font-semibold text-neutral-primary flex items-center gap-2">
                          {item.name}
                          {item.required ? (
                            <span className="text-[10px] text-brand-burgundy font-medium bg-brand-burgundyLight px-1.5 py-0.5 rounded">
                              Mandatory
                            </span>
                          ) : (
                            <span className="text-[10px] text-neutral-secondary font-medium bg-surface-subtle px-1.5 py-0.5 rounded">
                              Optional
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-neutral-primary">
                      {formatINR(item.amount)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-brand-burgundyLight/30 px-4 py-4 border-t border-brand-burgundy/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-secondary uppercase font-semibold">
                    Total Payable Amount
                  </span>
                  <p className="text-xs text-neutral-secondary">Inclusive of all institutional levies</p>
                </div>
                <div className="text-2xl font-extrabold text-brand-burgundy font-display">
                  {formatINR(totalAmount)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-surface-border">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(4)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Payment Review
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SIMULATED PAYMENT METHOD */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-primary">
                Step 4: Review Order & Choose Demo Payment Rail
              </h3>
              <p className="text-sm text-neutral-secondary mt-1">
                Select a payment rail to execute the frontend simulated transaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: "upi",
                  title: "UPI (Zero Surcharge)",
                  desc: "Google Pay, PhonePe, Paytm, BHIM",
                  icon: <QrCode className="w-5 h-5" />,
                  recommended: true,
                },
                {
                  id: "card",
                  title: "Cards (RuPay / Visa)",
                  desc: "Debit cards & all major Credit cards",
                  icon: <CreditCard className="w-5 h-5" />,
                  recommended: false,
                },
                {
                  id: "netbanking",
                  title: "Net Banking",
                  desc: "SBI, HDFC, ICICI, Axis & 50+ banks",
                  icon: <Building className="w-5 h-5" />,
                  recommended: false,
                },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-brand-burgundy bg-brand-burgundyLight/30 ring-2 ring-brand-burgundy/20"
                        : "border-surface-border hover:border-brand-burgundy/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center text-brand-burgundy">
                        {method.icon}
                      </div>
                      {method.recommended && <Badge variant="orange">Recommended</Badge>}
                    </div>
                    <div className="font-bold text-sm text-neutral-primary">{method.title}</div>
                    <div className="text-xs text-neutral-secondary mt-1">{method.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Payment Gateway Interactive Card */}
            <div className="p-6 rounded-2xl border border-surface-border bg-surface-subtle">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
                <div>
                  <span className="text-xs text-neutral-secondary uppercase font-semibold">
                    Simulated Gateway Checkout
                  </span>
                  <h4 className="font-bold text-neutral-primary text-base">
                    Near4Pay Sandbox Rail • {selectedInstitution?.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-secondary">Total Due</span>
                  <div className="text-xl font-extrabold text-brand-burgundy font-display">
                    {formatINR(totalAmount)}
                  </div>
                </div>
              </div>

              {paymentMethod === "upi" && (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-36 h-36 bg-white p-3 rounded-2xl border-2 border-dashed border-brand-burgundy/30 flex items-center justify-center shadow-xs">
                    <QrCode className="w-28 h-28 text-brand-burgundy" />
                  </div>
                  <div className="text-xs text-neutral-secondary">
                    Demonstration UPI Dynamic QR Code • Auto-verified upon scanning
                  </div>
                  <div className="text-xs font-mono bg-white px-3 py-1 rounded-md border border-surface-border">
                    near4pay.demo@sathuspe
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="py-6 max-w-sm mx-auto space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-secondary mb-1">Simulated Card Number</label>
                    <input
                      type="text"
                      disabled
                      value="4111 •••• •••• 9812 (Test RuPay)"
                      className="w-full p-2.5 rounded-lg border border-surface-border bg-white font-mono text-neutral-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-secondary mb-1">Expiry</label>
                      <input
                        type="text"
                        disabled
                        value="12 / 28"
                        className="w-full p-2.5 rounded-lg border border-surface-border bg-white font-mono text-neutral-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-secondary mb-1">CVV</label>
                      <input
                        type="text"
                        disabled
                        value="•••"
                        className="w-full p-2.5 rounded-lg border border-surface-border bg-white font-mono text-neutral-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="py-6 max-w-sm mx-auto text-center space-y-2">
                  <Building className="w-10 h-10 text-brand-burgundy mx-auto" />
                  <p className="text-xs text-neutral-secondary">
                    Supported Banks: State Bank of India, HDFC Bank, ICICI Bank, Axis Bank, Punjab National Bank.
                  </p>
                  <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 py-1 px-3 rounded-md border border-emerald-200">
                    Instant Bank Webhook Simulation Active
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-secondary">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Simulated 256-Bit SSL Verification Sandbox
                </span>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Authorizing Simulated Transaction..." : `Confirm Payment of ${formatINR(totalAmount)}`}
                </Button>
              </div>
            </div>

            <div className="flex justify-start">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                Back to Fee Selection
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: SAMPLE DIGITAL RECEIPT */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-primary">
                Demo Payment Successful!
              </h3>
              <p className="text-sm text-neutral-secondary">
                Transaction Reference: <strong className="font-mono text-brand-burgundy">{txnRef}</strong>
              </p>
              <div className="inline-flex">
                <Badge variant="demo">Illustrative Receipt • No Live Money Transferred</Badge>
              </div>
            </div>

            {/* Printable Digital Receipt Card */}
            <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-2 border-surface-border shadow-card space-y-6">
              {/* Receipt Header */}
              <div className="flex items-start justify-between pb-6 border-b border-surface-border">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-brand-burgundy">
                    Digital Fee Receipt
                  </div>
                  <h4 className="text-base font-bold text-neutral-primary mt-1">
                    {selectedInstitution?.name}
                  </h4>
                  <p className="text-xs text-neutral-secondary">{selectedInstitution?.location}</p>
                  <p className="text-[11px] text-neutral-secondary">
                    Receipt No: REC-2026-{txnRef.slice(-4)} • Date: {new Date().toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display font-extrabold text-lg text-brand-burgundy">
                    Near<span className="text-brand-orange">4</span>Pay
                  </div>
                  <span className="text-[10px] text-neutral-secondary">Sathus Technology</span>
                </div>
              </div>

              {/* Student Receipt Particulars */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-secondary">Student Name:</span>
                  <div className="font-bold text-neutral-primary">Aarav Sharma</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Admission No:</span>
                  <div className="font-bold font-mono text-neutral-primary">{studentIdInput}</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Class / Standard:</span>
                  <div className="font-bold text-neutral-primary">Grade 10-A (CBSE)</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Payment Mode:</span>
                  <div className="font-bold text-neutral-primary uppercase">{paymentMethod} (Direct)</div>
                </div>
              </div>

              {/* Items Paid Table */}
              <div className="border border-surface-border rounded-xl overflow-hidden text-xs">
                <div className="bg-surface-subtle px-3 py-2 font-bold text-neutral-secondary flex justify-between">
                  <span>Fee Particulars</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-surface-border">
                  {feeItems
                    .filter((item) => item.selected)
                    .map((item) => (
                      <div key={item.id} className="px-3 py-2 flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-semibold">{formatINR(item.amount)}</span>
                      </div>
                    ))}
                </div>
                <div className="bg-surface-subtle px-3 py-2.5 font-bold text-neutral-primary flex justify-between border-t border-surface-border text-sm">
                  <span>Total Amount Paid</span>
                  <span className="text-brand-burgundy">{formatINR(totalAmount)}</span>
                </div>
              </div>

              {/* Receipt Footer Verification */}
              <div className="pt-2 text-center text-[11px] text-neutral-secondary space-y-1">
                <p>Computer-generated digital acknowledgement for Near2Pay Demonstration.</p>
                <p className="font-mono text-[10px] text-neutral-light">
                  SHA-256 Stamp: e82f91a0b3...5c7921 (Simulated Verification Hash)
                </p>
              </div>
            </div>

            {/* Receipt Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => alert("Simulated: Digital receipt PDF downloaded.")}
                icon={<Download className="w-4 h-4" />}
              >
                Download Receipt PDF
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => window.print()}
                icon={<Printer className="w-4 h-4" />}
              >
                Print Receipt
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={resetDemo}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Start New Fee Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
