import React, { useState } from "react";
import "./TaskItem.css";
import {
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteTask, UpdateTask } from "../services/TaskService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function TaskItem({ task, fetch }) {
  const [isComplete, setIsComplete] = useState(task.isCompleted);
  const [open, setOpen] = React.useState(false);

  const [upTask, setUpTask] = useState({
    ...task,
    title: task.title,
    description: task.description,
  });

  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setUpTask({ ...upTask, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleComplete = async () => {
    let updatedTask = { ...task };
    updatedTask.isCompleted = !updatedTask.isCompleted;
    await UpdateTask(task._id, updatedTask)
      .then(({ data }) => {
        setIsComplete(!isComplete);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await DeleteTask(task._id)
      .then(({ data }) => {
        console.log(data);
        fetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async () => {
    await UpdateTask(task._id, upTask)
      .then(({ data }) => {
        fetch();
        handleClose()
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Checkbox defaultChecked checked={isComplete} onChange={handleComplete} />
      <div>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body">{task.description}</Typography>
      </div>
      <Typography variant="body">{task.createdAt}</Typography>
      <div>
        <IconButton onClick={handleClickOpen}>
          <EditNoteIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Update Task</DialogTitle>
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
              value={upTask.title}
              onChange={handleUpdateInput}
            />
            <TextField
              margin="normal"
              id="outlined-basic"
              type="text"
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={upTask.description}
              onChange={handleUpdateInput}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
