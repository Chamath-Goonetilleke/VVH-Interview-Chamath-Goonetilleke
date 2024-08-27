import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, Required:true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  userId: { type: mongoose.Types.ObjectId, Required:true },
  createdAt: { type: Date, default: new Date() },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;