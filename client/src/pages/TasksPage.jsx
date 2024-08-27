import React, { useEffect, useState } from "react";
import "./TasksPage.css";
import { CreateNewTask, GetAllTasks } from "../services/TaskService";
import TaskItem from "../components/TaskItem";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [newTask, setNewTask] = useState({
    title:"",
    description:"",
  });


  const handleTaskInput=(e)=>{
    const {name, value} = e.target;
    setNewTask({...newTask, [name]:value})
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchAllTask = async () => {
    await GetAllTasks()
      .then(({ data }) => {
        setTasks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  const saveNewTask = async()=>{
    await CreateNewTask(newTask).then(({data})=>{
        console.log(data);
        fetchAllTask()
        handleClose()
    }).catch((error)=>{
        console.log(error)
    })
  }

  return (
    <div style={{ margin: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add New Task
        </Button>
      </div>
      {tasks.map((task, index) => {
        return <TaskItem key={index} task={task} fetch={fetchAllTask} />;
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="normal"
              id="outlined-basic"
              type="text"
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              value={newTask.title}
              onChange={handleTaskInput}
            />
            <TextField
              margin="normal"
              id="outlined-basic"
              type="text"
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={newTask.description}
              onChange={handleTaskInput}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={saveNewTask} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
