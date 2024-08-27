import Task from "../models/Task.js";
import jsonwebtoken from "jsonwebtoken";

export async function CreateNewTask(req, res) {
  try {
    const token = req.header("x-auth-token");
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    const newTask = new Task({ ...req.body, userId:decoded.id });
    await newTask.save();

    res.status(201).send("New task added successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

export async function GetAllTasks(req, res) {
  try {
    
    const token = req.header("x-auth-token");
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    const tasks = await Task.find({userId:decoded.id});

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

export async function UpdateTask(req, res) {
  try {

    const {isCompleted, title, description} = req.body
    await Task.findByIdAndUpdate(req.params.id, {
      isCompleted:isCompleted,
      title: title,
      description: description
    });

    res.status(200).send("Task Updated Successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

export async function DeleteTask(req, res) {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send("Task Deleted Successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}
