const {
  createReview,
  updateReview,
  deleteReview,
  getReviewStats,
  getAllReviews,
  getReviewById,
} = require("../controllers/reviewController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/create", verifyToken, createReview);
router.put("/update", verifyTokenAndAuthorization, updateReview);
router.delete("/delete", verifyTokenAndAuthorization, deleteReview);
router.get("/find", getReviewById);
router.get("/get", getAllReviews);
router.get("/stats", verifyTokenAndAdmin, getReviewStats);

module.exports = router;
