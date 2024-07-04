const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./user");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/cogndb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("Connected to DB");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.redirect('./sign_up.html');
});

app.post("/sign_up", (req, res) => {
    const { name, email, pwd, age } = req.body;
    
    const newUser = new User({
        name,
        email,
        pwd,
        age
    });

    newUser.save((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error registering user");
        }
        console.log("Registered Successfully!");
        return res.redirect('./login.html');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
