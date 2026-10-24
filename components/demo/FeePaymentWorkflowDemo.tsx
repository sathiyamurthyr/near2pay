"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Info,
  Lock,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { formatINR } from "@/lib/currency";
import { useAuth } from "@/lib/auth/useAuth";

interface Institution {
  id: string;
  name: string;
  type: string;
  location: string;
  board: string;
}

interface FeeItem {
  id: string;
  code: string;
  name: string;
  description: string;
  amount: number;
  is_mandatory: number;
  category: string;
}

interface StudentRecord {
  id: string;
  admission_number: string;
  roll_number: string;
  name: string;
  grade_class: string;
  parent_name: string;
  parent_phone: string;
  academic_session: string;
  institution: Institution;
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
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(
    SAMPLE_INSTITUTIONS[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [studentIdInput, setStudentIdInput] = useState("STU-2024-8891");
  const [studentError, setStudentError] = useState("");
  const [studentData, setStudentData] = useState<StudentRecord | null>(null);

  // Fee items from server
  const [feeItems, setFeeItems] = useState<FeeItem[]>([]);
  const [selectedOptionalIds, setSelectedOptionalIds] = useState<string[]>([]);
  const [mandatorySubtotal, setMandatorySubtotal] = useState(0);
  const [optionalSubtotal, setOptionalSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Order & Payment state
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [gatewayOrderId, setGatewayOrderId] = useState("");
  const [verifiedPaymentId, setVerifiedPaymentId] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showSandboxModal, setShowSandboxModal] = useState(false);

  // Filter institutions
  const filteredInstitutions = SAMPLE_INSTITUTIONS.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Restore stored selections from localStorage if available
  const getStoredOptionalSelections = (admNo: string): string[] | null => {
    try {
      const stored = localStorage.getItem(`near4you_fees_${admNo}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return null;
  };

  const saveStoredOptionalSelections = (admNo: string, ids: string[]) => {
    try {
      localStorage.setItem(`near4you_fees_${admNo}`, JSON.stringify(ids));
    } catch {}
  };

  // Look up student from backend API
  const handleStudentLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentIdInput.trim()) {
      setStudentError("Please enter a student admission number or ID.");
      return;
    }

    setStudentError("");
    setIsProcessing(true);

    try {
      const res = await fetch(`/api/fees/student?admNo=${encodeURIComponent(studentIdInput.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setStudentError(data.error || "Student not found in institutional records.");
        return;
      }

      setStudentData(data.student);
      setFeeItems(data.feeItems);

      // Restore previously saved optional selections, or default transport to selected
      const saved = getStoredOptionalSelections(data.student.admission_number);
      let initialOptionalIds: string[] = [];

      if (saved && Array.isArray(saved)) {
        initialOptionalIds = saved;
      } else {
        // Default bus transport to selected if present in catalog
        const transportItem = data.feeItems.find(
          (item: FeeItem) => item.is_mandatory === 0 && item.category === "transport"
        );
        if (transportItem) {
          initialOptionalIds = [transportItem.id];
        }
      }

      setSelectedOptionalIds(initialOptionalIds);

      // Perform server calculation
      await recalculateServerTotal(data.student.admission_number, initialOptionalIds);

      setCurrentStep(3);
    } catch (err) {
      setStudentError("Failed to connect to fee ledger service. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Recalculate total authoritatively via server API
  const recalculateServerTotal = async (admNo: string, optionalIds: string[]) => {
    try {
      const res = await fetch("/api/fees/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentAdmissionNumber: admNo,
          selectedOptionalItemIds: optionalIds,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMandatorySubtotal(data.subtotalMandatory);
        setOptionalSubtotal(data.subtotalOptional);
        setTotalAmount(data.totalAmount);
      }
    } catch (err) {
      console.error("Server calculation error:", err);
    }
  };

  // Toggle optional fee item
  const toggleOptionalItem = async (itemId: string) => {
    if (!studentData) return;

    let updatedIds: string[];
    if (selectedOptionalIds.includes(itemId)) {
      // Deselect
      updatedIds = selectedOptionalIds.filter((id) => id !== itemId);
    } else {
      // Select
      updatedIds = [...selectedOptionalIds, itemId];
    }

    setSelectedOptionalIds(updatedIds);
    saveStoredOptionalSelections(studentData.admission_number, updatedIds);

    // Immediate authoritative recalculation
    await recalculateServerTotal(studentData.admission_number, updatedIds);
  };

  // Create order and proceed to payment review
  const handleProceedToReview = async () => {
    if (!studentData) return;
    setIsProcessing(true);
    setPaymentError("");

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentAdmissionNumber: studentData.admission_number,
          selectedOptionalItemIds: selectedOptionalIds,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPaymentError(data.error || "Failed to create fee payment order.");
        return;
      }

      setCreatedOrder(data.order);
      setCurrentStep(4);
    } catch (err) {
      setPaymentError("Network error while generating order.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 4: Initiate payment with gateway
  const handleInitiatePayment = async () => {
    if (!createdOrder) return;
    setIsProcessing(true);
    setPaymentError("");

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createdOrder.id,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPaymentError(data.error || "Unable to initiate payment with gateway.");
        return;
      }

      setGatewayOrderId(data.gatewayOrderId);
      setShowSandboxModal(true);
    } catch (err) {
      setPaymentError("Network error connecting to payment gateway.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Complete Sandbox Payment with Verified Signature
  const handleAuthorizeSandboxPayment = async () => {
    if (!createdOrder || !gatewayOrderId) return;
    setIsProcessing(true);
    setPaymentError("");

    try {
      const rzpPaymentId = "pay_test_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);

      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createdOrder.id,
          razorpayOrderId: gatewayOrderId,
          razorpayPaymentId: rzpPaymentId,
          razorpaySignature: "sandbox_verified_" + gatewayOrderId,
          isSandbox: true,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPaymentError(data.error || "Payment verification failed.");
        setShowSandboxModal(false);
        return;
      }

      setVerifiedPaymentId(rzpPaymentId);
      setPaymentComplete(true);
      setShowSandboxModal(false);
      setCurrentStep(5);
    } catch (err) {
      setPaymentError("Verification connection failed.");
      setShowSandboxModal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetDemo = () => {
    setCurrentStep(1);
    setPaymentComplete(false);
    setIsProcessing(false);
    setCreatedOrder(null);
    setGatewayOrderId("");
    setVerifiedPaymentId("");
    setShowSandboxModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden">
      {/* Top Banner: Authenticated Status / Guest Notice */}
      <div className="bg-surface-subtle border-b border-surface-border px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {user ? (
            <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Signed in as <strong>{user.name}</strong> • Receipts will be auto-saved to your account.
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-neutral-secondary">
              <Info className="w-4 h-4 text-brand-orangeDark" />
              Guest Checkout.{" "}
              <Link
                href="/login?redirect=/student-parent-payments"
                className="font-bold text-brand-burgundy underline hover:text-brand-burgundyDark"
              >
                Sign In
              </Link>{" "}
              to save your payment records.
            </span>
          )}
        </div>
        <button
          onClick={resetDemo}
          className="inline-flex items-center gap-1 text-neutral-secondary hover:text-neutral-primary font-semibold text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Start Over
        </button>
      </div>

      {/* Step Progress Bar */}
      <div className="px-6 py-4 bg-surface-subtle border-b border-surface-border overflow-x-auto">
        <div className="flex items-center justify-between min-w-[550px]">
          {[
            { step: 1, label: "Institution" },
            { step: 2, label: "Student Lookup" },
            { step: 3, label: "Fee Selection" },
            { step: 4, label: "Review & Pay" },
            { step: 5, label: "Verified Receipt" },
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
                Choose from schools, colleges, or coaching centres registered on Near4Pay.
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
                <span className="font-semibold text-neutral-primary">Quick Pre-fills from Registry:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["STU-2024-8891", "ADM-DEL-4029", "ROLL-JEE-1044", "SX-BCOM-2024"].map((demoId) => (
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
                  disabled={isProcessing}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {isProcessing ? "Fetching Ledger..." : "Fetch Fee Breakdown"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: STUDENT PROFILE & CHECKBOX FEE SELECTION */}
        {currentStep === 3 && studentData && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-primary">
                Step 3: Verified Student Details & Fee Selection
              </h3>
              <p className="text-sm text-neutral-secondary mt-1">
                Customize optional fee items such as bus transportation or sports clubs. Totals update authoritatively in real time.
              </p>
            </div>

            {/* Student Record Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-subtle border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-brand-burgundy text-white flex items-center justify-center font-bold text-lg font-display">
                  {studentData.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-neutral-primary">{studentData.name}</h4>
                    <Badge variant="success">Active Enrolled</Badge>
                  </div>
                  <p className="text-xs text-neutral-secondary mt-0.5">
                    {studentData.grade_class} • Roll No: {studentData.roll_number || "N/A"} • Adm No: {studentData.admission_number}
                  </p>
                  <p className="text-xs text-neutral-secondary">
                    Parent: {studentData.parent_name || "N/A"} • Phone: {studentData.parent_phone || "N/A"}
                  </p>
                </div>
              </div>
              <div className="text-right sm:border-l sm:border-surface-border sm:pl-6">
                <span className="text-xs text-neutral-secondary">Academic Session</span>
                <div className="text-sm font-bold text-brand-burgundy">{studentData.academic_session}</div>
              </div>
            </div>

            {/* Fee Items Table with Accessible Checkboxes */}
            <div className="border border-surface-border rounded-2xl overflow-hidden">
              <div className="bg-surface-subtle px-4 py-3 border-b border-surface-border flex items-center justify-between text-xs font-bold text-neutral-secondary uppercase tracking-wider">
                <span>Fee Component (Selectable Optional Services)</span>
                <span>Amount (INR)</span>
              </div>
              <div className="divide-y divide-surface-border">
                {feeItems.map((item) => {
                  const isMandatory = item.is_mandatory === 1;
                  const isSelected = isMandatory || selectedOptionalIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => !isMandatory && toggleOptionalItem(item.id)}
                      className={`px-4 py-3.5 flex items-center justify-between transition-colors ${
                        isMandatory
                          ? "bg-white"
                          : "cursor-pointer hover:bg-surface-subtle"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          id={`fee-checkbox-${item.id}`}
                          type="checkbox"
                          checked={isSelected}
                          disabled={isMandatory}
                          onChange={() => !isMandatory && toggleOptionalItem(item.id)}
                          aria-label={`Select ${item.name}`}
                          className="w-4 h-4 text-brand-burgundy rounded border-surface-border focus:ring-brand-burgundy cursor-pointer disabled:cursor-not-allowed"
                        />
                        <div>
                          <label
                            htmlFor={`fee-checkbox-${item.id}`}
                            className="text-sm font-semibold text-neutral-primary flex items-center gap-2 cursor-pointer"
                          >
                            {item.name}
                            {isMandatory ? (
                              <span className="text-[10px] text-brand-burgundy font-medium bg-brand-burgundyLight px-1.5 py-0.5 rounded">
                                Mandatory
                              </span>
                            ) : (
                              <span className="text-[10px] text-brand-orangeDark font-medium bg-brand-orangeLight px-1.5 py-0.5 rounded">
                                Optional Checkbox
                              </span>
                            )}
                          </label>
                          {item.description && (
                            <p className="text-xs text-neutral-secondary mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-neutral-primary font-mono">
                        {formatINR(item.amount)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Authoritative Subtotal Summary */}
              <div className="bg-surface-subtle px-4 py-3 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-secondary">
                <div className="flex flex-wrap items-center gap-4">
                  <span>
                    Mandatory Subtotal: <strong className="text-neutral-primary font-mono">{formatINR(mandatorySubtotal)}</strong>
                  </span>
                  <span>
                    Optional Services Subtotal: <strong className="text-neutral-primary font-mono">{formatINR(optionalSubtotal)}</strong>
                  </span>
                </div>
                <div className="text-xs font-semibold text-brand-burgundy">
                  {selectedOptionalIds.length} optional service(s) selected
                </div>
              </div>

              {/* Total Payable Amount Banner */}
              <div className="bg-brand-burgundyLight/30 px-4 py-4 border-t border-brand-burgundy/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-secondary uppercase font-semibold">
                    Total Payable Amount (Server Authoritative)
                  </span>
                  <p className="text-xs text-neutral-secondary">Inclusive of all institutional levies and taxes</p>
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
                onClick={handleProceedToReview}
                disabled={isProcessing}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {isProcessing ? "Validating with Server..." : "Proceed to Payment Review"}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & PAYMENT GATEWAY EXECUTION */}
        {currentStep === 4 && createdOrder && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-primary">
                Step 4: Review Order & Authorize Payment
              </h3>
              <p className="text-sm text-neutral-secondary mt-1">
                Order Number: <strong className="font-mono text-brand-burgundy">{createdOrder.orderNumber}</strong>. Select your payment rail.
              </p>
            </div>

            {paymentError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Payment Error</p>
                  <p className="text-xs text-rose-700 mt-0.5">{paymentError}</p>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
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
                  desc: "Debit cards & major credit cards",
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

            {/* Itemized Order Summary Box */}
            <div className="p-6 rounded-2xl border border-surface-border bg-surface-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
                <div>
                  <span className="text-xs text-neutral-secondary uppercase font-semibold">
                    Gateway Checkout Order
                  </span>
                  <h4 className="font-bold text-neutral-primary text-base">
                    {createdOrder.institutionName}
                  </h4>
                  <p className="text-xs text-neutral-secondary">
                    Student: {createdOrder.studentName} ({createdOrder.admissionNumber})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-secondary">Total Due</span>
                  <div className="text-2xl font-extrabold text-brand-burgundy font-display">
                    {formatINR(createdOrder.totalAmount)}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-neutral-secondary uppercase text-[10px] tracking-wider block">
                  Authoritative Itemized Charges:
                </span>
                {createdOrder.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-surface-border/50">
                    <span className="text-neutral-primary">
                      {item.name} {!item.is_mandatory && <span className="text-[10px] text-brand-burgundy font-semibold">(Optional)</span>}
                    </span>
                    <span className="font-mono font-semibold text-neutral-primary">
                      {formatINR(item.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-secondary">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Razorpay Sandbox Gateway • 256-Bit Cryptographic SSL
                </span>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleInitiatePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Initializing Gateway Order..." : `Pay ${formatINR(createdOrder.totalAmount)}`}
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

        {/* STEP 5: SAMPLE VERIFIED DIGITAL RECEIPT */}
        {currentStep === 5 && createdOrder && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-primary">
                Payment Verified & Settled!
              </h3>
              <p className="text-sm text-neutral-secondary">
                Gateway Payment ID: <strong className="font-mono text-emerald-700">{verifiedPaymentId}</strong>
              </p>
              <div className="inline-flex">
                <Badge variant="success">Cryptographically Confirmed • Order Settled</Badge>
              </div>
            </div>

            {/* Printable Digital Receipt Card */}
            <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-2 border-surface-border shadow-card space-y-6">
              <div className="flex items-start justify-between pb-6 border-b border-surface-border">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-brand-burgundy">
                    Official Digital Fee Receipt
                  </div>
                  <h4 className="text-base font-bold text-neutral-primary mt-1">
                    {createdOrder.institutionName}
                  </h4>
                  <p className="text-xs text-neutral-secondary">
                    Order Ref: {createdOrder.orderNumber} • Date: {new Date().toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display font-extrabold text-lg text-brand-burgundy">
                    Near<span className="text-brand-orange">4</span>Pay
                  </div>
                  <span className="text-[10px] text-neutral-secondary">Sathus Technology Pvt. Ltd.</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-surface-subtle p-3.5 rounded-xl border border-surface-border">
                <div>
                  <span className="text-neutral-secondary">Student Name:</span>
                  <div className="font-bold text-neutral-primary">{createdOrder.studentName}</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Admission No:</span>
                  <div className="font-bold font-mono text-neutral-primary">{createdOrder.admissionNumber}</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Payment Method:</span>
                  <div className="font-bold text-neutral-primary uppercase">{paymentMethod} (Verified)</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Payment Gateway Ref:</span>
                  <div className="font-bold font-mono text-emerald-700 truncate">{verifiedPaymentId}</div>
                </div>
              </div>

              {/* Items Paid Table */}
              <div className="border border-surface-border rounded-xl overflow-hidden text-xs">
                <div className="bg-surface-subtle px-3 py-2 font-bold text-neutral-secondary flex justify-between">
                  <span>Fee Particulars</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-surface-border">
                  {createdOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="px-3 py-2 flex justify-between">
                      <div>
                        <span>{item.name}</span>
                        {!item.is_mandatory && (
                          <span className="ml-1 text-[10px] text-brand-burgundy font-semibold">(Optional)</span>
                        )}
                      </div>
                      <span className="font-semibold font-mono">{formatINR(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-surface-subtle px-3 py-2.5 font-bold text-neutral-primary flex justify-between border-t border-surface-border text-sm">
                  <span>Total Amount Paid</span>
                  <span className="text-brand-burgundy font-mono">{formatINR(createdOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="pt-2 text-center text-[11px] text-neutral-secondary space-y-1">
                <p>Computer-generated digital acknowledgement verified by Near4Pay Platform.</p>
                <p className="font-mono text-[10px] text-neutral-light">
                  HMAC-SHA256 Signature Verified • Registered under Sathus Technology Pvt. Ltd.
                </p>
              </div>
            </div>

            {/* Receipt Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => window.print()}
                icon={<Printer className="w-4 h-4" />}
              >
                Print Receipt
              </Button>
              {user && (
                <Button
                  href="/account/orders"
                  variant="outline"
                  size="md"
                  icon={<Receipt className="w-4 h-4" />}
                >
                  View in My Account
                </Button>
              )}
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

      {/* RAZORPAY SANDBOX CHECKOUT MODAL */}
      {showSandboxModal && createdOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6 border border-surface-border shadow-2xl relative">
            <div className="flex items-start justify-between pb-4 border-b border-surface-border">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-brand-burgundy">
                  Razorpay Sandbox Checkout
                </div>
                <h4 className="text-lg font-bold text-neutral-primary mt-0.5">
                  Authorize Payment
                </h4>
              </div>
              <Badge variant="orange">Test Sandbox</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-secondary">Institution:</span>
                  <span className="font-semibold text-neutral-primary">{createdOrder.institutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-secondary">Razorpay Order ID:</span>
                  <span className="font-mono font-semibold text-neutral-primary">{gatewayOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-secondary">Payment Method:</span>
                  <span className="font-semibold uppercase text-neutral-primary">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-surface-border">
                  <span className="font-bold text-neutral-primary">Amount:</span>
                  <span className="font-extrabold text-brand-burgundy text-sm">{formatINR(createdOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px] leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                <span>
                  This sandbox authorization executes cryptographic signature generation and verifies the transaction server-side. No real funds are debited.
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={isProcessing}
                onClick={handleAuthorizeSandboxPayment}
              >
                {isProcessing ? "Verifying HMAC-SHA256 Signature..." : `Authorize Test Payment of ${formatINR(createdOrder.totalAmount)}`}
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                disabled={isProcessing}
                onClick={() => setShowSandboxModal(false)}
              >
                Cancel Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
