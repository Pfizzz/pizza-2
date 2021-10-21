const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// we only need the schema constructor and model function

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Just like a virtual, the getter will transform the data before it gets to the controller(s).
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
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
    return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the pizza model 
module.exports = Pizza;