var express = require('express')
var app = express()
app.set("view engine", "ejs")
app.use(express.static("public"));
var fs = require('fs')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newdb', { useNewUrlParser: true });
var session = require('express-session')
var _ = require("lodash")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const crypto = require('crypto');

var bodyParser = require("body-parser")
// var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))

const secret = 'abcdefg';

const VolSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    contact: Number,
    Aadhar: Number,
    Address: String,
    Address2: String,
    City: String,
    State: String,
    PIN: Number,
    volId: ObjectId
});

const VolModel = mongoose.model('Vol', VolSchema);

const checkLogIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/')
    }
}

app.get('/', (req, res) => {
    res.render("dashboard")
})
app.get('/404', (req, res) => {
    res.send("404 error")
})

app.listen(3005, () => {
    console.log("Server is running")
})