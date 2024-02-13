const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:pokemonpokemon@cluster0.njvrj61.mongodb.net/todos")

const todoSchema =  new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todos = mongoose.model("todos",todoSchema);

module.exports={
    todos
}