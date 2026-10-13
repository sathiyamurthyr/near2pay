"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  School,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  HelpCircle,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const solutionsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Handle outside click for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll detection for subtle header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolutionsActive =
    pathname.startsWith("/solutions/") || pathname === "/solutions";

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 border-b ${
        scrolled ? "border-surface-border shadow-sm py-2.5" : "border-surface-border/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/"
                  ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                  : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
              }`}
            >
              Home
            </Link>

            <Link
              href="/features"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/features"
                  ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                  : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
              }`}
            >
              Features
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                type="button"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isSolutionsActive
                    ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                    : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
                }`}
                aria-expanded={solutionsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    solutionsDropdownOpen ? "rotate-180 text-brand-burgundy" : "text-neutral-light"
                  }`}
                />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white p-2 shadow-cardHover border border-surface-border ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-secondary">
                    By Institution Type
                  </div>
                  <Link
                    href="/solutions/schools"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-brand-burgundyLight/40 group transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-burgundyLight flex items-center justify-center text-brand-burgundy group-hover:scale-105 transition-transform">
                      <School className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-primary group-hover:text-brand-burgundy">
                        For Schools
                      </div>
                      <div className="text-xs text-neutral-secondary">
                        K-12, CBSE, ICSE & State Board fee systems
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/solutions/colleges"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-brand-burgundyLight/40 group transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-burgundyLight flex items-center justify-center text-brand-burgundy group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-primary group-hover:text-brand-burgundy">
                        For Colleges
                      </div>
                      <div className="text-xs text-neutral-secondary">
                        Universities, semester fees & department splits
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/solutions/coaching-centres"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-brand-burgundyLight/40 group transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-orangeLight flex items-center justify-center text-brand-orangeDark group-hover:scale-105 transition-transform">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-primary group-hover:text-brand-burgundy">
                        For Coaching Centres
                      </div>
                      <div className="text-xs text-neutral-secondary">
                        Batch fees, instalments & test series packages
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/student-parent-payments"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/student-parent-payments"
                  ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                  : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
              }`}
            >
              Pay Fees
            </Link>

            <Link
              href="/institution-management"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/institution-management"
                  ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                  : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
              }`}
            >
              For Institutions
            </Link>

            <Link
              href="/payment-integration"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/payment-integration"
                  ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                  : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
              }`}
            >
              Payment Rails
            </Link>

            <Link
              href="/security"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/security"
                  ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                  : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
              }`}
            >
              Security
            </Link>

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === "/about" || pathname === "/faqs" || pathname === "/contact"
                    ? "text-brand-burgundy font-semibold bg-brand-burgundyLight/50"
                    : "text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle"
                }`}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    moreDropdownOpen ? "rotate-180 text-brand-burgundy" : "text-neutral-light"
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white p-2 shadow-cardHover border border-surface-border ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 z-50">
                  <Link
                    href="/about"
                    className="flex items-center gap-2.5 p-2 rounded-lg text-sm text-neutral-primary hover:text-brand-burgundy hover:bg-brand-burgundyLight/40 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-brand-burgundy" />
                    <span>About Us</span>
                  </Link>
                  <Link
                    href="/faqs"
                    className="flex items-center gap-2.5 p-2 rounded-lg text-sm text-neutral-primary hover:text-brand-burgundy hover:bg-brand-burgundyLight/40 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-brand-orangeDark" />
                    <span>FAQs</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2.5 p-2 rounded-lg text-sm text-neutral-primary hover:text-brand-burgundy hover:bg-brand-burgundyLight/40 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-burgundy" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/request-demo"
              variant="outline"
              size="sm"
            >
              Request a Demo
            </Button>
            <Button
              href="/student-parent-payments"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Pay Fees
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              href="/student-parent-payments"
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5"
            >
              Pay Fees
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-primary hover:text-brand-burgundy hover:bg-surface-subtle focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[61px] bg-white z-40 overflow-y-auto border-t border-surface-border">
          <div className="px-5 py-6 space-y-4">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/" ? "bg-brand-burgundyLight text-brand-burgundy font-semibold" : "text-neutral-primary"
                }`}
              >
                Home
              </Link>

              <Link
                href="/features"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/features" ? "bg-brand-burgundyLight text-brand-burgundy font-semibold" : "text-neutral-primary"
                }`}
              >
                Features
              </Link>

              {/* Mobile Solutions Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-neutral-primary rounded-lg hover:bg-surface-subtle"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileSolutionsOpen ? "rotate-180 text-brand-burgundy" : ""
                    }`}
                  />
                </button>

                {mobileSolutionsOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-2 border-l-2 border-brand-burgundy/20 ml-3 mt-1">
                    <Link
                      href="/solutions/schools"
                      className="block px-3 py-2 text-sm text-neutral-primary hover:text-brand-burgundy rounded-md"
                    >
                      For Schools (K-12)
                    </Link>
                    <Link
                      href="/solutions/colleges"
                      className="block px-3 py-2 text-sm text-neutral-primary hover:text-brand-burgundy rounded-md"
                    >
                      For Colleges & Universities
                    </Link>
                    <Link
                      href="/solutions/coaching-centres"
                      className="block px-3 py-2 text-sm text-neutral-primary hover:text-brand-burgundy rounded-md"
                    >
                      For Coaching Centres & Institutes
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/student-parent-payments"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/student-parent-payments"
                    ? "bg-brand-burgundyLight text-brand-burgundy font-semibold"
                    : "text-neutral-primary"
                }`}
              >
                Student & Parent Payments
              </Link>

              <Link
                href="/institution-management"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/institution-management"
                    ? "bg-brand-burgundyLight text-brand-burgundy font-semibold"
                    : "text-neutral-primary"
                }`}
              >
                Institution Management
              </Link>

              <Link
                href="/payment-integration"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/payment-integration"
                    ? "bg-brand-burgundyLight text-brand-burgundy font-semibold"
                    : "text-neutral-primary"
                }`}
              >
                Payment Rails & Integration
              </Link>

              <Link
                href="/security"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/security"
                    ? "bg-brand-burgundyLight text-brand-burgundy font-semibold"
                    : "text-neutral-primary"
                }`}
              >
                Security & Trust
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/about"
                    ? "bg-brand-burgundyLight text-brand-burgundy font-semibold"
                    : "text-neutral-primary"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/faqs"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/faqs"
                    ? "bg-brand-burgundyLight text-brand-burgundy font-semibold"
                    : "text-neutral-primary"
                }`}
              >
                FAQs
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === "/contact"
                    ? "bg-brand-burgundyLight text-brand-burgundy font-semibold"
                    : "text-neutral-primary"
                }`}
              >
                Contact Us
              </Link>
            </div>

            <div className="pt-4 border-t border-surface-border space-y-3">
              <Button
                href="/request-demo"
                variant="outline"
                size="md"
                fullWidth
              >
                Request a Demo
              </Button>
              <Button
                href="/student-parent-payments"
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Pay Student Fees
              </Button>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border text-center text-xs text-neutral-secondary">
              A product initiative by <span className="font-semibold text-neutral-primary">Sathus Technology Pvt. Ltd.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
