const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: String,
    accountId: Number,
    balance: Number,
});

const account = module.exports = mongoose.model('account', accountSchema)