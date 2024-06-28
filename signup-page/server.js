const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/signupDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for user data
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// Serve the signup page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Handle form submission
app.post('/signup', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        age: req.body.age
    });

    newUser.save((err) => {
        if (err) {
            res.send('Error saving user to database.');
        } else {
            res.send('User signed up successfully!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
