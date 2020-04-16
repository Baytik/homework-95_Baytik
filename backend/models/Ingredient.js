const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    ingredients: [
        {name: String, amount: String}
    ],
    published: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;