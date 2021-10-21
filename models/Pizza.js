const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// we only need the schema constructor and model function

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        // validation
        required: 'You need to provide a pizza name!',
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Just like a virtual, the getter will transform the data before it gets to the controller(s).
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        //validation:
        required: true,
        // enumerable
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            // tells mongoose to expect objectid and its data comes from the Comment model
            type: Schema.Types.ObjectId,
            // tells pizza model which documents to search to find the right comments
            ref: 'Comment'
        }
    ]
},
// tells the schema it can use virtuals AND getters
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // this is a virtual mongoose returns and we dont need it
        id: false
    }
);

// get total count of comments and replies on retrieval
// creates virtual
PizzaSchema.virtual('commentCount').get(function() {
    // returns comments AND replies as well
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the pizza model 
module.exports = Pizza;