use("sample_mflix");

db.theaters.countDocuments({ "location.address.state": "AL" });

db.theaters.countDocuments({ "location.address.city": "La Quinta" });

