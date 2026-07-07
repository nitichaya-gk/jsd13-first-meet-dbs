
use("chrome-burger-db");

db.orders.deleteMany({});

db.orders.insertMany([
  {
    "_id": ObjectId("65f400000000000000000001"),
    "order_date": new Date("2024-03-13T10:00:00Z"),
    "total_price": 20.98,
    "staff_id": ObjectId("65f100000000000000000001"), // Jane Doe
    "items": [
      {
        "menu_item_id": ObjectId("65f300000000000000000001"),
        "name": "Classic Burger",
        "price": 9.99,
        "quantity": 1
      },
      {
        "menu_item_id": ObjectId("65f300000000000000000002"),
        "name": "Cheeseburger",
        "price": 10.99,
        "quantity": 1
      }
    ]
  },
  {
    "_id": ObjectId("65f400000000000000000002"),
    "order_date": new Date("2024-03-13T11:30:00Z"),
    "total_price": 19.98,
    "staff_id": ObjectId("65f100000000000000000003"), // Emily Jones
    "items": [
      {
        "menu_item_id": ObjectId("65f300000000000000000001"),
        "name": "Classic Burger",
        "price": 9.99,
        "quantity": 2
      }
    ]
  }
]);

db.orders.aggregate([
  {
    $lookup: {
      from: "staff",
      localField: "staff_id",
      foreignField: "_id",
      as: "staff_info"
    }
  },
  {
    $unwind: "$staff_info"
  }
]);
