const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

//All Users
router.route("/").get(getAllUsers).post(createUser);

//Single Users
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
