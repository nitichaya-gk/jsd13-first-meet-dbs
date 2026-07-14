const router = require("express").Router();
const Rating = require("../models/Rating");

router.get("/", async (req, res) => {
  try {
    const { listing_id, rated_user_id } = req.query;
    const filter = {};
    if (listing_id) filter.listing_id = listing_id;
    if (rated_user_id) filter.rated_user_id = rated_user_id;

    const ratings = await Rating.find(filter)
      .populate("rater_id", "name")
      .populate("rated_user_id", "name")
      .populate("listing_id", "title")
      .sort({ created_at: -1 });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const rating = await Rating.create(req.body);
    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
