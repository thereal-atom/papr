const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    id: Number,
    user: String,
    accountId: Number,
    pair: String,
    entry: Number,
    margin: Number,
    amount: Number,
    open: Boolean,
    long: Boolean,
    leverage: Number,
});

const position = module.exports = mongoose.model('position', positionSchema)