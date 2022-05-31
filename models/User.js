const { Schema, model } = require('mongoose');

// USER CONSTRUCT 
const UserSchema = new Schema(
    {
        
        username: {
            type: String,
            trim: true,
            required: 'Username is Required',
            unique: true
        },

        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/],
            required: 'email is required'
        },
        // PULL FROM DATABASE OF SPECIFIC USER THOUGHTS
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // COMPANION LINK TO USER
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);
module.exports = User;
