use("used-medical-marketplace-db");

db.conversations.drop();

db.createCollection("conversations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["listing_id", "buyer_id", "seller_id", "created_at"],
      properties: {
        listing_id: { bsonType: "objectId", description: "FK โยงไปหา id ของ listings" },
        buyer_id: { bsonType: "objectId", description: "FK โยงไปหา id ของ users (คนซื้อ)" },
        seller_id: { bsonType: "objectId", description: "FK โยงไปหา id ของ users (คนขาย)" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.conversations.insertMany([
  {
    "_id": ObjectId("65f300000000000000000001"),
    "listing_id": ObjectId("65f200000000000000000001"), // แชทคุยเรื่อง "เตียงผู้ป่วย"
    "buyer_id": ObjectId("65f100000000000000000002"), // วิภาเป็นคนทักไปซื้อ
    "seller_id": ObjectId("65f100000000000000000001"), // สมชายเป็นคนขาย
    "created_at": new Date("2026-07-13T09:00:00Z")
  }
]);

db.conversations.find({});