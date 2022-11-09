const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

//User registration
const registerUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

//User login || JWT TOEKN
const loginUser = async (req, res) => {
  //encrypt password to pass here
  const email = req.body.email;
  const userId = req.body.userId;
  try {
    let userInfo = await User.findOne({ email: email });
    //db will return all userdata if there any

    if (userInfo && userInfo.userId === userId) {
      //we are ok to proceed || GENERATE jwt
      const accessToken = jwt.sign(userInfo, process.env.JWT_KEY, {
        expiresIn: "30d",
      });

      res.status(200).json({ authorization: accessToken, user: userInfo });
    } else {
      res.status(500).json({ msg: "wrong credentials user not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err, msg: "user information not found" });
  }
};

// update
const updateUser = async (req, res) => {
  const _id = req.query._id;

  if (!_id) res.status(400).json({ msg: "_id not provided" });

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
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

//delete
const deleteUser = async (req, res) => {
  const _id = req.query._id;
  if (!_id) res.status(400).json({ msg: "_id not provided" });
  try {
    await User.findByIdAndDelete(_id);
    res.status(200).json({ msg: "user deleted.." });
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

//get
const getUser = async (req, res) => {
  const qemail = req.query.email || "";
  const _id = req.query._id;

  const qpage = parseInt(req.query.page) || 0;
  const qlimit = parseInt(req.query.limit) || 30;
  try {
    let fetchedData;

    if (_id) {
      fetchedData = await User.findById(_id);
    } else if (qemail) {
      fetchedData = await User.find({ email: qemail });
    } else {
      fetchedData = await User.find({})
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }

    // console.log(fetchedData);
    res.status(200).json(fetchedData);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getUser };
