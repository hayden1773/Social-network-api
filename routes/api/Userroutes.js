const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/UserController.js');

// /api/User
router.route('/').get(getUser).post(createUser);

// /api/User
router
  .route('/User')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
