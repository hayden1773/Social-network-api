const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThought).post(createThought);

// /api/thoughts/reactions
router.route('/:reactionID').get(getSingleThought).delete(deleteThought);

// /api/thought/reactions
router.route('/thought/reactions').post(addReaction);

// /api/thought/reactions/:reactionId
router.route('/thought/reactions/:reactionId').delete(removeReaction);

module.exports = router;
