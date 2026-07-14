use("used-medical-marketplace-db");

db.search_logs.drop();

// 1. สร้าง Collection พร้อม Validator
db.createCollection("search_logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "keyword", "searched_at"],
      properties: {
        user_id: { bsonType: "objectId", description: "FK -> users._id" },
        keyword: { bsonType: "string" },
        searched_at: { bsonType: "date" }
      }
    }
  }
});

// 2. สร้าง Index
db.search_logs.createIndex({ user_id: 1, searched_at: -1 }); 
db.search_logs.createIndex({ keyword: 1 });
db.search_logs.createIndex({ searched_at: -1 });

// 3. Mock Data
db.search_logs.insertMany([
  {
    _id: ObjectId("65f800000000000000000001"),
    user_id: ObjectId("65f100000000000000000001"),
    keyword: "wheelchair",
    searched_at: new Date("2026-07-12T09:00:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000002"),
    user_id: ObjectId("65f100000000000000000002"),
    keyword: "hospital bed",
    searched_at: new Date("2026-07-12T09:05:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000003"),
    user_id: ObjectId("65f100000000000000000003"),
    keyword: "walker",
    searched_at: new Date("2026-07-12T09:15:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000004"),
    user_id: ObjectId("65f100000000000000000004"),
    keyword: "oxygen concentrator",
    searched_at: new Date("2026-07-12T10:00:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000005"),
    user_id: ObjectId("65f100000000000000000005"),
    keyword: "blood pressure monitor",
    searched_at: new Date("2026-07-12T10:15:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000006"),
    user_id: ObjectId("65f100000000000000000006"),
    keyword: "patient bed",
    searched_at: new Date("2026-07-12T10:20:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000007"),
    user_id: ObjectId("65f100000000000000000007"),
    keyword: "wheelchair",
    searched_at: new Date("2026-07-12T11:00:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000008"),
    user_id: ObjectId("65f100000000000000000008"),
    keyword: "walker",
    searched_at: new Date("2026-07-12T11:10:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000009"),
    user_id: ObjectId("65f100000000000000000009"),
    keyword: "suction machine",
    searched_at: new Date("2026-07-12T12:00:00Z")
  },
  {
    _id: ObjectId("65f800000000000000000010"),
    user_id: ObjectId("65f100000000000000000010"), // <--- แก้ไขตรงนี้ครับ
    keyword: "oxygen machine",
    searched_at: new Date("2026-07-12T13:00:00Z")
  }
]);

// 4. ทดสอบ Query ดูว่าคำไหนถูกค้นหาบ่อยสุด
db.search_logs.aggregate([
  { $group: { _id: "$keyword", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);