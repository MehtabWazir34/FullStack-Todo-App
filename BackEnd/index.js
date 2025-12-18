const myExp = require('express')
const { default: mongoose } = require('mongoose')
const { myModel } = require('./myMongoosModel')
const myCORS = require('cors')
const myApp = myExp()
myApp.use(myExp.json())
myApp.use(myCORS())

// DB connection
async function myDBConnection() {
    const connect = await mongoose.connect('mongodb://localhost:27017/myFirstApp')
    if(connect){
        console.log('Connection is Okay!');
        
    }
}
myDBConnection()

let myData = [
            {
            name: 'Hmm',
            cast: 'Wazir'
        },
            {
            name: 'Hmm',
            cast: 'Wazir'
        },
            {
            name: 'Hmm',
            cast: 'Wazir'
        },
]

myApp.post('/create', async (req, res)=>{
    const {text} = req.body
    if(!text){
        res.status(404).json({
            StatusAlert:'Text is required'
        })
    }
    const newTodo = await myModel.create({
        text,
        todoStatus: false
    })

    res.status(200).json({
        StatusAlert:'Created',
        newTodo
    })
})

myApp.put("/update/:id", async (req, res)=>{
      try {
    const todoID = req.params.id;
    const { text, todoStatus } = req.body;

    const updateFields = {};

    if (text !== undefined) updateFields.text = text;
    if (todoStatus !== undefined) updateFields.todoStatus = todoStatus;

    const updateTodo = await myModel.findByIdAndUpdate(
      todoID,
      updateFields,
      { new: true }
    );

    res.status(200).json({
      StatusAlert: "Updated",
      updateTodo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
myApp.delete("/delete/:id", async (req, res)=>{
    const todoID = req.params.id
    await myModel.findByIdAndDelete(todoID)
    res.status(200).json({
        StatusAlert:'Deleted',
    })
}) 
myApp.get("/all", async (req, res)=>{
    const todoID = await myModel.find()
    res.status(200).json({
        StatusAlert:'All tasks are listed below',
        todoID
    })
})
myApp.get("/mytodo/:id", async (req, res)=>{
    const todoID = req.params.id
    const mytodo = await myModel.findById(todoID)
    res.status(200).json({
        StatusAlert:'Your todo',
        mytodo
    })
})

myApp.get("/", async (req, res)=>{
    // const todoID = req.params.id
    // const mytodo = await myModel.findById(todoID)
    
    res.status(200).json({
        Msg: "Hi, its running on homepage"
    })
})


myApp.listen(3400, ()=>{
    console.log(`{Running at: ${'http://localhost:3400'}}`);
    
})