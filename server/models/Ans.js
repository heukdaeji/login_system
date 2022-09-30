const mongoose = require('mongoose');

const AnsSchema = mongoose.Schema({
    ans: [{ answer: Number }],
    id: String
})

const Ans = mongoose.model('Ans', AnsSchema);

module.exports = { Ans };