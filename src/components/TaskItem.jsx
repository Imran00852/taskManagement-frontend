import { Button, Checkbox, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const TaskItem = ({
  title,
  description,
  handleDelete,
  handleUpdate,
  id,
  isCompleted,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 4,
        marginTop: 1,
      }}
    >
      <Stack direction={"column"}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h6">{description}</Typography>
      </Stack>
      <Stack direction={"row"}>
        <Checkbox
          size={"large"}
          checked={isCompleted}
          onChange={() => handleUpdate(id, !isCompleted)}
        />
        <Button
          onClick={() => handleDelete(id)}
          color="error"
          sx={{ padding: "0 2rem" }}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default TaskItem;
