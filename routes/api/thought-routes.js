// REQUIRED
const router = require('express').Router();
const {addReaction, createThought, updateThought, deleteThought, getAllThoughts, getThoughtById, deleteReaction} = require('../../controllers/thought-controller')
// THOUGHT ROUTE
router.route("/").post(createThought).get(getAllThoughts)
// THOUGHT ID ROUTE
router.route("/:thoughtId").delete(deleteThought).put(updateThought).get(getThoughtById)
// REACTION ROUTE
router.route("/reactions/:thoughtId").post(addReaction)
// REACTION ID THROUGH THOUGHT ROUTE
router.route("/reactions/:thoughtId/:reactionId").delete(deleteReaction)

module.exports = router;
