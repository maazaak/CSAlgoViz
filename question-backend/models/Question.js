// models/Question.js
const mongoose = require('mongoose');

// Define the question schema
const questionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  difficulty: String,
  testCases: [
    {
      input: [mongoose.Schema.Types.Mixed],
      expectedOutput: mongoose.Schema.Types.Mixed,
    },
  ],
  edgeCases: [
    {
      input: [mongoose.Schema.Types.Mixed],
      expectedOutput: mongoose.Schema.Types.Mixed,
    },
  ],
});

// Export the Question model
module.exports = mongoose.model('Question', questionSchema);
