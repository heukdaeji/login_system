const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    quiz: [{ number: Number, description: String, answer: Number, answerTexts:[{number: Number, value: String}]}],
    name: String
})

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = { Quiz };