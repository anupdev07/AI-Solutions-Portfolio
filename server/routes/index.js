const express = require("express");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

module.exports = router;
