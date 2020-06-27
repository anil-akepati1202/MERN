const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Category = require("../../models/Category");
const { check, validationResult } = require("express-validator");

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Category:::" + req.body);
  const { name, description, image, status } = req.body;

  const categoryFields = new Category({
    name,
    description,
    image,
    status,
  });

  try {
    await categoryFields.save();
    res.json(categoryFields);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
