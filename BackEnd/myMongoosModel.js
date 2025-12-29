// import mongoose from "mongoose";
const mongoose = require('mongoose')
const myModelSchema = new mongoose.Schema({
    taskText: String,
    taskStatus: Boolean
});

let myModel = mongoose.model('MyModel', myModelSchema);
module.exports = { myModel };