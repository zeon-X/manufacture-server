const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/authController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", verifyTokenAndAuthorization, updateUser);
router.delete("/delete", verifyTokenAndAdmin, deleteUser);
router.get("/get", verifyTokenAndAuthorization, getUser);

module.exports = router;
