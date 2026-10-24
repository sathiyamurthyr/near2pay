import { NextRequest, NextResponse } from "next/server";
import { calculateAuthoritativeTotal } from "@/lib/fees/calculator";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentAdmissionNumber, selectedOptionalItemIds } = body;

    if (!studentAdmissionNumber || typeof studentAdmissionNumber !== "string") {
      return NextResponse.json(
        { error: "Student admission number is required." },
        { status: 400 }
      );
    }

    if (selectedOptionalItemIds && !Array.isArray(selectedOptionalItemIds)) {
      return NextResponse.json(
        { error: "selectedOptionalItemIds must be an array of charge IDs." },
        { status: 400 }
      );
    }

    const result = calculateAuthoritativeTotal(
      studentAdmissionNumber,
      selectedOptionalItemIds || []
    );

    return NextResponse.json({
      success: true,
      subtotalMandatory: result.subtotalMandatory,
      subtotalOptional: result.subtotalOptional,
      totalAmount: result.totalAmount,
      totalAmountPaise: result.totalAmountPaise,
      currency: result.currency,
      mandatoryItems: result.mandatoryItems,
      selectedOptionalItems: result.selectedOptionalItems,
      allItems: result.allItems,
    });
  } catch (error: any) {
    console.error("Fee calculation error:", error);
    return NextResponse.json(
      { error: error.message || "Unable to calculate fee total." },
      { status: 400 }
    );
  }
}
