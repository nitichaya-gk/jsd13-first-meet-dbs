use("used-medical-marketplace-db");

// ล้างข้อมูลเก่า
db.users.drop();

// สร้าง Collection พร้อม Validator
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "phone", "line_user_id", "rating_avg"],
      properties: {
        name: { bsonType: "string", description: "ชื่อผู้ใช้งาน" },
        phone: { bsonType: "string", description: "เบอร์โทรศัพท์" },
        line_user_id: { bsonType: "string", description: "Line ID ของผู้ใช้" },
        // แก้จาก "double" เป็น "number" เพื่อแก้ปัญหา Document failed validation
        rating_avg: { bsonType: "number", description: "คะแนนเฉลี่ย" } 
      }
    }
  }
});

// ใส่ข้อมูลจำลอง (Mock Data)
db.users.insertMany([
  {
    "_id": ObjectId("65f100000000000000000001"),
    "name": "สมชาย ใจดี",
    "phone": "081-111-1111",
    "line_user_id": "somchai_123",
    "rating_avg": 4.5
  },
  {
    "_id": ObjectId("65f100000000000000000002"),
    "name": "วิภา รักษา",
    "phone": "089-222-2222",
    "line_user_id": "wipha_rx",
    "rating_avg": 5.0
  }
]);

// แสดงผล
db.users.find({});