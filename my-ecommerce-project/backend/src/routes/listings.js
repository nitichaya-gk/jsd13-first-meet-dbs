const router = require("express").Router();
const Listing = require("../models/Listing");

router.get("/", async (req, res) => {
  try {
    const { category, status, min_price, max_price, search, sort, limit = 25 } = req.query;
    const filter = {};

    if (category) filter.category_id = category;
    if (status) filter.status = status;
    else filter.status = "active";
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = Number(min_price);
      if (max_price) filter.price.$lte = Number(max_price);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let query = Listing.find(filter)
      .populate("seller_id", "name rating_avg")
      .populate("category_id", "name icon");

    if (sort) {
      const sortObj = {};
      const [field, order] = sort.split(":");
      sortObj[field] = order === "desc" ? -1 : 1;
      query = query.sort(sortObj);
    } else {
      query = query.sort({ created_at: -1 });
    }

    const listings = await query.limit(Number(limit));
    const total = await Listing.countDocuments(filter);

    res.json({ listings, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("seller_id", "name phone rating_avg")
      .populate("category_id", "name icon");
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
