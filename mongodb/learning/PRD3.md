Project Requirement Document (PRD)

แอปพลิเคชันสินเชื่อดิจิทัล (Digital Lending Platform)

เวอร์ชัน: 1.0
วันที่: 8 กรกฎาคม 2569
สถานะ: Draft สำหรับพิจารณา


1. ภาพรวมโครงการ (Overview)

1.1 ปัญหาที่ต้องการแก้ไข

ตลาดสินเชื่อดิจิทัลไทยปัจจุบันมีผู้เล่นจำนวนมาก (มีตัง, FINNIX, ฯลฯ) แต่ส่วนใหญ่ยังพึ่งพา
เอกสารรายได้แบบดั้งเดิม (สลิปเงินเดือน, statement) ทำให้กลุ่ม freelance, พ่อค้าแม่ค้าออนไลน์,
และแรงงานนอกระบบ (ราว 60% ของคนไทย) เข้าถึงสินเชื่อในระบบได้ยาก และมักถูกร้องเรียนเรื่อง
การเข้าถึงข้อมูลส่วนบุคคลเกินความจำเป็น (เช่น การขอสิทธิ์เข้าถึงสมุดโทรศัพท์)

1.2 เป้าหมายโครงการ

สร้างแพลตฟอร์มสินเชื่อที่ (1) ใช้ข้อมูลทางเลือก (Alternative Data) แทนเอกสารรายได้แบบเดิม
(2) โปร่งใสและเคารพความเป็นส่วนตัวมากกว่าคู่แข่ง (3) อนุมัติเร็วโดยไม่ละเมิดมาตรฐาน
การกำกับดูแลของ ธปท./กระทรวงการคลัง

1.3 กลุ่มเป้าหมาย

กลุ่มลักษณะUnderserved/Unbankedไม่มีสลิปเงินเดือน แต่มีรายได้สม่ำเสมอพ่อค้าแม่ค้าออนไลน์ขายของบน Shopee/Lazada/FacebookFreelance/Gig workerรายได้ไม่แน่นอนแต่มี digital footprint


2. จุดต่างจากตลาด (Key Differentiators)

นี่คือหัวใจของโครงการ — แต่ละข้อคือสิ่งที่ คู่แข่งในตลาดยังไม่ทำ หรือทำได้ไม่ดี

D1. Alternative Credit Scoring แทนสลิปเงินเดือน


ใช้ข้อมูลค่าไฟ/ค่าน้ำ, ยอดเติมเงินมือถือ, พฤติกรรมการขายบน e-commerce
ต่างจากตลาด: คู่แข่งส่วนใหญ่ยังคงบังคับอัปโหลด statement/สลิปเงินเดือน


D2. Consent Management แบบ Granular (ละเอียดระดับ field)


ผู้ใช้เลือกได้ว่าจะแชร์ข้อมูลอะไรบ้าง แยกตาม purpose พร้อมเพิกถอนได้ทุกเมื่อ
ต่างจากตลาด: แอปคู่แข่งหลายเจ้าถูกร้องเรียนเรื่องขอสิทธิ์เข้าถึงรายชื่อผู้ติดต่อทั้งหมด
แบบ all-or-nothing โดยไม่แยกระดับความยินยอม


D3. Transparent APR Calculator แบบ Real-time


แสดงยอดผ่อนจริง + APR แบบ effective rate ก่อนกดยืนยันทุกครั้ง ไม่ใช่แค่ตอนสมัคร
ต่างจากตลาด: ส่วนใหญ่แสดงดอกเบี้ยรายเดือนเป็นตัวเลขเดียว ทำให้ผู้ใช้ประเมิน
ภาระจริงได้ยาก


D4. No Contact-List Access Policy


ไม่ขอสิทธิ์เข้าถึงสมุดโทรศัพท์เพื่อหา "บุคคลอ้างอิง" แบบอัตโนมัติ — ผู้ใช้กรอกเองเท่านั้น
พร้อมแจ้งวัตถุประสงค์ชัดเจนและขอ consent แยกจากบุคคลอ้างอิงโดยตรง (ผ่าน OTP ยืนยัน)
ต่างจากตลาด: เป็นจุดร้องเรียนที่พบบ่อยที่สุดของแอปสินเชื่อในตลาดปัจจุบัน


D5. Embedded Finance Trigger (Opt-in)


เสนอวงเงินอัตโนมัติเมื่อพฤติกรรมยอดขายใน e-commerce เพิ่มขึ้น แต่ผู้ใช้ต้อง opt-in ก่อน
ไม่ auto-push ข้อเสนอโดยไม่ขอความยินยอม
ต่างจากตลาด: เทรนด์ embedded finance กำลังมา แต่ยังไม่มีผู้เล่นรายย่อยที่ทำแบบ
privacy-first


D6. Compliance-as-Code


ทุกการเปลี่ยนแปลงอัตราดอกเบี้ย/เงื่อนไข ต้องผ่าน approval workflow ที่ผูกกับใบอนุญาต
(PICO/NANO Finance) อัตโนมัติ ป้องกันการตั้งค่าดอกเบี้ยเกินเพดานกฎหมายโดยไม่ตั้งใจ
ต่างจากตลาด: ส่วนใหญ่ตรวจสอบ compliance แบบ manual/หลังเกิดเหตุ



3. Functional Requirements

3.1 การสมัครและยืนยันตัวตน (Onboarding & KYC)

IDRequirementPriorityF1.1สมัครด้วยเลขบัตรประชาชน + เบอร์โทร (OTP)MustF1.2ยืนยันตัวตนด้วย Face Liveness DetectionMustF1.3เชื่อมต่อ Consent Center ให้เลือก data source ที่จะแชร์ (ค่าไฟ/ยอดขาย/เติมเงิน) แยกทีละรายการMustF1.4ไม่บังคับอัปโหลดสลิปเงินเดือน หากมี alternative data เพียงพอShould

