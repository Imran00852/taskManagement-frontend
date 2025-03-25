import {
  Button,
  Container,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from "../redux/api/api";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const [createTask] = useCreateTaskMutation();
  const { isLoading, data, error } = useGetAllTasksQuery("");
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [task, setTask] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createTask({ title, description });
      if (res.data) {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
      } else {
        toast.error(res.error?.data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(res.err?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTask(id);
      if (res.data) {
        toast.success(res.data.message);
      } else {
        toast.error(res?.error?.data?.message || "Something went Wrong!");
      }
    } catch (error) {
      toast.error(res?.error?.data?.message || "Something went Wrong!");
    }
  };

  const handleUpdate = async (id, isCompleted) => {
    try {
      const res = await updateTask({ id, isCompleted });
      if (res.data) {
        toast.success(res.data.message);
      } else {
        toast.error(res?.error?.data?.message || "Something went Wrong!");
      }
    } catch (error) {
      toast.error(res?.error?.data?.message || "Something went Wrong!");
    }
  };

  useEffect(() => {
    if (data) {
      setTask(data.tasks);
    } else if (error) {
      toast.error(error.message);
    }
  }, [data, error]);
  return (
    <>
      <Container maxWidth="lg" component={"section"} sx={{ marginTop: "2rem" }}>
        <Paper
          elevation={3}
          sx={{ display: "flex", flexDirection: "column", padding: 4 }}
        >
          <Typography variant="h5" textAlign={"center"}>
            Create a Task
          </Typography>
          <form style={{ width: "100%", marginTop: "1rem" }}>
            <TextField
              fullWidth
              placeholder="Enter title..."
              label="Title"
              variant="outlined"
              margin="normal"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              placeholder="Enter description..."
              label="Description"
              variant="outlined"
              margin="normal"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "black",
                padding: 2,
                fontWeight: 700,
              }}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </form>
        </Paper>
      </Container>

      <Container maxWidth="lg" component={"section"} sx={{ marginTop: "2rem" }}>
        {isLoading ? (
          <Skeleton />
        ) : task?.length > 0 ? (
          task.map((i) => (
            <TaskItem
              key={i._id}
              title={i.title}
              description={i.description}
              id={i._id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              isCompleted={i.isCompleted}
            />
          ))
        ) : (
          <Typography variant="h4" textAlign={"center"}>
            No Tasks Yet!
          </Typography>
        )}
      </Container>
    </>
  );
};

export default Home;
