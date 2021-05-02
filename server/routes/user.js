const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "you are on user point",
  });
});

module.exports = router;
