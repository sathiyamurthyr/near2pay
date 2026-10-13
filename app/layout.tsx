import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://near2pay.com"),
  title: {
    default: "Near2Pay — Education Fee Payment Platform for Indian Institutions",
    template: "%s | Near2Pay by Sathus Technology",
  },
  description:
    "Near2Pay by Sathus Technology Pvt. Ltd. simplifies fee payments and collections for Indian schools, colleges, and coaching centres with instant digital receipts, multi-rail UPI payments, and automated reconciliations.",
  keywords: [
    "Near2Pay",
    "Sathus Technology",
    "school fee payment online India",
    "college semester fee payment",
    "coaching institute fee collection",
    "education fee management system India",
    "UPI fee payment for schools",
    "digital fee receipts",
    "student fee ledger",
  ],
  authors: [{ name: "Sathus Technology Pvt. Ltd." }],
  creator: "Sathus Technology Pvt. Ltd.",
  publisher: "Sathus Technology Pvt. Ltd.",
  icons: {
    icon: "/brand/logo.svg",
    apple: "/brand/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://near2pay.com",
    title: "Near2Pay — Education Fee Payment Platform for Indian Institutions",
    description:
      "Enterprise education fee management and digital collection platform built by Sathus Technology Pvt. Ltd. for Indian schools, colleges, and coaching centres.",
    siteName: "Near2Pay",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "Near2Pay by Sathus Technology",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://near2pay.com/#organization",
        "name": "Sathus Technology Pvt. Ltd.",
        "url": "https://near2pay.com",
        "logo": "https://near2pay.com/brand/logo.png",
        "sameAs": ["https://near2pay.com"],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@near2pay.com",
          "contactType": "Customer Support",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"],
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot No. 8/47, Sri Ambal Nagar Annexe, Ponni Amman Kovil St, Opp. Kedar Hospital, Kovur",
          "addressLocality": "Chennai",
          "postalCode": "600128",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://near2pay.com/#software",
        "name": "Near2Pay",
        "operatingSystem": "Web",
        "applicationCategory": "EducationalApplication, BusinessApplication",
        "publisher": {
          "@id": "https://near2pay.com/#organization",
        },
        "description":
          "Education fee collection and reconciliation platform for Indian schools, colleges, and coaching centres.",
      },
    ],
  };

  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-neutral-primary min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
