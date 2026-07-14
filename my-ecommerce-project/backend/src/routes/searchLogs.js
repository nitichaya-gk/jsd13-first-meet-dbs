const router = require("express").Router();
const SearchLog = require("../models/SearchLog");

router.get("/", async (req, res) => {
  try {
    const logs = await SearchLog.find()
      .populate("user_id", "name")
      .sort({ searched_at: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/top-keywords", async (req, res) => {
  try {
    const result = await SearchLog.aggregate([
      { $group: { _id: "$keyword", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const log = await SearchLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
