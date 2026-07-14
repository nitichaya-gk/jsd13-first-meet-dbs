use("used-medical-marketplace-db");

db.listings.drop();

// สร้าง Collection พร้อม Validator (เหมือนเดิม)
db.createCollection("listings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "seller_id",
        "category_id",
        "title",
        "price",
        "item_condition",
        "status",
        "created_at"
      ],
      properties: {
        seller_id: { bsonType: "objectId", description: "FK -> users._id" },
        category_id: { bsonType: "objectId", description: "FK -> categories._id" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        price: { bsonType: "number" },
        item_condition: { bsonType: "string", enum: ["used_like_new", "used_good", "used_fair"] },
        status: { bsonType: "string", enum: ["active", "reserved", "sold"] },
        images: { bsonType: "array", items: { bsonType: "string" } },
        location: { bsonType: "string" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

// สร้าง Index (เหมือนเดิม)
db.listings.createIndex({ seller_id: 1 });
db.listings.createIndex({ category_id: 1 });
db.listings.createIndex({ status: 1 });
db.listings.createIndex({ price: 1 });
db.listings.createIndex({ created_at: -1 });

// Mock Data (25 รายการ) แก้ไข Category ID ให้ตรงกับ 8 หมวดหมู่
db.listings.insertMany([
  {
    _id: ObjectId("65f200000000000000000001"),
    seller_id: ObjectId("65f100000000000000000001"),
    category_id: ObjectId("65f700000000000000000001"), // Hospital Bed
    title: "เตียงผู้ป่วยไฟฟ้า 3 ไกร์",
    description: "สภาพดี ใช้งาน 1 ปี ปรับระดับได้ครบ พร้อมที่นอนหุ้มหนังพีวีซี",
    price: 9500, item_condition: "used_good", status: "active",
    images: ["bed_electric_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-01T08:00:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000002"),
    seller_id: ObjectId("65f100000000000000000002"),
    category_id: ObjectId("65f700000000000000000002"), // Wheelchair
    title: "วีลแชร์อลูมิเนียมพับได้ น้ำหนักเบา",
    description: "น้ำหนักเพียง 9 กก. พับใส่ท้ายรถเก๋งได้ ล้อใหม่ พร้อมเบรกมือ",
    price: 3200, item_condition: "used_like_new", status: "active",
    images: ["wheelchair_alum_01.jpg"], location: "ขอนแก่น", created_at: new Date("2026-07-02T09:00:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000003"),
    seller_id: ObjectId("65f100000000000000000003"),
    category_id: ObjectId("65f700000000000000000004"), // Respiratory
    title: "เครื่องผลิตออกซิเจน 5 ลิตร",
    description: "ใช้งานไปเพียง 20 ชั่วโมง ยังอยู่ในประกันศูนย์ไทย",
    price: 12500, item_condition: "used_like_new", status: "active",
    images: ["oxygen_conc_01.jpg"], location: "เชียงใหม่", created_at: new Date("2026-07-03T10:30:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000004"),
    seller_id: ObjectId("65f100000000000000000004"),
    category_id: ObjectId("65f700000000000000000001"), // Hospital Bed (ที่นอนลมถือเป็นอุปกรณ์เตียง)
    title: "ที่นอนลมป้องกันแผลกดทับ แบบรังผึ้ง",
    description: "มอเตอร์ทำงานปกติ มีรอยเปื้อนเล็กน้อยซักออกได้ ใช้งานได้ปกติ",
    price: 1800, item_condition: "used_fair", status: "reserved",
    images: ["mattress_air_01.jpg"], location: "นนทบุรี", created_at: new Date("2026-07-04T14:15:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000005"),
    seller_id: ObjectId("65f100000000000000000001"),
    category_id: ObjectId("65f700000000000000000005"), // Medical Monitor
    title: "เครื่องวัดความดันโลหิตดิจิตอล Omron",
    description: "พร้อมผ้าพันแขนขนาด L แบตเตอรี่เพิ่งเปลี่ยนใหม่ แถมอแดปเตอร์",
    price: 950, item_condition: "used_good", status: "sold",
    images: ["bp_monitor_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-05T08:45:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000006"),
    seller_id: ObjectId("65f100000000000000000005"),
    category_id: ObjectId("65f700000000000000000003"), // Walking Aid
    title: "ไม้เท้า 4 ขา อลูมิเนียมอัลลอย",
    description: "ปรับระดับความสูงได้ จุกยางยังไม่สึก แข็งแรงทนทาน",
    price: 250, item_condition: "used_good", status: "active",
    images: ["cane_4legs_01.jpg"], location: "ชลบุรี", created_at: new Date("2026-07-06T16:20:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000007"),
    seller_id: ObjectId("65f100000000000000000006"),
    category_id: ObjectId("65f700000000000000000004"), // Respiratory
    title: "เครื่องพ่นยาขยายหลอดลม (Nebulizer)",
    description: "ซื้อมาสำรองแทบไม่ได้ใช้ อุปกรณ์ครบกล่อง หน้ากากเด็กและผู้ใหญ่ครบ",
    price: 1100, item_condition: "used_like_new", status: "active",
    images: ["nebulizer_01.jpg"], location: "ปทุมธานี", created_at: new Date("2026-07-07T09:10:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000008"),
    seller_id: ObjectId("65f100000000000000000007"),
    category_id: ObjectId("65f700000000000000000004"), // Respiratory
    title: "เครื่องดูดเสมหะ (Suction Machine)",
    description: "แรงดูดดี เสียงไม่ดังมาก แถมสายยางดูดเสมหะของใหม่ 5 เส้น",
    price: 2500, item_condition: "used_good", status: "active",
    images: ["suction_01.jpg"], location: "สมุทรปราการ", created_at: new Date("2026-07-08T11:00:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000009"),
    seller_id: ObjectId("65f100000000000000000008"),
    category_id: ObjectId("65f700000000000000000003"), // Walking Aid
    title: "วอล์คเกอร์พับได้ (Walker)",
    description: "มีรอยถลอกตามการใช้งาน โครงสร้างยังแข็งแรง พับเก็บง่าย",
    price: 450, item_condition: "used_fair", status: "sold",
    images: ["walker_01.jpg"], location: "นครราชสีมา", created_at: new Date("2026-07-09T13:30:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000010"),
    seller_id: ObjectId("65f100000000000000000009"),
    category_id: ObjectId("65f700000000000000000006"), // Bathroom Equipment
    title: "เก้าอี้นั่งถ่าย คร่อมชักโครกได้",
    description: "พลาสติกหนาเกรด A ล้างทำความสะอาดฆ่าเชื้อแล้วเรียบร้อย",
    price: 800, item_condition: "used_like_new", status: "active",
    images: ["commode_chair_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-10T10:15:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000011"),
    seller_id: ObjectId("65f100000000000000000010"),
    category_id: ObjectId("65f700000000000000000004"), // Respiratory
    title: "เครื่อง CPAP แก้นอนกรน ResMed",
    description: "ใช้งาน 2 ปี เปลี่ยนฟิลเตอร์ตลอด ต้องซื้อหน้ากากใหม่เอง",
    price: 15000, item_condition: "used_good", status: "reserved",
    images: ["cpap_resmed_01.jpg"], location: "ภูเก็ต", created_at: new Date("2026-07-10T15:20:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000012"),
    seller_id: ObjectId("65f100000000000000000002"),
    category_id: ObjectId("65f700000000000000000005"), // Medical Monitor
    title: "เครื่องตรวจวัดน้ำตาลในเลือด Accu-Chek",
    description: "แถมปากกาเจาะเลือด ไม่รวมแผ่นตรวจ",
    price: 300, item_condition: "used_like_new", status: "active",
    images: ["glucometer_01.jpg"], location: "ขอนแก่น", created_at: new Date("2026-07-11T09:40:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000013"),
    seller_id: ObjectId("65f100000000000000000003"),
    category_id: ObjectId("65f700000000000000000001"), // Hospital Bed (โต๊ะคร่อมเตียง)
    title: "โต๊ะคร่อมเตียงผู้ป่วย ลายไม้",
    description: "ปรับระดับสูงต่ำได้ มีล้อล็อคได้ ใช้งานสะดวก",
    price: 900, item_condition: "used_good", status: "active",
    images: ["overbed_table_01.jpg"], location: "เชียงใหม่", created_at: new Date("2026-07-11T12:00:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000014"),
    seller_id: ObjectId("65f100000000000000000004"),
    category_id: ObjectId("65f700000000000000000002"), // Wheelchair
    title: "รถเข็นผู้ป่วยไฟฟ้า บังคับด้วยจอยสติ๊ก",
    description: "แบตเตอรี่ยังเก็บไฟได้ดี วิ่งได้ไกล 15 กม.",
    price: 22000, item_condition: "used_good", status: "active",
    images: ["electric_wheelchair_01.jpg"], location: "นนทบุรี", created_at: new Date("2026-07-11T16:30:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000015"),
    seller_id: ObjectId("65f100000000000000000005"),
    category_id: ObjectId("65f700000000000000000008"), // Others
    title: "เครื่องช่วยฟังแบบทัดหลังหู",
    description: "มีเสียงซ่าบ้างบางครั้ง แต่ยังขยายเสียงได้ปกติ เหมาะสำหรับผู้เริ่มต้น",
    price: 1500, item_condition: "used_fair", status: "sold",
    images: ["hearing_aid_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-12T08:15:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000016"),
    seller_id: ObjectId("65f100000000000000000006"),
    category_id: ObjectId("65f700000000000000000008"), // Others
    title: "เสาน้ำเกลือสแตนเลสแบบ 4 แฉก มีล้อ",
    description: "ปรับความสูงได้ ไม่เป็นสนิม ล้อลื่นเข็นง่าย",
    price: 500, item_condition: "used_good", status: "active",
    images: ["iv_pole_01.jpg"], location: "ชลบุรี", created_at: new Date("2026-07-12T10:45:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000017"),
    seller_id: ObjectId("65f100000000000000000007"),
    category_id: ObjectId("65f700000000000000000004"), // Respiratory
    title: "ถังออกซิเจน 1.5 คิว พร้อมเกจ์วัด",
    description: "ซื้อมาสแตนด์บายฉุกเฉิน ออกซิเจนยังเต็มถัง",
    price: 2000, item_condition: "used_like_new", status: "active",
    images: ["oxygen_tank_01.jpg"], location: "ปทุมธานี", created_at: new Date("2026-07-12T13:20:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000018"),
    seller_id: ObjectId("65f100000000000000000008"),
    category_id: ObjectId("65f700000000000000000003"), // Walking Aid
    title: "รถเข็นช่วยเดิน (Rollator) มีเบาะนั่ง",
    description: "โครงอลูมิเนียมสีแดง มีตะกร้าใส่ของด้านล่างและเบรกมือ",
    price: 1800, item_condition: "used_good", status: "reserved",
    images: ["rollator_01.jpg"], location: "สมุทรปราการ", created_at: new Date("2026-07-12T15:50:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000019"),
    seller_id: ObjectId("65f100000000000000000009"),
    category_id: ObjectId("65f700000000000000000001"), // Hospital Bed
    title: "ที่นอนยางพาราสำหรับผู้ป่วยติดเตียง",
    description: "หนา 4 นิ้ว หุ้มหนังเทียมกันน้ำ เช็ดทำความสะอาดง่าย ไม่ยุบตัว",
    price: 3500, item_condition: "used_good", status: "active",
    images: ["latex_mattress_01.jpg"], location: "นครราชสีมา", created_at: new Date("2026-07-13T09:00:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000020"),
    seller_id: ObjectId("65f100000000000000000010"),
    category_id: ObjectId("65f700000000000000000008"), // Others
    title: "เครื่องกระตุ้นกล้ามเนื้อไฟฟ้า TENS",
    description: "แผ่นแปะใหม่ 4 แผ่น ใช้งานง่าย บรรเทาอาการปวดเมื่อย",
    price: 1200, item_condition: "used_like_new", status: "active",
    images: ["tens_machine_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-13T10:30:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000021"),
    seller_id: ObjectId("65f100000000000000000001"),
    category_id: ObjectId("65f700000000000000000008"), // Others (รองเท้าเฝือก)
    title: "รองเท้าเฝือก (Walking Boot) ไซส์ M",
    description: "ใส่เดินได้ปกติ มีร่องรอยการเดินเล็กน้อย ตีนตุ๊กแกยังติดแน่น",
    price: 600, item_condition: "used_good", status: "sold",
    images: ["walking_boot_01.jpg"], location: "ภูเก็ต", created_at: new Date("2026-07-13T11:45:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000022"),
    seller_id: ObjectId("65f100000000000000000002"),
    category_id: ObjectId("65f700000000000000000005"), // Medical Monitor
    title: "เครื่องวัดออกซิเจนปลายนิ้ว (Pulse Oximeter)",
    description: "จอบางจุดไฟขาดนิดหน่อย แต่อ่านค่าได้แม่นยำปกติ",
    price: 150, item_condition: "used_fair", status: "active",
    images: ["oximeter_01.jpg"], location: "ขอนแก่น", created_at: new Date("2026-07-13T13:20:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000023"),
    seller_id: ObjectId("65f100000000000000000003"),
    category_id: ObjectId("65f700000000000000000001"), // Hospital Bed
    title: "เตียงผู้ป่วยมือหมุน 2 ไกร์",
    description: "เหล็กหนาแข็งแรง หมุนปรับหัวและขาได้ ล้อล็อกได้ 4 ล้อ",
    price: 5500, item_condition: "used_good", status: "active",
    images: ["bed_manual_01.jpg"], location: "เชียงใหม่", created_at: new Date("2026-07-13T14:40:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000024"),
    seller_id: ObjectId("65f100000000000000000004"),
    category_id: ObjectId("65f700000000000000000008"), // Others
    title: "สายรัดพยุงหลัง (Lumbar Support) ไซส์ L",
    description: "ผ้ายืดระบายอากาศได้ดี แกนดันหลังอลูมิเนียมดัดได้",
    price: 250, item_condition: "used_good", status: "active",
    images: ["lumbar_support_01.jpg"], location: "นนทบุรี", created_at: new Date("2026-07-13T16:15:00Z")
  },
  {
    _id: ObjectId("65f200000000000000000025"),
    seller_id: ObjectId("65f100000000000000000005"),
    category_id: ObjectId("65f700000000000000000007"), // Patient Lift
    title: "เครื่องยกผู้ป่วย (Patient Lift)",
    description: "ระบบไฮดรอลิก ช่วยเคลื่อนย้ายผู้ป่วยจากเตียงไปรถเข็น แถมผ้ายกตัว 1 ผืน",
    price: 18000, item_condition: "used_like_new", status: "reserved",
    images: ["patient_lift_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-13T18:00:00Z")
  }
]);

// ตรวจสอบ
db.listings.aggregate([
  {
    $lookup: {
      from: "categories",
      localField: "category_id",
      foreignField: "_id",
      as: "category_info"
    }
  },
  {
    $project: { 
      title: 1, 
      "category_info.name": 1 
    }
  },
  {
    $limit: 5 // ย้าย limit เข้ามาไว้ใน Pipeline แบบนี้ครับ
  }
]);