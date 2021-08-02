const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = mongoose.model("TODO");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

//post route for adding new task
router.post("/addtask", async(req, res) => {
    const { todoTitle, todoDate, todoPriority, todoCompleted } = req.body;
    try {
        const todoObject = new Todo({
            todoTitle,
            todoDate,
            todoPriority,
            todoCompleted,
        });
        await todoObject.save(function(err) {
            if (err) {
                res.status(401).send(err.message);
            }
            var todoId = todoObject._id;
            res.status(200).send(todoId);
        });
    } catch (err) {
        res.status(422).send(err.message);
    }
});

router.post("/updatetask", async(req, res) => {
    const { todoId, todoTitle, todoDate, todoPriority, todoCompleted } = req.body;
    console.log(todoDate)
    try {
        Todo.updateOne({ _id: todoId }, {
                $set: {
                    todoTitle,
                    todoDate,
                    todoPriority,
                    todoCompleted,
                },
            }, { omitUndefined: 1, new: true },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200);
                    res.send(success);
                }
            }
        );
    } catch (err) {
        res.status(422).send(err.message);
    }
});

router.post("/removetask", async(req, res) => {
    const { todoId } = req.body;
    try {
        const todo = await Todo.findByIdAndDelete(todoId);
        if (!todo) return res.status(404);
        return res.status(200).send(todo);
    } catch (err) {
        res.status(422).send(err.message);
    }
});

router.get("/", function(req, res) {
    Todo.find({}, function(err, todo) {
        var todoMap = [];
        todo.forEach(function(todos) {
            todoMap.push(todos);
        });
        res.status(200).send(todoMap);
    });
});

module.exports = router;