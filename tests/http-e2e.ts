import assert from "node:assert/strict";

async function runHttpE2e() {
  const baseUrl = "http://localhost:3000";
  console.log(`\n=== Running Live HTTP End-to-End Test Suite against ${baseUrl} ===\n`);

  // 1. Register a new customer
  const timestamp = Date.now();
  const testEmail = `live_parent_${timestamp}@gmail.com`;
  const testPassword = "LivePassword2026!";
  const testName = "Pooja Verma";
  const testPhone = "+91 9876543210";

  console.log("Step 1: Registering new customer...");
  const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      name: testName,
      phone: testPhone,
    }),
  });

  const registerData = await registerRes.json();
  console.log("Register response status:", registerRes.status, registerData);
  assert.equal(registerRes.status, 201);
  assert.equal(registerData.success, true);
  assert.equal(registerData.user.email, testEmail);

  // Extract session cookie from registration
  const setCookieHeader = registerRes.headers.get("set-cookie");
  assert.ok(setCookieHeader, "Expected set-cookie header on registration");
  const sessionCookie = setCookieHeader.split(";")[0];
  console.log("Session established via cookie:", sessionCookie.substring(0, 25) + "...");

  // 2. Query authenticated profile (/api/auth/me)
  console.log("\nStep 2: Verifying session with /api/auth/me...");
  const meRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Cookie: sessionCookie },
  });
  const meData = await meRes.json();
  console.log("Me response:", meData);
  assert.equal(meRes.status, 200);
  assert.equal(meData.user.email, testEmail);

  // 3. Query fee structure for student STU-2024-8891
  console.log("\nStep 3: Fetching student fee catalog for STU-2024-8891...");
  const studentRes = await fetch(`${baseUrl}/api/fees/student?admNo=STU-2024-8891`);
  const studentData = await studentRes.json();
  const mandatoryItems = (studentData.feeItems || []).filter((i: any) => i.is_mandatory === 1);
  const optionalItems = (studentData.feeItems || []).filter((i: any) => i.is_mandatory === 0);
  console.log("Student Data:", {
    student: studentData.student.name,
    institution: studentData.student.institution.name,
    mandatoryItems: mandatoryItems.map((i: any) => `${i.name}: ₹${i.amount}`),
    optionalItems: optionalItems.map((i: any) => `${i.name}: ₹${i.amount}`),
  });
  assert.equal(studentRes.status, 200);
  assert.equal(studentData.student.admission_number, "STU-2024-8891");

  // 4. Test Authoritative Price Calculation with Bus Transport (+3800)
  console.log("\nStep 4: Authoritative price calculation with Optional Bus Transport...");
  const busTransportItem = optionalItems.find((i: any) => i.code === "TRANSPORT");
  assert.ok(busTransportItem, "Expected School Bus Route #14 Transport item");

  const calcWithBusRes = await fetch(`${baseUrl}/api/fees/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentAdmissionNumber: "STU-2024-8891",
      selectedOptionalItemIds: [busTransportItem.id],
    }),
  });
  const calcWithBusData = await calcWithBusRes.json();
  console.log("Calculation with Bus Transport:", {
    subtotalMandatory: calcWithBusData.subtotalMandatory,
    subtotalOptional: calcWithBusData.subtotalOptional,
    totalAmount: calcWithBusData.totalAmount,
  });
  assert.equal(calcWithBusData.subtotalMandatory, 22200);
  assert.equal(calcWithBusData.subtotalOptional, 3800);
  assert.equal(calcWithBusData.totalAmount, 26000);

  // 5. Test Deselection of Bus Transport
  console.log("\nStep 5: Authoritative price calculation with Bus Transport Deselected...");
  const calcWithoutBusRes = await fetch(`${baseUrl}/api/fees/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentAdmissionNumber: "STU-2024-8891",
      selectedOptionalItemIds: [],
    }),
  });
  const calcWithoutBusData = await calcWithoutBusRes.json();
  console.log("Calculation without Bus Transport:", {
    totalAmount: calcWithoutBusData.totalAmount,
  });
  assert.equal(calcWithoutBusData.totalAmount, 22200);

  // 6. Create Order with Optional Bus Transport Selected (₹26,000)
  console.log("\nStep 6: Creating authenticated Order with Bus Transport Selected...");
  const createOrderRes = await fetch(`${baseUrl}/api/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      studentAdmissionNumber: "STU-2024-8891",
      selectedOptionalItemIds: [busTransportItem.id],
    }),
  });
  const createOrderData = await createOrderRes.json();
  console.log("Order Created:", {
    orderId: createOrderData.order.id,
    orderNumber: createOrderData.order.orderNumber,
    totalAmount: createOrderData.order.totalAmount,
  });
  assert.equal(createOrderRes.status, 200);
  assert.equal(createOrderData.order.totalAmount, 26000);

  // 7. Create Razorpay Payment Order
  console.log("\nStep 7: Creating Gateway Payment Order...");
  const payOrderRes = await fetch(`${baseUrl}/api/payments/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      orderId: createOrderData.order.id,
    }),
  });
  const payOrderData = await payOrderRes.json();
  console.log("Gateway Order Response:", payOrderData);
  assert.equal(payOrderRes.status, 200);
  assert.equal(payOrderData.success, true);
  assert.ok(payOrderData.gatewayOrderId.startsWith("order_"));
  assert.equal(payOrderData.amount, 2600000);

  // 8. Authorize and Verify Sandbox Payment
  console.log("\nStep 8: Verifying payment via server-side verification endpoint...");
  const mockPaymentId = `pay_live_e2e_${Date.now()}`;
  const sandboxSignature = `sandbox_verified_${payOrderData.gatewayOrderId}`;
  const verifyRes = await fetch(`${baseUrl}/api/payments/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      orderId: createOrderData.order.id,
      razorpayOrderId: payOrderData.gatewayOrderId,
      razorpayPaymentId: mockPaymentId,
      razorpaySignature: sandboxSignature,
      isSandbox: true,
      paymentMethod: "upi",
    }),
  });
  const verifyData = await verifyRes.json();
  console.log("Payment Verification Response:", verifyData);
  assert.equal(verifyRes.status, 200);
  assert.equal(verifyData.success, true);
  assert.equal(verifyData.status, "PAID");

  // 9. Verify Order History for Logged In Customer
  console.log("\nStep 9: Verifying customer order history in /api/orders/history...");
  const historyRes = await fetch(`${baseUrl}/api/orders/history`, {
    headers: { Cookie: sessionCookie },
  });
  const historyData = await historyRes.json();
  console.log("Customer Order History count:", historyData.orders.length);
  assert.equal(historyRes.status, 200);
  const foundOrder = historyData.orders.find((o: any) => o.id === createOrderData.order.id);
  assert.ok(foundOrder, "Expected newly paid order in customer order history");
  assert.equal(foundOrder.status, "PAID");
  assert.equal(foundOrder.total_amount, 26000);
  assert.equal(foundOrder.payment.gateway_payment_id, mockPaymentId);

  console.log("\n🎉 ALL 9 LIVE HTTP END-TO-END STEPS VERIFIED AND PASSED!\n");
}

runHttpE2e().catch((err) => {
  console.error("HTTP E2E Failed:", err);
  process.exit(1);
});
