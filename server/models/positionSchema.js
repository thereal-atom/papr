const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    pair: String,
    entry: Number,
    amount: Number,
    cost: Number,
    id: Number,
});

const position = module.exports = mongoose.model('position', positionSchema)