// REQUIRED PROPERTIES OF THOUGHT MODEL
const { Schema, model } = require('mongoose');

// PULL IN REACTION SCHEMA FOR USE
const ReactionSchema = require('./Reaction');

const moment = require('moment')

const ThoughtSchema = new Schema(
    {
        // TYPE OF DISPLAY FOR THOUGHT
        thoughtText: {
            type: String,
            required: 'Thought text is Required',
            minlength: 1,
            maxlength: 280
        },
        // TIME THOUGHT WAS CREATED
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a')
        },
        // USER DISPLAYED FOR THOUGHT GENERATION USE
        username: {
            type: String,
            required: 'Username is Required'
        },
        // PROPERTY PULL FOR REACTION OF THOUGHT
        reactions: [ ReactionSchema ]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
