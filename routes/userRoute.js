const {
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const { verifyTokenAndAdmin } = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/create", verifyTokenAndAdmin, createUser);
router.put("/update", verifyTokenAndAdmin, updateUser);
router.delete("/delete", verifyTokenAndAdmin, deleteUser);
router.get("/find", verifyTokenAndAdmin, getUserById);
router.get("/get", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
