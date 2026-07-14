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
        name: {
          bsonType: "string",
          description: "ชื่อผู้ใช้งาน"
        },
        phone: {
          bsonType: "string",
          description: "เบอร์โทรศัพท์"
        },
        line_user_id: {
          bsonType: "string",
          description: "Line User ID"
        },
        rating_avg: {
          bsonType: "number",
          description: "คะแนนเฉลี่ย"
        }
      }
    }
  }
});

// Mock Data 20 Users
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
  },
  {
    "_id": ObjectId("65f100000000000000000003"),
    "name": "อนันต์ สุขใจ",
    "phone": "082-333-3333",
    "line_user_id": "anan_s",
    "rating_avg": 4.2
  },
  {
    "_id": ObjectId("65f100000000000000000004"),
    "name": "ศิริพร พรหม",
    "phone": "083-444-4444",
    "line_user_id": "siriporn88",
    "rating_avg": 4.8
  },
  {
    "_id": ObjectId("65f100000000000000000005"),
    "name": "ณัฐวุฒิ คงดี",
    "phone": "084-555-5555",
    "line_user_id": "nut_good",
    "rating_avg": 3.9
  },
  {
    "_id": ObjectId("65f100000000000000000006"),
    "name": "กมลชนก ศรีสุข",
    "phone": "085-666-6666",
    "line_user_id": "kamonchanok",
    "rating_avg": 4.7
  },
  {
    "_id": ObjectId("65f100000000000000000007"),
    "name": "ธนกร บุญมา",
    "phone": "086-777-7777",
    "line_user_id": "thanakorn99",
    "rating_avg": 4.0
  },
  {
    "_id": ObjectId("65f100000000000000000008"),
    "name": "ปรียา แก้วตา",
    "phone": "087-888-8888",
    "line_user_id": "preeya_k",
    "rating_avg": 4.6
  },
  {
    "_id": ObjectId("65f100000000000000000009"),
    "name": "จักริน มั่นคง",
    "phone": "088-999-9999",
    "line_user_id": "jakrin_m",
    "rating_avg": 3.8
  },
  {
    "_id": ObjectId("65f100000000000000000010"),
    "name": "สุพัตรา งามดี",
    "phone": "081-101-1010",
    "line_user_id": "supattra",
    "rating_avg": 4.9
  },
  {
    "_id": ObjectId("65f100000000000000000011"),
    "name": "วีรชัย ทองสุข",
    "phone": "082-202-2020",
    "line_user_id": "weerachai",
    "rating_avg": 4.3
  },
  {
    "_id": ObjectId("65f100000000000000000012"),
    "name": "ชลธิชา ศรีทอง",
    "phone": "083-303-3030",
    "line_user_id": "cholthicha",
    "rating_avg": 4.1
  },
  {
    "_id": ObjectId("65f100000000000000000013"),
    "name": "พงศ์ศักดิ์ นำชัย",
    "phone": "084-404-4040",
    "line_user_id": "pongsak",
    "rating_avg": 3.7
  },
  {
    "_id": ObjectId("65f100000000000000000014"),
    "name": "อรทัย บุญส่ง",
    "phone": "085-505-5050",
    "line_user_id": "ornthai",
    "rating_avg": 4.4
  },
  {
    "_id": ObjectId("65f100000000000000000015"),
    "name": "กิตติพงษ์ พรชัย",
    "phone": "086-606-6060",
    "line_user_id": "kittipong",
    "rating_avg": 4.8
  },
  {
    "_id": ObjectId("65f100000000000000000016"),
    "name": "จิราพร แสงทอง",
    "phone": "087-707-7070",
    "line_user_id": "jiraporn",
    "rating_avg": 4.5
  },
  {
    "_id": ObjectId("65f100000000000000000017"),
    "name": "ภาณุวัฒน์ ศิริ",
    "phone": "088-808-8080",
    "line_user_id": "phanuwat",
    "rating_avg": 3.6
  },
  {
    "_id": ObjectId("65f100000000000000000018"),
    "name": "ลลิตา วงศ์ดี",
    "phone": "089-909-9090",
    "line_user_id": "lalita_w",
    "rating_avg": 4.9
  },
  {
    "_id": ObjectId("65f100000000000000000019"),
    "name": "เอกชัย มีสุข",
    "phone": "081-212-1212",
    "line_user_id": "ekachai",
    "rating_avg": 4.2
  },
  {
    "_id": ObjectId("65f100000000000000000020"),
    "name": "สุธิดา จันทร์ดี",
    "phone": "082-313-1313",
    "line_user_id": "suthida",
    "rating_avg": 5.0
  }
]);

// แสดงผล
db.users.find({});