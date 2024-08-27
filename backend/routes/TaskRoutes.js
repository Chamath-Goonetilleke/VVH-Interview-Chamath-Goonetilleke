import express from "express";
import { CreateNewTask, DeleteTask, GetAllTasks, UpdateTask } from "../controller/TaskController.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.post("/",auth, CreateNewTask);
router.get("/", auth, GetAllTasks);
router.put("/:id", auth, UpdateTask);
router.delete("/:id", auth, DeleteTask)


export default router;
