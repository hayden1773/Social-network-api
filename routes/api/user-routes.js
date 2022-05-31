// REQURIED
const router = require('express').Router();

// ROUTE FOR USER-DATABASE UPDATE
const {createUser, updateUser, deleteUser, getAllUsers, getUserById, addFriend, deleteFriend} = require('../../controllers/user-controller')

// ROUTE FOR ALL USERS
router.route("/").get(getAllUsers).post(createUser);

// ROUTE FOR ONE USER BY ID
router.route("/:userId").delete(deleteUser).put(updateUser).get(getUserById)
// ROUTE TO ADD AND DELETE ONE COMPANION OF USER
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)

module.exports = router;
