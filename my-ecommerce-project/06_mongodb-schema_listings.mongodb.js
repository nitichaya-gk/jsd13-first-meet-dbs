use("used-medical-marketplace-db");

db.listings.drop();

db.createCollection("listings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["seller_id", "title", "description", "price", "condition", "category", "status", "created_at"],
      properties: {
        seller_id: { bsonType: "objectId", description: "FK โยงไปหา id ของ users" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        // แก้จาก "double" เป็น "number" เพื่อแก้ปัญหา Document failed validation
        price: { bsonType: "number" }, 
        condition: { bsonType: "string" },
        category: { bsonType: "string" },
        status: { bsonType: "string" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.listings.insertMany([
  {
    "_id": ObjectId("65f200000000000000000001"),
    "seller_id": ObjectId("65f100000000000000000001"), // โยงไปหาสมชาย
    "title": "เตียงผู้ป่วยมือสอง",
    "description": "สภาพดี ใช้งานน้อย",
    "price": 5000,
    "condition": "used_good",
    "category": "bed",
    "status": "active",
    "created_at": new Date("2026-07-10T08:00:00Z")
  },
  {
    "_id": ObjectId("65f200000000000000000002"),
    "seller_id": ObjectId("65f100000000000000000002"), // โยงไปหาวิภา
    "title": "วีลแชร์พับได้",
    "description": "น้ำหนักเบา พกพาสะดวก",
    "price": 2500,
    "condition": "used_like_new",
    "category": "wheelchair",
    "status": "active",
    "created_at": new Date("2026-07-12T10:30:00Z")
  }
]);

// แสดงผล
db.listings.find({});





//06 error เพราะ ประเภทของ price ไม่ตรงกับ validator >> MongoDB รู้จักแต่ "int", "double", "long"