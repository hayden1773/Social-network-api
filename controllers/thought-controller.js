// REQURIED CONNECTION TO MODELS
const {Thought, User} = require('../models')


module.exports = {
    // CREATE THOUGHT
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate({_id:req.body.userid},{$push:{thoughts:newThought._id}}, {new:true})
            res.json(newThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req, res) {
        // CREATE REACTION TO THOUGHT VIA ID
        try {
            const newReaction = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {new: true})
            res.json(newReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        // DELETE REACTION TO THOUGHT
        try {
            const deleteReaction = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: {reactionId:req.params.reactionId}
                }
            }, {new: true})
            res.json(deleteReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },


    async updateThought(req, res) {
        try {
            // UPDATE THE THOUGHT PER ID
            const updateThought = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, req.body, {new: true})

            res.json(updateThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async getAllThoughts(req, res) {
        try {
            // COLLECT ALL THOUGHTS
            const getThoughts = await Thought.find()

            res.json(getThoughts)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async getThoughtById(req, res) {
        try {
            // COLLECT ONE THOUGHT PER ID
            const getThoughtId = await Thought.findById(req.params.thoughtId,).populate("thoughts").populate("friends")
            res.json(getThoughtId)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            // DELETE THOUGHT BY ID
            const deleteThought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId
            },)

            res.json(deleteThought)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
