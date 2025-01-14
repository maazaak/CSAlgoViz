// models/User.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },              // User's name
    totalScore: { type: Number, default: 0 },                // Total score across all questions
    questionsSolved: { type: Map, of: Number },              // Map: Question ID => Best Score
    attempts: { type: Map, of: Number },                     // Map: Question ID => Number of Attempts
    createdAt: { type: Date, default: Date.now },            // Timestamp for user creation
  });

// Export the User model
module.exports = mongoose.model('User', userSchema);
