import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useUpsertTask } from "@/hooks/upsertTask";
import { useDashboardContext } from "@/contexts/dashboard/DashboardContext";

const TaskFormDialog = () => {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [body, setBody] = useState({});
  const { openDialogTask, handleCloseDialogTask, isCreatingTask, taskToEdit } =
    useDashboardContext();

  const { createTask } = useUpsertTask(body);

  return (
    <>
      <Dialog
        open={openDialogTask}
        onClose={() => handleCloseDialogTask(false)}
        maxWidth="sm"
        fullWidth={true}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event) => {
              event.preventDefault();
              await createTask();
              const isSubmit = true;
              handleCloseDialogTask(isSubmit);
            },
          },
        }}
      >
        <DialogTitle>
          {isCreatingTask ? "Create new task" : "Edit task"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className="mb-3">
            <TextField
              value={body?.title ?? taskToEdit?.title}
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setBody((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="mb-3">
            <TextField
              value={body?.description ?? taskToEdit?.description}
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <Grid container spacing={3} columns={2}>
            <Grid size="grow">
              <FormControl fullWidth>
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  name="priority"
                  label="Priority"
                  value={priority || taskToEdit?.priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    setBody((prev) => ({ ...prev, priority: e.target.value }));
                  }}
                >
                  <MenuItem value={"high"}>High</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size="grow">
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  name="status"
                  label="Status"
                  value={status || taskToEdit?.status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setBody((prev) => ({ ...prev, status: e.target.value }));
                  }}
                >
                  <MenuItem value={"todo"}>Todo</MenuItem>
                  <MenuItem value={"in-progress"}>In Progress</MenuItem>
                  <MenuItem value={"in-review"}>In Review</MenuItem>
                  <MenuItem value={"done"}>Done</MenuItem>
                  <MenuItem value={"blocked"}>Blocked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialogTask(false)}>Cancel</Button>
          <Button type="submit">
            {isCreatingTask ? "Create Task" : "Edit Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskFormDialog;
