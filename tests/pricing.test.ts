import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getDb, createTestDb } from "../lib/db";
import { calculateAuthoritativeTotal } from "../lib/fees/calculator";

describe("Phase 6B: Optional-Charge Selection & Pricing Tests", () => {
  beforeEach(() => {
    createTestDb();
  });

  const studentAdmNo = "STU-2024-8891"; // Delhi Public Global Academy (inst-1)

  test("1. All optional charges deselected — only mandatory items charged", () => {
    const result = calculateAuthoritativeTotal(studentAdmNo, []);

    // Delhi Public Global Academy mandatory:
    // Tuition (18500) + Lab (2500) + Exam (1200) = 22200
    assert.equal(result.mandatoryItems.length, 3);
    assert.equal(result.selectedOptionalItems.length, 0);
    assert.equal(result.subtotalMandatory, 22200);
    assert.equal(result.subtotalOptional, 0);
    assert.equal(result.totalAmount, 22200);
    assert.equal(result.totalAmountPaise, 2220000);
  });

  test("2. One optional charge selected (School Bus Route #14 Transport)", () => {
    // Transport fee: 3800
    const result = calculateAuthoritativeTotal(studentAdmNo, ["fee-inst1-transport"]);

    assert.equal(result.mandatoryItems.length, 3);
    assert.equal(result.selectedOptionalItems.length, 1);
    assert.equal(result.selectedOptionalItems[0].code, "TRANSPORT");
    assert.equal(result.selectedOptionalItems[0].amount, 3800);
    assert.equal(result.subtotalMandatory, 22200);
    assert.equal(result.subtotalOptional, 3800);
    assert.equal(result.totalAmount, 26000); // 22200 + 3800
    assert.equal(result.totalAmountPaise, 2600000);
  });

  test("3. One optional charge deselected after selection", () => {
    // Initial selection with transport:
    const initial = calculateAuthoritativeTotal(studentAdmNo, ["fee-inst1-transport"]);
    assert.equal(initial.totalAmount, 26000);

    // Customer deselects transport:
    const updated = calculateAuthoritativeTotal(studentAdmNo, []);
    assert.equal(updated.totalAmount, 22200);
    assert.equal(updated.subtotalOptional, 0);
  });

  test("4. Multiple optional charges selected (Transport + Sports + Library)", () => {
    // Transport: 3800, Sports: 1000, Library: 750
    const result = calculateAuthoritativeTotal(studentAdmNo, [
      "fee-inst1-transport",
      "fee-inst1-sports",
      "fee-inst1-library",
    ]);

    assert.equal(result.selectedOptionalItems.length, 3);
    assert.equal(result.subtotalMandatory, 22200);
    assert.equal(result.subtotalOptional, 3800 + 1000 + 750); // 5550
    assert.equal(result.totalAmount, 22200 + 5550); // 27750
    assert.equal(result.totalAmountPaise, 2775000);
  });

  test("5. Mandatory charges remain strictly included even if excluded from client payload", () => {
    // Client passes empty list or only optional charges:
    const result = calculateAuthoritativeTotal(studentAdmNo, ["fee-inst1-sports"]);

    const mandatoryCodes = result.mandatoryItems.map((i) => i.code);
    assert.ok(mandatoryCodes.includes("TUITION"));
    assert.ok(mandatoryCodes.includes("LAB"));
    assert.ok(mandatoryCodes.includes("EXAM"));
    assert.equal(result.subtotalMandatory, 22200);
  });

  test("6. Total recalculates authoritatively after every selection change", () => {
    let currentOptionalIds: string[] = [];
    assert.equal(calculateAuthoritativeTotal(studentAdmNo, currentOptionalIds).totalAmount, 22200);

    // Add Bus transport (+3800)
    currentOptionalIds.push("fee-inst1-transport");
    assert.equal(calculateAuthoritativeTotal(studentAdmNo, currentOptionalIds).totalAmount, 26000);

    // Add Sports (+1000)
    currentOptionalIds.push("fee-inst1-sports");
    assert.equal(calculateAuthoritativeTotal(studentAdmNo, currentOptionalIds).totalAmount, 27000);

    // Remove Bus transport (-3800)
    currentOptionalIds = currentOptionalIds.filter((id) => id !== "fee-inst1-transport");
    assert.equal(calculateAuthoritativeTotal(studentAdmNo, currentOptionalIds).totalAmount, 23200);
  });

  test("7. Server and client calculation agreement", () => {
    const selectedIds = ["fee-inst1-transport", "fee-inst1-sports"];
    const serverResult = calculateAuthoritativeTotal(studentAdmNo, selectedIds);

    // Simulated client calculation using verified rates
    const clientItems = [
      { id: "fee-inst1-tuition", amount: 18500, required: true },
      { id: "fee-inst1-lab", amount: 2500, required: true },
      { id: "fee-inst1-exam", amount: 1200, required: true },
      { id: "fee-inst1-transport", amount: 3800, required: false },
      { id: "fee-inst1-sports", amount: 1000, required: false },
    ];

    const clientTotal = clientItems
      .filter((i) => i.required || selectedIds.includes(i.id))
      .reduce((sum, i) => sum + i.amount, 0);

    assert.equal(serverResult.totalAmount, clientTotal);
    assert.equal(serverResult.totalAmount, 27000);
  });

  test("8. Invalid charge identifiers are rejected", () => {
    assert.throws(() => {
      calculateAuthoritativeTotal(studentAdmNo, ["non_existent_charge_id"]);
    }, /Invalid or ineligible optional charge identifier/);
  });

  test("9. Client-side price manipulation is impossible (prices pulled strictly from DB)", () => {
    // The calculateAuthoritativeTotal function only accepts charge IDs.
    // Client cannot pass a custom 'amount' field; the server strictly looks up catalog amount.
    const result = calculateAuthoritativeTotal(studentAdmNo, ["fee-inst1-transport"]);
    assert.equal(result.selectedOptionalItems[0].amount, 3800);
  });

  test("10. Ineligible optional services from other institutions are rejected", () => {
    // 'fee-inst2-hostel-bus' belongs to St. Xavier's College (inst-2), not Delhi Public Global Academy (inst-1)
    assert.throws(() => {
      calculateAuthoritativeTotal(studentAdmNo, ["fee-inst2-hostel-bus"]);
    }, /Invalid or ineligible optional charge identifier/);
  });

  test("11. Pricing remains consistent during checkout snapshot", () => {
    const calc = calculateAuthoritativeTotal(studentAdmNo, ["fee-inst1-transport"]);
    assert.equal(calc.totalAmount, 26000);

    // Ensure sum of all items exactly matches total
    const itemSum = calc.allItems.reduce((sum, item) => sum + item.amount, 0);
    assert.equal(itemSum, calc.totalAmount);
    assert.equal(calc.totalAmountPaise, calc.totalAmount * 100);
  });
});
