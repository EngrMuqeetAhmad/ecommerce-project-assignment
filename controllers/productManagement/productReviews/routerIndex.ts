import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { addProductReviewRating } from "./addProductReviewRating";
import { getProductReviewRating } from "./getProductReviewRating";
import { getAllProductReviewRating } from "./getAllProductReviewRating";
import { updateProductReviewRating } from "./updateProductReviewRating";
import { deleteProductReviewRating } from "./deleteProductReviewRating";

var router = express.Router();

router.put(
  "/addProductReviewRating",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductReviewRating(req, res);
  }
);

router.get(
  "/getProductReviewRating",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductReviewRating(req, res);
  }
);
router.get(
  "/getAllProductReviewRatings",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductReviewRating(req, res);
  }
);

router.post(
  "/updateProductReviewRating",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductReviewRating(req, res);
  }
);

router.post(
  "/deleteProductReviewRating",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductReviewRating(req, res);
  }
);

module.exports = router;
