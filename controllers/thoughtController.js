const { reaction, User, thoughts } = require('../models');

// TODO: Create an aggregate function to get the number of thoughts overall
const thoughtText = async () =>
  thoughts.aggregate()
    // Your code here
    .then((numberOfthoughts) => numberOfthoughts);



module.exports = {
  
  // Get all thoughts
  getthoughts(req, res) {
    thoughts.find()
      .then(async (thoughts) => {
        const thoughtsObj = {
          thoughts,
          thoughtText: await thoughtText(),
        };
        return res.json(thoughtsObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
 
  getSinglthought(req, res) {
    Student.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought ' })
          : res.json({
              thought,
              reaction: await reaction(req.params.thoughtId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  creatthought(req, res) {
    thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  
  deletethought(req, res) {
    thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          :User.findOneAndUpdate(
              { thought: req.params.thoughtId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((User) =>
        !User
          ? res.status(404).json({
              message: 'thought deleted, but no users found',
            })
          : res.json({ message: 'thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  removeReaction(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found:(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
