use("chrome-burger-db");

//clear existing data
db.menu_items.deleteMany({});

db.menu_items.insertMany([
  {
    "_id": ObjectId("65f300000000000000000001"),
    "name": "Classic Burger",
    "description": "Juicy beef patty with lettuce and tomato",
    "price": 9.99,
    "category": "Burgers",
    "recipe": [
      {
        "ingredient_id": ObjectId("65f200000000000000000001"), // Beef Patty
        "quantity_needed": 1
      },
      {
        "ingredient_id": ObjectId("65f200000000000000000002"), // Brioche Bun
        "quantity_needed": 1
      },
      {
        "ingredient_id": ObjectId("65f200000000000000000003"), // Lettuce
        "quantity_needed": 0.1
      }
    ]
  },
  {
    "_id": ObjectId("65f300000000000000000002"),
    "name": "Cheeseburger",
    "description": "Classic burger with a slice of melted cheese",
    "price": 10.99,
    "category": "Burgers",
    "recipe": [
      {
        "ingredient_id": ObjectId("65f200000000000000000001"), // Beef Patty
        "quantity_needed": 1
      },
      {
        "ingredient_id": ObjectId("65f200000000000000000002"), // Brioche Bun
        "quantity_needed": 1
      }
    ]
  }
]);

db.orders.aggregate([
  {
    $lookup: {
      from: "menu_items",
      localField: "menu_item_id",
      foreignField: "_id",
      as: "menu_item_info"
    }
  },
  {
    $unwind: "$menu_item_info"
  }
]);
