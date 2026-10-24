"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/currency";
import {
  Receipt,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeft,
  Building,
  User,
  ExternalLink,
} from "lucide-react";

interface OrderItem {
  fee_name: string;
  fee_category: string;
  is_mandatory: number;
  amount: number;
}

interface OrderRecord {
  id: string;
  order_number: string;
  status: string;
  currency: string;
  subtotal_mandatory: number;
  subtotal_optional: number;
  total_amount: number;
  created_at: number;
  student_name: string;
  admission_number: string;
  grade_class: string;
  institution_name: string;
  items: OrderItem[];
  payment?: {
    gateway_payment_id?: string;
    status: string;
    payment_method: string;
    verified_at?: number;
    amount: number;
  };
}

export default function OrderHistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState<OrderRecord | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/orders/history");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 text-sm text-neutral-secondary">
        Loading payment transaction history...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
        <Receipt className="w-12 h-12 text-brand-burgundy" />
        <h2 className="text-2xl font-bold text-neutral-primary">Sign In Required</h2>
        <p className="text-sm text-neutral-secondary max-w-md">
          Please log in to view your educational fee receipts and payment logs.
        </p>
        <Button href="/login?redirect=/account/orders" variant="primary">
          Log In
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-surface-subtle min-h-[85vh] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-burgundy hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
            </Link>
            <h1 className="text-3xl font-extrabold text-neutral-primary font-display">
              Fee Receipts & Transactions
            </h1>
            <p className="text-sm text-neutral-secondary mt-1">
              Authoritative transaction history and digital tax receipts for your family.
            </p>
          </div>

          <Button
            href="/student-parent-payments"
            variant="primary"
            size="md"
            icon={<Receipt className="w-4 h-4" />}
          >
            Pay Another Fee
          </Button>
        </div>

        {/* Orders Table / Cards */}
        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-surface-border text-center space-y-4 shadow-card">
            <div className="w-16 h-16 bg-surface-subtle text-neutral-light rounded-full flex items-center justify-center mx-auto">
              <Receipt className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-primary">No Payment Records Found</h3>
            <p className="text-sm text-neutral-secondary max-w-md mx-auto">
              You haven&apos;t executed any fee payments yet with this account. Any verified payments made through the portal will appear here immediately.
            </p>
            <div className="pt-2">
              <Button href="/student-parent-payments" variant="primary">
                Make Your First Payment
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isPaid = order.status === "PAID";
              const isFailed = order.status === "FAILED";
              const isPending = order.status === "PENDING" || order.status === "CREATED";

              return (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-3xl border border-surface-border shadow-card hover:border-brand-burgundy/30 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-neutral-primary">
                          {order.order_number}
                        </span>
                        {isPaid && <Badge variant="success">PAID</Badge>}
                        {isPending && <Badge variant="orange">PENDING</Badge>}
                        {isFailed && <Badge variant="burgundy">FAILED</Badge>}
                      </div>
                      <h3 className="text-base font-bold text-neutral-primary">
                        {order.institution_name}
                      </h3>
                      <p className="text-xs text-neutral-secondary">
                        Student: <strong className="text-neutral-primary">{order.student_name}</strong> ({order.admission_number}) • {order.grade_class}
                      </p>
                    </div>

                    <div className="sm:text-right space-y-1">
                      <span className="text-xs text-neutral-secondary">Total Charged</span>
                      <div className="text-xl font-extrabold text-brand-burgundy font-display">
                        {formatINR(order.total_amount)}
                      </div>
                      <p className="text-[11px] text-neutral-light">
                        {new Date(order.created_at).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Itemized Snapshot */}
                  <div className="bg-surface-subtle p-3.5 rounded-2xl border border-surface-border text-xs space-y-2">
                    <span className="font-bold text-neutral-secondary uppercase text-[10px] tracking-wider block">
                      Fee Components Included:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-2 rounded-lg border border-surface-border flex items-center justify-between"
                        >
                          <div className="truncate pr-2">
                            <span className="font-semibold text-neutral-primary block truncate">
                              {item.fee_name}
                            </span>
                            <span className="text-[10px] text-neutral-secondary">
                              {item.is_mandatory ? "Mandatory" : "Optional Selection"}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-neutral-primary">
                            {formatINR(item.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Payment Proof */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="text-xs text-neutral-secondary flex items-center gap-2">
                      {order.payment?.gateway_payment_id ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>
                            Gateway Txn: <strong className="font-mono text-neutral-primary">{order.payment.gateway_payment_id}</strong> ({order.payment.payment_method.toUpperCase()})
                          </span>
                        </>
                      ) : (
                        <span>Awaiting gateway confirmation</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isPaid && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReceipt(order)}
                          icon={<Receipt className="w-3.5 h-3.5" />}
                        >
                          View Official Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Digital Receipt Modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
            <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 border border-surface-border shadow-2xl relative">
              <div className="flex items-start justify-between pb-4 border-b border-surface-border">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-brand-burgundy">
                    Verified Digital Fee Receipt
                  </div>
                  <h3 className="text-lg font-bold text-neutral-primary mt-1">
                    {selectedReceipt.institution_name}
                  </h3>
                  <p className="text-xs text-neutral-secondary">
                    Order Ref: {selectedReceipt.order_number}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display font-extrabold text-lg text-brand-burgundy">
                    Near<span className="text-brand-orange">4</span>Pay
                  </div>
                  <span className="text-[10px] text-neutral-secondary">Sathus Technology</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-surface-subtle p-3.5 rounded-xl border border-surface-border">
                <div>
                  <span className="text-neutral-secondary">Student Name:</span>
                  <div className="font-bold text-neutral-primary">{selectedReceipt.student_name}</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Admission No:</span>
                  <div className="font-bold font-mono text-neutral-primary">{selectedReceipt.admission_number}</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Class / Grade:</span>
                  <div className="font-bold text-neutral-primary">{selectedReceipt.grade_class}</div>
                </div>
                <div>
                  <span className="text-neutral-secondary">Transaction ID:</span>
                  <div className="font-bold font-mono text-emerald-700">
                    {selectedReceipt.payment?.gateway_payment_id || selectedReceipt.order_number}
                  </div>
                </div>
              </div>

              {/* Items Paid */}
              <div className="border border-surface-border rounded-xl overflow-hidden text-xs">
                <div className="bg-surface-subtle px-3 py-2 font-bold text-neutral-secondary flex justify-between">
                  <span>Fee Component</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-surface-border">
                  {selectedReceipt.items.map((item, idx) => (
                    <div key={idx} className="px-3 py-2 flex justify-between">
                      <div>
                        <span>{item.fee_name}</span>
                        {!item.is_mandatory && (
                          <span className="ml-1 text-[10px] text-brand-burgundy font-semibold">(Optional)</span>
                        )}
                      </div>
                      <span className="font-semibold">{formatINR(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-surface-subtle px-3 py-2.5 font-bold text-neutral-primary flex justify-between border-t border-surface-border text-sm">
                  <span>Total Amount Paid</span>
                  <span className="text-brand-burgundy">{formatINR(selectedReceipt.total_amount)}</span>
                </div>
              </div>

              <div className="text-center text-[11px] text-neutral-secondary space-y-1">
                <p>Computer-generated digital acknowledgement for Near4Pay Platform.</p>
                <p className="font-mono text-[10px] text-neutral-light">
                  Payment Confirmed by Razorpay Sandbox Gateway • Aligned with RBI Aggregator Norms
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-surface-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  icon={<Printer className="w-4 h-4" />}
                >
                  Print
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedReceipt(null)}
                >
                  Close Receipt
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
