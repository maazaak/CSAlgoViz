// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Question = require('./models/Question');

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
const QUESTIONS_FILE_PATH = 'E:/project/code-editor-app/src/questions.js';


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
    console.log('Attempting to read from questions.js file...');
    
    // Correct path to the questions.js file
    let currentQuestions = fs.readFileSync(QUESTIONS_FILE_PATH, 'utf8');
    console.log('Successfully read from questions.js file.');

    // Extract the array content from the file, ignoring the module.exports part
    let arrayContentMatch = currentQuestions.match(/module\.exports\s*=\s*questions\s*=\s*(\[[\s\S]*\]);/);
    if (!arrayContentMatch) {
      console.error('Error: No valid array found in questions.js file.');
      return;
    }

    // Parse current content into JSON
    let questionsArray = JSON.parse(arrayContentMatch[1]);

    // Append the new question
    questionsArray.push(question);

    // Prepare updated content
    const updatedContent = `
      const questions = ${JSON.stringify(questionsArray, null, 2)};
      
      module.exports = questions;
    `;

    console.log('Attempting to write new question to questions.js file...');
    fs.writeFileSync(QUESTIONS_FILE_PATH, updatedContent.trim(), 'utf8');
    console.log('New question saved to questions.js file successfully.');
  } catch (error) {
    console.error('Error appending question to questions.js:', error);
  }
};





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
