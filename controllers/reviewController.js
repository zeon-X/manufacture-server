const Review = require("../models/reviewSchema");

//CREATE
const createReview = async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateReview = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an Review _id" });
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.query._id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteReview = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an Review _id" });
  try {
    await Review.findByIdAndDelete(req.query._id);
    res.status(200).json({ msg: "Review has been deleted.." });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Review All
const getAllReviews = async (req, res) => {
  const qpage = req.query.page || 0;
  const qlimit = req.query.limit || 30;
  try {
    let Reviews;

    Reviews = await Review.find()
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);

    res.status(200).json(Reviews);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get Review
const getReviewById = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an Review _id" });
  try {
    let Review = await Review.findById(req.query._id);
    res.status(200).json(Review);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Review STATS
const getReviewStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Review.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  getReviewStats,
};
