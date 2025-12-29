// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose'
// import myModel from './myMongoosModel.js'
const express = require('express');
const cors = require('cors');
const {default: mongoose} = require('mongoose');
const {myModel} = require('./myMongoosModel')
const App = express();
App.use(express.json());
App.use(cors());


async function DbConnection() {
    await mongoose.connect('mongodb://localhost:27017/MyTodo')
    return console.log("Connected✅");
}
DbConnection();

App.post('/createtask', async(req, res)=>{
        let {taskText} = req.body;
        if(!taskText){
            res.status(420).json({
                AlrtMsg: 'Text required.'
            });
        };
        let newTask = await myModel.create({
            taskText,
            taskStatus: false,
        });
        res.status(200).json({
            AlrtMsg:"Task created ✅"
            , newTask
        })
});

App.get('/all', async(req, res)=>{
    let myTasks = await myModel.find();
    res.status(200).json({
        AlrtMsg:"Task listed✅",
        myTasks: myTasks
    })
})
App.put('/update/:id', async(req, res)=>{
    //Take both texts and status to update.
    let taskId = req.params.id;
    const {taskText, taskStatus} = req.body;
    let UpdateField = {};
    if(taskText !== undefined) UpdateField.taskText = taskText;
    if(taskStatus !== undefined) UpdateField.taskStatus = taskStatus;

    await myModel.findByIdAndUpdate(
        taskId, UpdateField, {new: true}
    )
    res.status(200).json({
        AlrtMsg: 'Updated ✅'
    })
})
App.delete('/delete/:id', async(req, res)=>{
    let taskId = req.params.id;
    await myModel.findByIdAndDelete(taskId);
    res.status(200).json({
        AlrtMsg:'Deleted ✅'
    })
})

App.listen(3300,()=>{
    console.log('Yes, its running.');
    
})