const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./user");
const path = require("path");
const bcrypt = require("bcrypt");

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
    res.sendFile(path.join(__dirname, 'public', 'sign_up.html'));
});

app.post("/sign_up", async (req, res) => {
    try {
        const { name, email, pwd, age } = req.body;
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = new User({
            name,
            email,
            pwd: hashedPassword,
            age
        });

        await newUser.save();
        console.log("Registered Successfully!");
        res.redirect('/login.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.send("User not found");
        }
       
        const isPasswordMatch = await bcrypt.compare(password, user.pwd);
        if (!isPasswordMatch) {
            return res.send("Wrong Password");
        } else {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
