const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route    POST api/order
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      // check("user_id", "User id is required").not().isEmpty(),
      check("paymentType", "Payment Type is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      user_id,
      order_id,
      paymentType,
      paymentStatus,
      orderStatus,
      totalPrice,
      products: [{ name, price, category, description, image, _id, qty }],
    } = req.body;
    const productfields = [
      { name, price, category, description, image, _id, qty },
    ];

    productfields.map((product) => {
      name, price, category, description, qty, image, _id;
    });

    const orderFields = new Order({
      user_id: req.user._id,
      order_id,
      paymentStatus,
      paymentType,
      orderStatus,
      totalPrice,
      products: productfields,
    });

    // Build social object and add to profileFields

    // for (const [key, value] of Object.entries(productfields)) {
    //   if (value && value.length > 0) productfields[key] = productfields[value];
    // }
    console.log("orderFields:", JSON.stringify(orderFields));

    try {
      // Using upsert option (creates new doc if no match is found):
      await orderFields.save();
      res.json(orderFields);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
