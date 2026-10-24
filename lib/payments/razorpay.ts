import { createHmac, timingSafeEqual, randomBytes } from "crypto";

export interface CreateRazorpayOrderParams {
  amountPaise: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResult {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_near4you_sandbox";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_near4you_sandbox_key";
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "rzp_webhook_secret_near4you";
  const isSandbox = !process.env.RAZORPAY_LIVE || process.env.RAZORPAY_LIVE !== "true";

  return { keyId, keySecret, webhookSecret, isSandbox };
}

/**
 * Creates a Razorpay Order
 * If live credentials are provided, calls Razorpay REST API.
 * Otherwise, generates a valid sandbox order for testing & integration.
 */
export async function createRazorpayOrder(
  params: CreateRazorpayOrderParams
): Promise<RazorpayOrderResult> {
  const { keyId, keySecret, isSandbox } = getRazorpayCredentials();

  // If real live API keys are provided and live mode requested
  if (!isSandbox && !keyId.startsWith("rzp_test_")) {
    const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: params.amountPaise,
        currency: params.currency || "INR",
        receipt: params.receipt,
        notes: params.notes || {},
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`Razorpay gateway error: ${err.error?.description || "Order creation failed"}`);
    }

    return await response.json();
  }

  // Sandbox Mode Order Generation
  const sandboxOrderId = "order_" + randomBytes(8).toString("hex");
  return {
    id: sandboxOrderId,
    amount: params.amountPaise,
    currency: params.currency || "INR",
    receipt: params.receipt,
    status: "created",
  };
}

/**
 * Cryptographically verifies Razorpay payment signature
 * signature = HMAC-SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  try {
    const { keySecret } = getRazorpayCredentials();
    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = createHmac("sha256", keySecret).update(payload).digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Cryptographically verifies Razorpay webhook signature
 * X-Razorpay-Signature header vs HMAC-SHA256(rawBody, webhookSecret)
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signatureHeader: string | null | undefined
): boolean {
  if (!signatureHeader) return false;
  try {
    const { webhookSecret } = getRazorpayCredentials();
    const expectedSignature = createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(signatureHeader);

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Generates valid sandbox signatures for test executions
 */
export function generateSandboxSignature(orderId: string, paymentId: string): string {
  const { keySecret } = getRazorpayCredentials();
  const payload = `${orderId}|${paymentId}`;
  return createHmac("sha256", keySecret).update(payload).digest("hex");
}

export function generateSandboxWebhookSignature(rawBody: string): string {
  const { webhookSecret } = getRazorpayCredentials();
  return createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
}
