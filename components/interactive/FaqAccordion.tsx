"use client";

import React, { useState } from "react";
import { ChevronDown, Search, Sparkles, HelpCircle } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface FaqItem {
  id: string;
  category: "General" | "Parents & Students" | "Institutions" | "Payments & Receipts";
  question: string;
  answer: string;
  isPlanned?: boolean;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What is Near4Pay and what is its objective?",
    answer:
      "Near4Pay is an enterprise education fee payment and reconciliation platform engineered by Sathus Technology Pvt. Ltd. Its primary objective is to modernize the educational fee lifecycle in India—eliminating physical cash handling, long bank queues, and tedious manual accounting for schools, colleges, and coaching institutes.",
  },
  {
    id: "faq-2",
    category: "General",
    question: "Which institutions is Near4Pay intended for?",
    answer:
      "Near4Pay is specifically tailored for Indian K-12 schools (CBSE, ICSE, and State Boards), degree colleges and autonomous universities, as well as competitive exam coaching academies and test-prep centres across Tier 1, Tier 2, and Tier 3 cities.",
  },
  {
    id: "faq-3",
    category: "Parents & Students",
    question: "How do students and parents access and pay their fees?",
    answer:
      "Parents and students simply visit the Near4Pay portal or their institution's branded payment page, select their school or college, and input the student's admission or roll number. The system retrieves verified fee dues, allows selection of terms or optional components (such as transport or lab fees), and facilitates instant checkout via UPI, RuPay, cards, or Net Banking.",
  },
  {
    id: "faq-4",
    category: "Payments & Receipts",
    question: "Which payment methods and rails are planned for Near4Pay?",
    answer:
      "The planned production payment architecture will support multi-rail Indian payment instruments: UPI (PhonePe, Google Pay, Paytm, BHIM, and bank UPI apps), RuPay debit and credit cards, major Visa and Mastercard cards, Net Banking across 50+ Indian scheduled banks, and planned Bharat Bill Payment System (BBPS) integration.",
    isPlanned: true,
  },
  {
    id: "faq-5",
    category: "Payments & Receipts",
    question: "How do digital receipts and fee tracking work?",
    answer:
      "Immediately upon payment confirmation, Near4Pay generates a tamper-evident digital receipt featuring the institution's official letterhead, unique transaction reference, student particulars, fee breakdown, and a verification QR code. Parents can download or print the PDF receipt instantly and receive an automated copy via SMS/WhatsApp.",
    isPlanned: true,
  },
  {
    id: "faq-6",
    category: "Institutions",
    question: "How will schools and colleges view and export collection reports?",
    answer:
      "Institutions receive access to a dedicated administrator console featuring live collection dashboards, real-time settlement feeds, student fee ledgers, automated reconciliation summaries against bank nodal accounts, and one-click export to Excel, CSV, or Tally/ERP formats.",
  },
  {
    id: "faq-7",
    category: "Institutions",
    question: "How can institutions request a product walkthrough or pilot demo?",
    answer:
      "School principals, trustees, and administrative officers can request a personalized product walkthrough by visiting the 'Request a Demo' page or contacting Sathus Technology Pvt. Ltd. Our team coordinates online demonstrations and customizes fee structure configurations.",
  },
  {
    id: "faq-8",
    category: "General",
    question: "When will live commercial payment processing be operational?",
    answer:
      "The current web platform is a demonstration release showcasing frontend UX, workflow architecture, and administration capabilities. Live financial payment processing will be enabled upon conclusion of partner bank onboarding, RBI-compliant aggregator integration, and formal production deployment by Sathus Technology Pvt. Ltd.",
    isPlanned: true,
  },
];

interface FaqAccordionProps {
  categoryFilter?: string;
  limit?: number;
  showSearch?: boolean;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  categoryFilter,
  limit,
  showSearch = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([FAQS_DATA[0].id]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter || "All");

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ["All", "General", "Parents & Students", "Institutions", "Payments & Receipts"];

  let filtered = FAQS_DATA.filter((item) => {
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {showSearch && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-secondary" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-brand-burgundy text-white shadow-xs"
                    : "bg-surface-subtle text-neutral-secondary border border-surface-border hover:border-brand-burgundy/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-brand-burgundy/30 bg-white shadow-card"
                  : "border-surface-border bg-white hover:border-brand-burgundy/20"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-burgundy"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm sm:text-base text-neutral-primary">
                    {faq.question}
                  </span>
                  {faq.isPlanned && (
                    <Badge variant="orange" size="sm" className="hidden sm:inline-flex">
                      Planned Feature
                    </Badge>
                  )}
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-brand-burgundyLight text-brand-burgundy" : "text-neutral-secondary bg-surface-subtle"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-neutral-secondary leading-relaxed border-t border-surface-border/50 animate-in fade-in">
                  <p>{faq.answer}</p>
                  {faq.isPlanned && (
                    <div className="mt-3 p-2.5 rounded-lg bg-surface-subtle border border-surface-border text-xs text-neutral-secondary flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-orangeDark flex-shrink-0" />
                      <span>Note: This capability reflects the upcoming production platform roadmap.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center bg-surface-subtle rounded-2xl border border-surface-border text-sm text-neutral-secondary">
            No matching questions found for &ldquo;{search}&rdquo;. Feel free to reach out via our{" "}
            <a href="/contact" className="text-brand-burgundy font-semibold underline">
              Contact Page
            </a>
            .
          </div>
        )}
      </div>
    </div>
  );
};
