const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    user: String,
    accountId: Number,
    pair: String,
    entry: Number,
    margin: Number,
    amount: Number,
    id: Number,
});

const position = module.exports = mongoose.model('position', positionSchema)