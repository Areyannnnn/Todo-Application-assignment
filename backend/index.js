const express = require("express");
const { createdTodoSchema, completedTodoSchema } = require("./types");
const { todos } = require("./db");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())


app.post("/createTodo", async (req, res) => {
    const createTodoPayload = req.body;
    const parsePayload = createdTodoSchema.safeParse(createTodoPayload);

    if (!parsePayload.success) {
        return res.status(409).json({
            msg: "Cannot created todo incalid format"
        })
    }

    const newTodo = await todos.create({
        title: req.body.title,
        description: req.body.description,
        completed: false
    })

    res.json({
        todo: newTodo
    })
})

app.get("/todos", async (req, res) => {
    const todo = await todos.find({})

    res.json(todo)
})

app.put("/completeTodo", async (req, res) => {
    const completeTodoPayload = req.body;
    const parsePayload = completedTodoSchema.safeParse(completeTodoPayload);

    if (!parsePayload.success) {
        return res.status(409).json({
            msg: "Invalid id inputs"
        })
    }

    try {
        const todo = await todos.findOne({
            _id: req.body.id
        })

        if (!todo.completed) {
            await todo.updateOne({
                "$set": {
                    completed: true
                }
            })
            res.json({
                msg: "Todo marked as complete"
            })
        } else {
            await todo.updateOne({
                "$set": {
                    completed: false
                }
            })
            res.send("Todo marked as incomplete")
        }
    } catch (e) {
        res.json({
            msg: "Hampe toh h hi nau"
        })
    }
})


app.delete("/delete-todo/:id", async (req, res) => {
    const id = req.params.id; // Access ID from URL params
    try {
        await todos.deleteOne({ _id: id });
        res.json({
            msg: "Todo deleted"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to delete todo"
        });
    }
});


app.listen(3000)