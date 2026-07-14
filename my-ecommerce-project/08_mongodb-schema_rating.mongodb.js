use("used-medical-marketplace-db");

db.ratings.drop();

db.createCollection("ratings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "listing_id",
        "rater_id",
        "rated_user_id",
        "score",
        "created_at"
      ],
      properties: {
        listing_id: { bsonType: "objectId" },
        rater_id: { bsonType: "objectId" },
        rated_user_id: { bsonType: "objectId" },
        score: {
          bsonType: "number",
          minimum: 1,
          maximum: 5
        },
        comment: { bsonType: "string" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.ratings.insertMany([

{
_id:ObjectId("65f400000000000000000001"),
listing_id:ObjectId("65f200000000000000000001"),
rater_id:ObjectId("65f100000000000000000002"),
rated_user_id:ObjectId("65f100000000000000000001"),
score:5,
comment:"สินค้าตรงตามที่ประกาศ ส่งไว",
created_at:new Date("2026-07-13T11:00:00Z")
},
{
_id:ObjectId("65f400000000000000000002"),
listing_id:ObjectId("65f200000000000000000002"),
rater_id:ObjectId("65f100000000000000000003"),
rated_user_id:ObjectId("65f100000000000000000001"),
score:4,
comment:"ตอบแชทเร็ว สินค้าสภาพดี",
created_at:new Date("2026-07-13T11:10:00Z")
},
{
_id:ObjectId("65f400000000000000000003"),
listing_id:ObjectId("65f200000000000000000003"),
rater_id:ObjectId("65f100000000000000000005"),
rated_user_id:ObjectId("65f100000000000000000002"),
score:5,
comment:"แนะนำผู้ขายครับ",
created_at:new Date("2026-07-13T11:20:00Z")
},
{
_id:ObjectId("65f400000000000000000004"),
listing_id:ObjectId("65f200000000000000000004"),
rater_id:ObjectId("65f100000000000000000007"),
rated_user_id:ObjectId("65f100000000000000000002"),
score:4,
comment:"ใช้งานได้จริง",
created_at:new Date("2026-07-13T11:30:00Z")
},
{
_id:ObjectId("65f400000000000000000005"),
listing_id:ObjectId("65f200000000000000000006"),
rater_id:ObjectId("65f100000000000000000001"),
rated_user_id:ObjectId("65f100000000000000000003"),
score:5,
comment:"คุยง่าย ส่งของตามเวลา",
created_at:new Date("2026-07-13T11:40:00Z")
},
{
_id:ObjectId("65f400000000000000000006"),
listing_id:ObjectId("65f200000000000000000007"),
rater_id:ObjectId("65f100000000000000000009"),
rated_user_id:ObjectId("65f100000000000000000004"),
score:4,
comment:"บริการดี",
created_at:new Date("2026-07-13T11:50:00Z")
},
{
_id:ObjectId("65f400000000000000000007"),
listing_id:ObjectId("65f200000000000000000009"),
rater_id:ObjectId("65f100000000000000000010"),
rated_user_id:ObjectId("65f100000000000000000005"),
score:5,
comment:"ของตรงปก",
created_at:new Date("2026-07-13T12:00:00Z")
},
{
_id:ObjectId("65f400000000000000000008"),
listing_id:ObjectId("65f200000000000000000011"),
rater_id:ObjectId("65f100000000000000000012"),
rated_user_id:ObjectId("65f100000000000000000006"),
score:5,
comment:"สภาพดีมาก",
created_at:new Date("2026-07-13T12:10:00Z")
},
{
_id:ObjectId("65f400000000000000000009"),
listing_id:ObjectId("65f200000000000000000012"),
rater_id:ObjectId("65f100000000000000000013"),
rated_user_id:ObjectId("65f100000000000000000006"),
score:4,
comment:"แพ็กของดี",
created_at:new Date("2026-07-13T12:20:00Z")
},
{
_id:ObjectId("65f400000000000000000010"),
listing_id:ObjectId("65f200000000000000000013"),
rater_id:ObjectId("65f100000000000000000014"),
rated_user_id:ObjectId("65f100000000000000000007"),
score:3,
comment:"สินค้าตามราคา",
created_at:new Date("2026-07-13T12:30:00Z")
},
{
_id:ObjectId("65f400000000000000000011"),
listing_id:ObjectId("65f200000000000000000015"),
rater_id:ObjectId("65f100000000000000000016"),
rated_user_id:ObjectId("65f100000000000000000008"),
score:5,
comment:"ประทับใจมาก",
created_at:new Date("2026-07-13T12:40:00Z")
},
{
_id:ObjectId("65f400000000000000000012"),
listing_id:ObjectId("65f200000000000000000016"),
rater_id:ObjectId("65f100000000000000000017"),
rated_user_id:ObjectId("65f100000000000000000008"),
score:4,
comment:"ส่งเร็ว",
created_at:new Date("2026-07-13T12:50:00Z")
},
{
_id:ObjectId("65f400000000000000000013"),
listing_id:ObjectId("65f200000000000000000017"),
rater_id:ObjectId("65f100000000000000000018"),
rated_user_id:ObjectId("65f100000000000000000009"),
score:5,
comment:"ผู้ขายสุภาพ",
created_at:new Date("2026-07-13T13:00:00Z")
},
{
_id:ObjectId("65f400000000000000000014"),
listing_id:ObjectId("65f200000000000000000018"),
rater_id:ObjectId("65f100000000000000000019"),
rated_user_id:ObjectId("65f100000000000000000009"),
score:4,
comment:"คุ้มราคา",
created_at:new Date("2026-07-13T13:10:00Z")
},
{
_id:ObjectId("65f400000000000000000015"),
listing_id:ObjectId("65f200000000000000000019"),
rater_id:ObjectId("65f100000000000000000020"),
rated_user_id:ObjectId("65f100000000000000000010"),
score:5,
comment:"ยอดเยี่ยม",
created_at:new Date("2026-07-13T13:20:00Z")
},
{
_id:ObjectId("65f400000000000000000016"),
listing_id:ObjectId("65f200000000000000000020"),
rater_id:ObjectId("65f100000000000000000001"),
rated_user_id:ObjectId("65f100000000000000000010"),
score:4,
comment:"แนะนำครับ",
created_at:new Date("2026-07-13T13:30:00Z")
},
{
_id:ObjectId("65f400000000000000000017"),
listing_id:ObjectId("65f200000000000000000021"),
rater_id:ObjectId("65f100000000000000000004"),
rated_user_id:ObjectId("65f100000000000000000011"),
score:5,
comment:"ได้รับของแล้ว",
created_at:new Date("2026-07-13T13:40:00Z")
},
{
_id:ObjectId("65f400000000000000000018"),
listing_id:ObjectId("65f200000000000000000022"),
rater_id:ObjectId("65f100000000000000000006"),
rated_user_id:ObjectId("65f100000000000000000011"),
score:4,
comment:"ตรงตามรูป",
created_at:new Date("2026-07-13T13:50:00Z")
},
{
_id:ObjectId("65f400000000000000000019"),
listing_id:ObjectId("65f200000000000000000023"),
rater_id:ObjectId("65f100000000000000000008"),
rated_user_id:ObjectId("65f100000000000000000012"),
score:5,
comment:"แนะนำผู้ขาย",
created_at:new Date("2026-07-13T14:00:00Z")
},
{
_id:ObjectId("65f400000000000000000020"),
listing_id:ObjectId("65f200000000000000000024"),
rater_id:ObjectId("65f100000000000000000015"),
rated_user_id:ObjectId("65f100000000000000000012"),
score:4,
comment:"ตอบไวมาก",
created_at:new Date("2026-07-13T14:10:00Z")
},
{
_id:ObjectId("65f400000000000000000021"),
listing_id:ObjectId("65f200000000000000000026"),
rater_id:ObjectId("65f100000000000000000002"),
rated_user_id:ObjectId("65f100000000000000000013"),
score:5,
comment:"ซื้อครั้งที่สองแล้ว",
created_at:new Date("2026-07-13T14:20:00Z")
},
{
_id:ObjectId("65f400000000000000000022"),
listing_id:ObjectId("65f200000000000000000027"),
rater_id:ObjectId("65f100000000000000000003"),
rated_user_id:ObjectId("65f100000000000000000014"),
score:5,
comment:"บริการดีมาก",
created_at:new Date("2026-07-13T14:30:00Z")
},
{
_id:ObjectId("65f400000000000000000023"),
listing_id:ObjectId("65f200000000000000000030"),
rater_id:ObjectId("65f100000000000000000007"),
rated_user_id:ObjectId("65f100000000000000000015"),
score:4,
comment:"สินค้าคุณภาพดี",
created_at:new Date("2026-07-13T14:40:00Z")
},
{
_id:ObjectId("65f400000000000000000024"),
listing_id:ObjectId("65f200000000000000000035"),
rater_id:ObjectId("65f100000000000000000013"),
rated_user_id:ObjectId("65f100000000000000000018"),
score:5,
comment:"พ่อค้าใจดี",
created_at:new Date("2026-07-13T14:50:00Z")
},
{
_id:ObjectId("65f400000000000000000025"),
listing_id:ObjectId("65f200000000000000000039"),
rater_id:ObjectId("65f100000000000000000016"),
rated_user_id:ObjectId("65f100000000000000000020"),
score:5,
comment:"ประทับใจในการบริการ",
created_at:new Date("2026-07-13T15:00:00Z")
}

]);

db.ratings.find({});