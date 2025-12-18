const myMongoos = require('mongoose')
const mySchema = new myMongoos.Schema({
    text: String,
    todoStatus: Boolean,
})

const myModel = myMongoos.model('mySchemaModel', mySchema)
module.exports = {
    myModel
}