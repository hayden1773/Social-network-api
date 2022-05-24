const { Schema, model } = require('mongoose');
const reactionsSchema = require('./reactions');

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timeStamp=> timeStamp,
      },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionsSchema,
    ]

    
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;
