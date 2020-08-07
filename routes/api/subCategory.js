const express = require("express");
const router = express.Router();
const config = require("config");
const db = config.get("mongoURI");
const auth = require("../../middleware/auth");
const SubCategory = require("../../models/SubCategory");
const { check, validationResult } = require("express-validator");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/subCategory
// @desc     Create SubCategory
// @access   Private
router.post(
  "/",
  [
    check("category", "Category is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, image, status, category } = req.body;
    const SubCategoryFields = new SubCategory({
      name,
      description,
      image,
      status,
      category,
    });

    try {
      await SubCategoryFields.save();
      res.json(SubCategoryFields);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route    GET api/subCategories/:category_id
// @desc     Get Sub categories by category_id
// @access   Public
router.get("/:category_id", async ({ params: { category_id } }, res) => {
  try {
    const subCategories = await SubCategory.aggregate([
      // { $match: { category: ObjectID(category_id) } },
      // { $group: { _id: {"$category"}, books: { $push: "$_id" ,} } }
      // {
      //   $lookup: {
      //     from: "categories",
      //     localField: "category",
      //     foreignField: "_id",
      //     as: "subCategorydetails",
      //   },
      // },

      {
        $lookup: {
          from: "categories",
          let: { category: "$category" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$category"] } } }],
          as: "categories",
        },
      },

      // {
      //   $group: {
      //     _id: "$subCategories.category",
      //     Categories: { $push: "$$ROOT" },
      //   },
      // },

      // {
      //   $unwind: "$subCategorydetails",
      // },
      {
        $project: {
          name: 1,
          image: 1,
          description: 1,
          status: 1,
          category: 1,
          subCategories: 1,
        },
      },
    ]);

    // if (!subCategories) return res.status(400).json({ msg: "Sub  not found" });
    return res.json(subCategories);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
