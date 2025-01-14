// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Question = require('./models/Question');
const User = require('./models/User'); // Import the User model
const NewUser = require('./models/NewUser'); // Import the new schema

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;  // Add your MongoDB connection URI here
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Path to the questions.js file
// Replace with your absolute path to the questions.js file
const QUESTIONS_FILE_PATH = path.join(__dirname, "../src/app/code-editor/questions.js");


app.get("/user-details/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch the user's data from the NewUser collection
    const user = await NewUser.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log raw keys for debugging
    console.log("Raw questionsSolved keys:", Array.from(user.questionsSolved.keys()));

    // Extract valid question IDs from questionsSolved
    const questionIds = Array.from(user.questionsSolved.keys())
      .map((id) => parseInt(id, 10)) // Convert keys to integers
      .filter((id) => !isNaN(id)); // Ensure valid numeric IDs

    console.log("Valid Question IDs to fetch:", questionIds);

    // Fetch question details from the questions collection
    const questions = await Question.find({ id: { $in: questionIds } });

    console.log("Fetched questions from database:", questions);

    // Combine question details with user's data
    const questionsWithDetails = questions.map((question) => ({
      id: question.id,
      title: question.title,
      difficulty: question.difficulty,
      bestScore: user.questionsSolved.get(question.id.toString()) || 0,
      attempts: user.attempts.get(question.id.toString()) || 0,
    }));

    // Respond with the user's stats and detailed question data
    res.status(200).json({
      username: user.username,
      totalScore: user.totalScore,
      questions: questionsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/leaderboard', async (req, res) => {
  try {
    // Query data from the 'newusers' collection
    const users = await NewUser.find().sort({ totalScore: -1 });

    // Format the data
    const formattedUsers = users.map(user => ({
      _id: user._id,
      username: user.username,
      totalScore: user.totalScore,
      questionsSolved: user.questionsSolved ? Object.fromEntries(user.questionsSolved) : {}
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Create a new question
app.post('/save-question', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    newQuestion.id = Date.now();
    await newQuestion.save();
    console.log('New question saved to MongoDB successfully.');

    // Append the new question to questions.js
    appendQuestionToFile(newQuestion);

    res.status(200).json({ message: 'Question saved successfully', id: newQuestion.id });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

const appendQuestionToFile = (question) => {
  try {
    console.log("Attempting to read from questions.js file...");

    // Dynamically require the questions.js file
    delete require.cache[require.resolve(QUESTIONS_FILE_PATH)]; // Clear cache to ensure updated content is loaded
    const currentQuestions = require(QUESTIONS_FILE_PATH);

    // Ensure the file contains a valid array
    if (!Array.isArray(currentQuestions)) {
      console.error("Error: No valid array found in questions.js file.");
      return;
    }

    // Clean and reorder testCases and edgeCases
    const cleanCases = (cases) =>
      cases.map(({ input, expectedOutput }) => ({
        input,
        expectedOutput,
      }));

    // Reorder keys to ensure "id" comes first and remove unnecessary fields
    const reorderedQuestion = {
      id: question.id, // Add "id" first
      title: question.title,
      description: question.description,
      difficulty: question.difficulty,
      testCases: cleanCases(question.testCases),
      edgeCases: cleanCases(question.edgeCases),
    };

    // Append the reordered question
    currentQuestions.push(reorderedQuestion);

    // Prepare the updated content
    const updatedContent = `
      const questions = ${JSON.stringify(currentQuestions, null, 2)};
      
      module.exports = questions;
    `;

    console.log("Attempting to write new question to questions.js file...");
    fs.writeFileSync(QUESTIONS_FILE_PATH, updatedContent.trim(), "utf8");
    console.log("New question saved to questions.js file successfully.");
  } catch (error) {
    console.error("Error appending question to questions.js:", error.message);
  }
};


app.post('/create-dummy-user', async (req, res) => {
  try {
    const newUser = new User({
      googleId: '123456789',
      username: 'Test User',
      email: 'testuser@gmail.com',
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/user', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the user already exists in the new collection
    let user = await NewUser.findOne({ username });
    if (!user) {
      // Create a new user if it doesn't exist
      user = new NewUser({
        username,
        totalScore: 0,
        questionsSolved: {},
        attempts: {},
      });
      await user.save();
      return res.status(201).json({ message: 'New user created successfully', user });
    }

    // If user exists, return the existing user
    res.status(200).json({ message: 'User already exists', user });
  } catch (error) {
    console.error('Error in /user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.put('/user/update-stats', async (req, res) => {
  const { username, questionId, score } = req.body;

  try {
    // Check if the user exists in the NewUser collection
    const user = await NewUser.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convert questionId to a string before using it as a key
    const questionKey = String(questionId);

    // Update attempts
    user.attempts.set(questionKey, (user.attempts.get(questionKey) || 0) + 1);

    // Update best score for the question
    const currentBest = user.questionsSolved.get(questionKey) || 0;
    if (score > currentBest) {
      user.questionsSolved.set(questionKey, score);
    }

    // Update total score
    user.totalScore += score;

    await user.save();
    res.status(200).json({ message: 'User stats updated', user });
  } catch (error) {
    console.error('Error in /user/update-stats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.post('/save-user', async (req, res) => {
  console.log("Request received at /save-user:", req.body); // Log incoming data
  const { googleId, username, email } = req.body;

  try {
    let user = await User.findOne({ googleId });
    if (!user) {
      console.log("Creating new user...");
      user = new User({ googleId, username, email });
      await user.save();
      return res.status(201).json({ message: "User created successfully!" });
    }

    console.log("Updating existing user...");
    user.username = username;
    user.email = email;
    await user.save();

    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error in /save-user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Fetch a question by ID
app.get('/get-question/:id', async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    const question = await Question.findOne({ id: questionId });
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Update a question by ID
app.put('/update-question/:id', async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    const updatedQuestion = await Question.findOneAndUpdate({ id: questionId }, req.body, { new: true });
    if (updatedQuestion) {
      res.status(200).json(updatedQuestion);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Delete a question by ID
app.delete('/delete-question/:id', async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    const deletedQuestion = await Question.findOneAndDelete({ id: questionId });
    if (deletedQuestion) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
