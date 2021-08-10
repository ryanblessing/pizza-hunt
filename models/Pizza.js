//import the dependencies...and only the Schema constructor and Model function
const {
    Schema,
    model
} = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    // the schema type object id, tells which place to insert the comment?
    // -REF property tells the pizza model which doc to search and find
    Comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

// Virtuals allow you to add virtual properties to a document that aren't stored in the database.
//To man Virtuals work, you need to add the toJSOn property above.
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

//create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;