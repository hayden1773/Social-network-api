// REQUIRED PROPERTIES OF SCHEMA
const { Schema, Types } = require('mongoose');
const moment = require('moment')

// REACTION SCHEMA MODEL AND CONTENTS
const ReactionSchema = new Schema(
    {
        // REACTION ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // CONTENT OF REACTION
        reactionBody: {
            type: String,
            required: 'ReactionBody is Required',
            maxlength: 280
        },
        // USER DISPLAYING FOR REACTION
        username: {
            type: String,
            required: 'Username is Required'
        },
        // MOMENT OF REACTION CREATION
        createAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = ReactionSchema;
