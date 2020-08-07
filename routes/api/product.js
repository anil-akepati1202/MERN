const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const { check, validationResult } = require("express-validator");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/product
// @desc     Create product
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      description,
      image,
      category,
      price,
      discount,
      status,
    } = req.body;

    const productFields = new Product({
      name,
      description,
      image,
      category,
      price,
      discount,
      status,
    });

    try {
      await productFields.save();
      res.json(productFields);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:category_id", async ({ params: { category_id } }, res) => {
  try {
    let query = [{ $match: { category: ObjectID(category_id) } }];
    const products = await Product.aggregate(query);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
