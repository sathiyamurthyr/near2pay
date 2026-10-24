export function seedInitialData(db: any) {
  // Check if institutions already seeded
  const checkStmt = db.prepare("SELECT COUNT(*) as count FROM institutions");
  const result = checkStmt.get() as { count: number };
  if (result.count > 0) {
    return;
  }

  const now = Date.now();

  // 1. Seed Institutions
  const insertInst = db.prepare(`
    INSERT INTO institutions (id, name, code, type, location, board, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const institutions = [
    {
      id: "inst-1",
      name: "Delhi Public Global Academy",
      code: "DPGA-DEL",
      type: "School",
      location: "Vasant Kunj, New Delhi",
      board: "CBSE Affiliated",
    },
    {
      id: "inst-2",
      name: "St. Xavier's Autonomous College",
      code: "SXAC-MUM",
      type: "College",
      location: "South Mumbai, Maharashtra",
      board: "University of Mumbai",
    },
    {
      id: "inst-3",
      name: "Apex JEE & NEET Career Institute",
      code: "AJNI-BLR",
      type: "Coaching Centre",
      location: "Koramangala, Bengaluru",
      board: "Competitive Test Prep",
    },
    {
      id: "inst-4",
      name: "National Model Matriculation Higher Sec School",
      code: "NMMH-CBE",
      type: "School",
      location: "Peelamedu, Coimbatore",
      board: "Tamil Nadu State Board",
    },
  ];

  for (const inst of institutions) {
    insertInst.run(inst.id, inst.name, inst.code, inst.type, inst.location, inst.board, now);
  }

  // 2. Seed Students
  const insertStudent = db.prepare(`
    INSERT INTO students (id, institution_id, admission_number, roll_number, name, grade_class, parent_name, parent_phone, parent_email, academic_session, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const students = [
    {
      id: "stu-1",
      institution_id: "inst-1",
      admission_number: "STU-2024-8891",
      roll_number: "24",
      name: "Aarav Sharma",
      grade_class: "Class 10-A (CBSE)",
      parent_name: "Mr. Rajesh Sharma",
      parent_phone: "+91 98765 43210",
      parent_email: "rajesh.sharma@example.com",
      academic_session: "2024–2025 (Term II)",
    },
    {
      id: "stu-2",
      institution_id: "inst-1",
      admission_number: "ADM-DEL-4029",
      roll_number: "12",
      name: "Priya Patel",
      grade_class: "Class 12-B (CBSE Science)",
      parent_name: "Mrs. Sunita Patel",
      parent_phone: "+91 98112 23344",
      parent_email: "sunita.patel@example.com",
      academic_session: "2024–2025 (Annual)",
    },
    {
      id: "stu-3",
      institution_id: "inst-3",
      admission_number: "ROLL-JEE-1044",
      roll_number: "44",
      name: "Rohan Verma",
      grade_class: "Target JEE Advanced 2025",
      parent_name: "Mr. Anil Verma",
      parent_phone: "+91 98223 34455",
      parent_email: "anil.verma@example.com",
      academic_session: "2024–2025 (Phase 2)",
    },
    {
      id: "stu-4",
      institution_id: "inst-2",
      admission_number: "SX-BCOM-2024",
      roll_number: "108",
      name: "Ananya Iyer",
      grade_class: "B.Com Honors (Semester 3)",
      parent_name: "Mr. S. Iyer",
      parent_phone: "+91 98334 45566",
      parent_email: "s.iyer@example.com",
      academic_session: "2024–2025 (Odd Semester)",
    },
  ];

  for (const s of students) {
    insertStudent.run(
      s.id,
      s.institution_id,
      s.admission_number,
      s.roll_number,
      s.name,
      s.grade_class,
      s.parent_name,
      s.parent_phone,
      s.parent_email,
      s.academic_session,
      now
    );
  }

  // 3. Seed Fee Items (Mandatory & Optional)
  const insertFee = db.prepare(`
    INSERT INTO fee_items (id, institution_id, code, name, description, amount, is_mandatory, category, is_active, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const feeItems = [
    // inst-1 (Delhi Public Global Academy)
    {
      id: "fee-inst1-tuition",
      institution_id: "inst-1",
      code: "TUITION",
      name: "Term 2 Tuition Fee",
      description: "Core classroom instruction, teacher compensation, academic curriculum delivery",
      amount: 18500,
      is_mandatory: 1,
      category: "tuition",
    },
    {
      id: "fee-inst1-lab",
      institution_id: "inst-1",
      code: "LAB",
      name: "Computer & STEM Lab Charges",
      description: "Robotics, high-speed fiber internet, hardware workstation maintenance",
      amount: 2500,
      is_mandatory: 1,
      category: "lab",
    },
    {
      id: "fee-inst1-exam",
      institution_id: "inst-1",
      code: "EXAM",
      name: "Annual Board Assessment Fee",
      description: "Board assessment stationery, mock exams, hall ticket and evaluation charges",
      amount: 1200,
      is_mandatory: 1,
      category: "exam",
    },
    {
      id: "fee-inst1-transport",
      institution_id: "inst-1",
      code: "TRANSPORT",
      name: "School Bus Route #14 Transport",
      description: "Air-conditioned GPS-tracked roundtrip bus transit with CCTV safety escort",
      amount: 3800,
      is_mandatory: 0,
      category: "transport",
    },
    {
      id: "fee-inst1-sports",
      institution_id: "inst-1",
      code: "SPORTS",
      name: "Sports Complex & Club Membership",
      description: "Access to Olympic swimming pool, synthetic badminton courts, professional coaching",
      amount: 1000,
      is_mandatory: 0,
      category: "sports",
    },
    {
      id: "fee-inst1-library",
      institution_id: "inst-1",
      code: "LIBRARY",
      name: "Extended Digital Library & E-Book Bank",
      description: "24/7 unlimited access to JSTOR, national digital library, curated e-textbooks",
      amount: 750,
      is_mandatory: 0,
      category: "other",
    },

    // inst-2 (St. Xavier's Autonomous College)
    {
      id: "fee-inst2-semester",
      institution_id: "inst-2",
      code: "SEM_TUITION",
      name: "Undergraduate Semester Tuition Fee",
      description: "Faculty lecture series, seminar credits, departmental lab modules",
      amount: 32000,
      is_mandatory: 1,
      category: "tuition",
    },
    {
      id: "fee-inst2-library",
      institution_id: "inst-2",
      code: "UNIV_LIB",
      name: "Central University Library & Archive Access",
      description: "Annual subscription to international academic journals and research databases",
      amount: 3500,
      is_mandatory: 1,
      category: "other",
    },
    {
      id: "fee-inst2-hostel-bus",
      institution_id: "inst-2",
      code: "CAMPUS_SHUTTLE",
      name: "Campus Shuttle & Transit Pass",
      description: "Unlimited daily connectivity between college gates, suburban rail and hostels",
      amount: 2200,
      is_mandatory: 0,
      category: "transport",
    },

    // inst-3 (Apex JEE & NEET Career Institute)
    {
      id: "fee-inst3-course",
      institution_id: "inst-3",
      code: "JEE_BATCH",
      name: "Intensive Classroom Batch Fee (Phase 2)",
      description: "Daily masterclasses, concept booster worksheets, doubt clearing slots",
      amount: 45000,
      is_mandatory: 1,
      category: "tuition",
    },
    {
      id: "fee-inst3-test-series",
      institution_id: "inst-3",
      code: "ALL_INDIA_TESTS",
      name: "All-India Computer Based Test Series",
      description: "30 National level mock tests with percentile analysis and AI diagnostic reports",
      amount: 6000,
      is_mandatory: 1,
      category: "exam",
    },
    {
      id: "fee-inst3-transport",
      institution_id: "inst-3",
      code: "COACHING_BUS",
      name: "Metro-to-Centre Feeder Bus Transit",
      description: "Dedicated morning and evening pickup from nearest metro stations",
      amount: 2500,
      is_mandatory: 0,
      category: "transport",
    },

    // inst-4 (National Model Matriculation)
    {
      id: "fee-inst4-tuition",
      institution_id: "inst-4",
      code: "MATRIC_TUITION",
      name: "Higher Secondary Term Tuition",
      description: "Tamil Nadu State curriculum instruction, smart class facilities",
      amount: 14000,
      is_mandatory: 1,
      category: "tuition",
    },
    {
      id: "fee-inst4-transport",
      institution_id: "inst-4",
      code: "SCHOOL_VAN",
      name: "School Van Transportation (Route B)",
      description: "Door-to-door morning pickup and evening return with speed governor compliance",
      amount: 3200,
      is_mandatory: 0,
      category: "transport",
    },
  ];

  for (const f of feeItems) {
    insertFee.run(
      f.id,
      f.institution_id,
      f.code,
      f.name,
      f.description,
      f.amount,
      f.is_mandatory,
      f.category,
      1,
      now
    );
  }
}
