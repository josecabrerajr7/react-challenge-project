const mongoose = require('mongoose');

// creating the database table. Should also include the user that signed in and link it to there account. user_id
const OrderSchema = new mongoose.Schema({
    order_item: String,
    quantity: Number,
    ordered_by: String
}, {
    timestamps: true,
    collection: 'Orders',
});

module.exports = mongoose.model('Order', OrderSchema);