3.2 การประเมินสินเชื่อ (Credit Assessment)

IDRequirementPriorityF2.1ระบบ Alternative Credit Scoring จาก 3+ แหล่งข้อมูลMustF2.2แสดงเหตุผลการอนุมัติ/ปฏิเสธแบบ human-readable (explainable AI)ShouldF2.3รองรับ NCB credit bureau เป็น data source เสริม (ไม่ใช่หลัก)Could

3.3 การเสนอวงเงินและเงื่อนไข (Offer)

IDRequirementPriorityF3.1คำนวณและแสดง APR (effective rate) แบบ real-time ก่อนยืนยันทุกครั้งMustF3.2จำลองตารางผ่อนชำระแบบ interactive ปรับยอด/ระยะเวลาได้ก่อนสมัครShouldF3.3แจ้งค่าปรับปิดบัญชีก่อนกำหนดชัดเจน (ถ้ามี)Must

3.4 บุคคลอ้างอิง (Reference)

IDRequirementPriorityF4.1กรอกบุคคลอ้างอิงด้วยตนเอง ไม่ดึงจากสมุดโทรศัพท์MustF4.2ส่ง OTP ยืนยันไปยังบุคคลอ้างอิงโดยตรง พร้อมแจ้งวัตถุประสงค์Must

3.5 การเบิกจ่ายและชำระคืน (Disbursement & Repayment)

IDRequirementPriorityF5.1โอนเงินผ่าน PromptPay ภายใน 5 นาทีหลังอนุมัติMustF5.2รองรับชำระผ่าน Mobile Banking, QR PromptPay, ATMMustF5.3แจ้งเตือนก่อนวันครบกำหนดชำระ 3 วัน / 1 วันMust

3.6 Embedded Finance (Opt-in)

IDRequirementPriorityF6.1ผู้ใช้ต้อง opt-in ก่อนรับข้อเสนอวงเงินอัตโนมัติจาก partner platformMustF6.2แสดงแหล่งที่มาของ trigger ทุกครั้ง (เช่น "จากยอดขาย Shopee ของคุณ")Should

3.7 Compliance & Governance

IDRequirementPriorityF7.1Workflow อนุมัติการเปลี่ยนอัตราดอกเบี้ย ผูกกับเพดานตามใบอนุญาตMustF7.2เก็บ audit log แยกสำหรับ compliance อย่างน้อย 7 ปีMustF7.3Consent revocation ทำได้จริงใน production (ลบ/หยุดใช้ข้อมูลจริง ไม่ใช่แค่ flag)Must


4. Non-Functional Requirements

หมวดRequirementความปลอดภัยเข้ารหัสข้อมูลอ่อนไหว (เลขบัตร ปชช., รายได้) ด้วย AES-256 ตามมาตรฐาน PDPAPerformanceอนุมัติเบื้องต้น (pre-approval) ภายใน 60 วินาทีAvailabilityUptime 99.9% สำหรับระบบสมัคร/อนุมัติComplianceสอดคล้องกับ PDPA, ข้อกำหนด ธปท., มาตรฐาน PCI-DSS (ถ้ามีการตัดบัตร)Auditabilityทุก decision ของ credit scoring ต้อง trace กลับไปยัง input data ได้Localizationรองรับภาษาไทยเป็นหลัก, เลข พ.ศ./ค.ศ.


5. โครงสร้างข้อมูลหลัก (High-level Data Model)

อ้างอิงจากการออกแบบก่อนหน้า พร้อมส่วนที่เพิ่มเพื่อรองรับจุดต่าง (D1-D6):

customers, customer_documents, identity_verifications
consents                              [D2]
alternative_data_sources              [D1]
credit_scoring_models                 [D1]
loan_products (apr_min, apr_max)      [D3]
loan_applications, application_scoring
reference_contacts (consent_obtained) [D4]
guarantors, collaterals
loan_accounts, repayment_schedules, transactions
partner_triggers (opt_in_status)      [D5]
regulatory_licenses                   [D6]
compliance_audit_logs                 [D6]
overdue_records, collection_activities
notifications, audit_logs

(รายละเอียด schema แบบเต็มสามารถขอเป็นเอกสารแยก หรือ SQL/Prisma schema ได้)


6. Out of Scope (เฟสแรก)


สินเชื่อบ้าน/รถยนต์ (มูลค่าสูง ต้องใช้หลักประกันซับซ้อน)
P2P Lending (เชื่อมโยงนักลงทุนรายบุคคล)
Virtual Bank license แบบเต็มรูปแบบ



7. Success Metrics (KPI)

Metricเป้าหมายApproval rate กลุ่ม Underservedเพิ่มขึ้น ≥30% เทียบกับการใช้เอกสารรายได้แบบเดิมCustomer complaint เรื่อง privacyลดลง ≥50% เทียบค่าเฉลี่ยตลาดเวลาอนุมัติเฉลี่ย< 5 นาทีNPL (Non-performing loan) ratioไม่สูงกว่าค่าเฉลี่ยอุตสาหกรรม แม้ approval rate สูงขึ้น


8. Open Questions / ต้องตัดสินใจเพิ่ม


จะขอใบอนุญาตประเภทไหน (PICO Finance / NANO Finance / P-Loan) — มีผลต่อวงเงินสูงสุดที่ปล่อยได้
จะพัฒนา Alternative Scoring Model เองหรือใช้ third-party (เช่น เชื่อม API กับผู้ให้บริการข้อมูลค่าไฟ)
งบประมาณและ timeline สำหรับขอ compliance certification (PDPA/ISO 27001)