use("used-medical-marketplace-db");

db.reports.drop();

db.createCollection("reports", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["listing_id", "reporter_id", "reason", "status", "created_at"],
      properties: {
        listing_id: { bsonType: "objectId" },
        reporter_id: { bsonType: "objectId" },
        reason: { bsonType: "string" },
        status: {
          bsonType: "string",
          enum: ["pending", "reviewing", "resolved", "rejected"]
        },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.reports.insertMany([

{
  _id:ObjectId("65f500000000000000000001"),
  listing_id:ObjectId("65f200000000000000000002"),
  reporter_id:ObjectId("65f100000000000000000001"),
  reason:"สินค้าไม่ตรงตามคำอธิบาย",
  status:"pending",
  created_at:new Date("2026-07-13T12:00:00Z")
},
{
  _id:ObjectId("65f500000000000000000002"),
  listing_id:ObjectId("65f200000000000000000004"),
  reporter_id:ObjectId("65f100000000000000000003"),
  reason:"รูปภาพไม่ตรงกับสินค้าจริง",
  status:"reviewing",
  created_at:new Date("2026-07-13T12:10:00Z")
},
{
  _id:ObjectId("65f500000000000000000003"),
  listing_id:ObjectId("65f200000000000000000006"),
  reporter_id:ObjectId("65f100000000000000000005"),
  reason:"ราคาหลอกลวง",
  status:"resolved",
  created_at:new Date("2026-07-13T12:20:00Z")
},
{
  _id:ObjectId("65f500000000000000000004"),
  listing_id:ObjectId("65f200000000000000000009"),
  reporter_id:ObjectId("65f100000000000000000007"),
  reason:"สินค้าชำรุดแต่ไม่ได้แจ้ง",
  status:"pending",
  created_at:new Date("2026-07-13T12:30:00Z")
},
{
  _id:ObjectId("65f500000000000000000005"),
  listing_id:ObjectId("65f200000000000000000011"),
  reporter_id:ObjectId("65f100000000000000000009"),
  reason:"ข้อมูลสินค้าไม่ครบ",
  status:"reviewing",
  created_at:new Date("2026-07-13T12:40:00Z")
},
{
  _id:ObjectId("65f500000000000000000006"),
  listing_id:ObjectId("65f200000000000000000014"),
  reporter_id:ObjectId("65f100000000000000000010"),
  reason:"ลงประกาศซ้ำ",
  status:"resolved",
  created_at:new Date("2026-07-13T12:50:00Z")
},
{
  _id:ObjectId("65f500000000000000000007"),
  listing_id:ObjectId("65f200000000000000000018"),
  reporter_id:ObjectId("65f100000000000000000012"),
  reason:"สงสัยว่าเป็นสินค้าปลอม",
  status:"reviewing",
  created_at:new Date("2026-07-13T13:00:00Z")
},
{
  _id:ObjectId("65f500000000000000000008"),
  listing_id:ObjectId("65f200000000000000000020"),
  reporter_id:ObjectId("65f100000000000000000014"),
  reason:"ติดต่อผู้ขายไม่ได้",
  status:"rejected",
  created_at:new Date("2026-07-13T13:10:00Z")
},
{
  _id:ObjectId("65f500000000000000000009"),
  listing_id:ObjectId("65f200000000000000000023"),
  reporter_id:ObjectId("65f100000000000000000016"),
  reason:"ข้อมูลคลาดเคลื่อน",
  status:"pending",
  created_at:new Date("2026-07-13T13:20:00Z")
},
{
  _id:ObjectId("65f500000000000000000010"),
  listing_id:ObjectId("65f200000000000000000026"),
  reporter_id:ObjectId("65f100000000000000000018"),
  reason:"ขายสินค้าเสียหาย",
  status:"resolved",
  created_at:new Date("2026-07-13T13:30:00Z")
},
{
  _id:ObjectId("65f500000000000000000011"),
  listing_id:ObjectId("65f200000000000000000029"),
  reporter_id:ObjectId("65f100000000000000000020"),
  reason:"รูปภาพนำมาจากอินเทอร์เน็ต",
  status:"reviewing",
  created_at:new Date("2026-07-13T13:40:00Z")
},
{
  _id:ObjectId("65f500000000000000000012"),
  listing_id:ObjectId("65f200000000000000000032"),
  reporter_id:ObjectId("65f100000000000000000002"),
  reason:"ข้อมูลเท็จ",
  status:"pending",
  created_at:new Date("2026-07-13T13:50:00Z")
},
{
  _id:ObjectId("65f500000000000000000013"),
  listing_id:ObjectId("65f200000000000000000035"),
  reporter_id:ObjectId("65f100000000000000000004"),
  reason:"ผู้ขายตอบไม่ตรงคำถาม",
  status:"rejected",
  created_at:new Date("2026-07-13T14:00:00Z")
},
{
  _id:ObjectId("65f500000000000000000014"),
  listing_id:ObjectId("65f200000000000000000037"),
  reporter_id:ObjectId("65f100000000000000000006"),
  reason:"สินค้าหมดอายุ",
  status:"resolved",
  created_at:new Date("2026-07-13T14:10:00Z")
},
{
  _id:ObjectId("65f500000000000000000015"),
  listing_id:ObjectId("65f200000000000000000040"),
  reporter_id:ObjectId("65f100000000000000000008"),
  reason:"ต้องสงสัยว่าเป็นบัญชีปลอม",
  status:"pending",
  created_at:new Date("2026-07-13T14:20:00Z")
}

]);

db.reports.find({});