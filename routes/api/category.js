const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Category = require("../../models/Category");
const { check, validationResult } = require("express-validator");
const SubCategory = require("../../models/SubCategory");

// @route    POST api/category
// @desc     Create category
// @access   Public
router.post(
  "/",
  [
    check("status", "Status is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
  }
);
// @route    GET api/categories
// @desc     Get all categories
// @access   Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ date: -1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/allcategories
// @desc     Get all categories and sub categories
// @access   Public
router.get("/allcategories", async (req, res) => {
  const query = [];
  try {
    let query = [
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "category",
          as: "subCategorydetails",
        },
      },
    ];
    let query1 = [
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategorydetails._id",
          foreignField: "category",
          as: "categorydetails",
        },
      },
    ];

    let quieres = query.concat(query1);
    const categories = await Category.aggregate(quieres);
    categories.forEach((cat) => {
      console.log();
      if (cat.subCategorydetails && cat.categorydetails) {
        cat.subCategorydetails.forEach((child_cat) => {
          child_cat["cat"] = [];
          const result = cat.categorydetails.find(
            (parent_cat) =>
              parent_cat.category.toString() === child_cat._id.toString()
          );
          if (result) {
            child_cat["cat"].push(result);
          }
        });
      }
    });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
