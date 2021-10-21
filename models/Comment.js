//writtenBy commentBody createdAt

const { Schema, model, Types } = require('mongoose');
// import date function
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        // set a custom id to avoid confusion with parent comment_id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true,
            trim: true
        },
        writtenBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: true
        },
        commentBody: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter to format date
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // associate replies with comments     // use ReplySchema to validate data for a reply
        replies: [ReplySchema]
    },
    {
        toJSON: {
            // virtuals wont work without this option
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Just as you've done for the pizza's schema, add a virtual to 
//et the total reply count. Using the Pizza model's 
//commentCount virtual as a guide, try and figure out how 
//to set this one up yourself and create a replyCount virtual. 

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});



const Comment = model('Comment', CommentSchema);

module.exports = Comment;