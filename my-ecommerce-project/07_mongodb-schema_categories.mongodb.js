use("used-medical-marketplace-db");

db.categories.drop();

db.createCollection("categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "icon"],
      properties: {
        name: {
          bsonType: "string"
        },
        icon: {
          bsonType: "string"
        }
      }
    }
  }
});

db.categories.insertMany([
  {
    _id: ObjectId("65f700000000000000000001"),
    name: "Hospital Bed",
    icon: "bed"
  },
  {
    _id: ObjectId("65f700000000000000000002"),
    name: "Wheelchair",
    icon: "wheelchair"
  },
  {
    _id: ObjectId("65f700000000000000000003"),
    name: "Walking Aid",
    icon: "person-walking"
  },
  {
    _id: ObjectId("65f700000000000000000004"),
    name: "Respiratory",
    icon: "lungs"
  },
  {
    _id: ObjectId("65f700000000000000000005"),
    name: "Medical Monitor",
    icon: "heart-pulse"
  },
  {
    _id: ObjectId("65f700000000000000000006"),
    name: "Bathroom Equipment",
    icon: "bath"
  },
  {
    _id: ObjectId("65f700000000000000000007"),
    name: "Patient Lift",
    icon: "arrow-up"
  },
  {
    _id: ObjectId("65f700000000000000000008"),
    name: "Others",
    icon: "box"
  }
]);

db.categories.find();