const router = require("express").Router();
const User = require("../models/User");
const Listing = require("../models/Listing");
const Category = require("../models/Category");
const Rating = require("../models/Rating");
const Report = require("../models/Report");
const SearchLog = require("../models/SearchLog");

router.get("/", async (req, res) => {
  try {
    const [totalUsers, totalListings, activeListings, totalCategories, totalRatings, totalReports] =
      await Promise.all([
        User.countDocuments(),
        Listing.countDocuments(),
        Listing.countDocuments({ status: "active" }),
        Category.countDocuments(),
        Rating.countDocuments(),
        Report.countDocuments(),
      ]);

    const listingsByCategory = await Listing.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: "$category_id", count: { $sum: 1 } } },
      { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
      { $unwind: "$category" },
      { $project: { name: "$category.name", count: 1 } },
      { $sort: { count: -1 } },
    ]);

    const listingsByStatus = await Listing.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const avgPriceByCategory = await Listing.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: "$category_id", avgPrice: { $avg: "$price" } } },
      { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
      { $unwind: "$category" },
      { $project: { name: "$category.name", avgPrice: { $round: ["$avgPrice", 0] } } },
      { $sort: { avgPrice: -1 } },
    ]);

    res.json({
      totalUsers,
      totalListings,
      activeListings,
      totalCategories,
      totalRatings,
      totalReports,
      listingsByCategory,
      listingsByStatus,
      avgPriceByCategory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
