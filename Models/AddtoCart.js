const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    items: [
        {
            plantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "plant",
                required: true,
                },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            }
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const CartModel = mongoose.model("carts", cartSchema);
module.exports=CartModel;