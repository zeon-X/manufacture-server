const User = require("../models/userSchema");

//CREATE
const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateUser = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an User _id" });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.query._id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteUser = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an User _id" });
  try {
    await User.findByIdAndDelete(req.query._id);
    res.status(200).json({ msg: "User has been deleted.." });
  } catch (err) {
    res.status(500).json(err);
  }
};

//User All
const getAllUsers = async (req, res) => {
  const qpage = req.query.page || 0;
  const qlimit = req.query.limit || 30;
  try {
    let Users;

    Users = await User.find()
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);

    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get User
const getUserById = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an User _id" });
  try {
    let User = await User.findById(req.query._id);
    res.status(200).json(User);
  } catch (err) {
    res.status(500).json(err);
  }
};

//User STATS
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await User.aggregate([
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
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserStats,
};
