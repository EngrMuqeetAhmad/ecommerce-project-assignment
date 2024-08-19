import express from "express";

var baseProductRouter = require("../controllers/productManagement/baseProduct/routerIndex");
var productVariationNameRouter = require("../controllers/productManagement/variation-Name-Value/Name/indexRouter");
var productVariationValueRouter = require("../controllers/productManagement/variation-Name-Value/Value/indexRouter");

const router = express.Router();

///  variation type and variation option

///////
router.use("/", productVariationValueRouter);

router.use("/", productVariationNameRouter);
///  base product
router.use("/", baseProductRouter);

module.exports = router;
