const express = require("express");
const router = express.Router();
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
var todoList = [{
    todoTitle: "Complete remaining blog",
    todoDate: "2021-06-01T08:30",
    todoPriority: 2,
    todoCompleted: "false",
    id: "575407e7-d2f9-4e44-8e85-c2425c24ffe6",
}, ];

//post route for adding new task
router.post("/addtask", function(req, res) {
    var newTask = req.body;
    //add the new task from the post route
    newTask.id = uuidv4();
    todoList.push(newTask);
    res.status(200).send(newTask);
});

router.post("/updatetask", function(req, res) {
    var updatedTask = req.body;
    try {
        todoList.map((data) => {
            if (updatedTask.id === data.id) {
                // console.log(data)
                if (updatedTask.todoTitle) {
                    data.todoTitle = updatedTask.todoTitle;
                }
                if (updatedTask.todoDate) {
                    data.todoDate = updatedTask.todoDate;
                }
                if (updatedTask.todoPriority) {
                    data.todoPriority = updatedTask.todoPriority;
                }
                if (updatedTask.todoCompleted) {
                    data.todoCompleted = updatedTask.todoCompleted;
                }
                console.log(data);
                res.status(200).send(data);
            }
        });
    } catch {
        return res.status(422).send({ error: "Please provide correct data" });
    }
});

router.post("/removetask", function(req, res) {
    var todoId = req.body;
    try {
        index = todoList.findIndex(x => x.id === todoId.id)
        if (index > -1) {
            todoList.splice(index, 1);
        }
        console.log(todoList)
        res.status(200).send(todoList);
    } catch {
        res.status(422).send({ error: "Please provide correct data" });
    }
});

router.get("/", function(req, res) {
    res.status(200).send(todoList);
});

module.exports = router;