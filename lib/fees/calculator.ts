import { getDb } from "@/lib/db";

export interface CalculatedItem {
  id: string;
  code: string;
  name: string;
  description: string | null;
  amount: number;
  is_mandatory: number;
  category: string;
}

export interface CalculationResult {
  student: {
    id: string;
    admission_number: string;
    name: string;
    grade_class: string;
    institution_id: string;
    academic_session: string;
  };
  institution: {
    id: string;
    name: string;
    code: string;
  };
  mandatoryItems: CalculatedItem[];
  selectedOptionalItems: CalculatedItem[];
  allItems: CalculatedItem[];
  subtotalMandatory: number;
  subtotalOptional: number;
  totalAmount: number;
  totalAmountPaise: number;
  currency: string;
}

/**
 * Server-authoritative fee calculation and anti-tamper engine
 */
export function calculateAuthoritativeTotal(
  admissionNumber: string,
  selectedOptionalItemIds: string[] = []
): CalculationResult {
  const db = getDb();

  // 1. Fetch student
  const student = db.prepare(`
    SELECT id, admission_number, name, grade_class, institution_id, academic_session
    FROM students
    WHERE admission_number = ?
  `).get(admissionNumber.trim()) as any;

  if (!student) {
    throw new Error(`Student with admission number "${admissionNumber}" was not found.`);
  }

  // 2. Fetch institution
  const institution = db.prepare(`
    SELECT id, name, code
    FROM institutions
    WHERE id = ?
  `).get(student.institution_id) as any;

  if (!institution) {
    throw new Error(`Institution "${student.institution_id}" was not found.`);
  }

  // 3. Fetch all active fee items for this institution
  const catalogItems = db.prepare(`
    SELECT id, code, name, description, amount, is_mandatory, category
    FROM fee_items
    WHERE institution_id = ? AND is_active = 1
  `).all(institution.id) as CalculatedItem[];

  if (catalogItems.length === 0) {
    throw new Error("No active fee structure found for this institution.");
  }

  const catalogMap = new Map<string, CalculatedItem>();
  const mandatoryItems: CalculatedItem[] = [];
  const validOptionalCatalog = new Map<string, CalculatedItem>();

  for (const item of catalogItems) {
    catalogMap.set(item.id, item);
    if (item.is_mandatory === 1) {
      mandatoryItems.push(item);
    } else {
      validOptionalCatalog.set(item.id, item);
    }
  }

  // Deduplicate and validate selected optional items
  const uniqueSelectedIds = Array.from(new Set(selectedOptionalItemIds || []));
  const selectedOptionalItems: CalculatedItem[] = [];

  for (const id of uniqueSelectedIds) {
    const optionalItem = validOptionalCatalog.get(id);
    if (!optionalItem) {
      // Reject unknown or non-optional fee item IDs
      throw new Error(`Invalid or ineligible optional charge identifier: "${id}".`);
    }
    selectedOptionalItems.push(optionalItem);
  }

  const subtotalMandatory = mandatoryItems.reduce((sum, item) => sum + item.amount, 0);
  const subtotalOptional = selectedOptionalItems.reduce((sum, item) => sum + item.amount, 0);
  const totalAmount = subtotalMandatory + subtotalOptional;
  const totalAmountPaise = totalAmount * 100;

  return {
    student,
    institution,
    mandatoryItems,
    selectedOptionalItems,
    allItems: [...mandatoryItems, ...selectedOptionalItems],
    subtotalMandatory,
    subtotalOptional,
    totalAmount,
    totalAmountPaise,
    currency: "INR",
  };
}
