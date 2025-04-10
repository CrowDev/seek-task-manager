import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDeleteTask } from "@/hooks/deleteTask";
import { useDashboardContext } from "@/contexts/dashboard/DashboardContext";

const TaskDeleteDialog = () => {
  const { deleteTask } = useDeleteTask();
  const { openDeleteDialogTask, handleCloseDeleteDialogTask, taskToEdit } =
    useDashboardContext();
  const handleDeleteTask = async () => {
    await deleteTask();
    const isDelete = true;
    handleCloseDeleteDialogTask(isDelete);
  };

  return (
    <Dialog
      open={openDeleteDialogTask}
      onClose={handleCloseDeleteDialogTask}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this task?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <span>{taskToEdit?.title ?? ""}</span>
          <span>{taskToEdit?.description ?? ""}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDeleteDialogTask(false)}>
          Cancel
        </Button>
        <Button onClick={handleDeleteTask} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDeleteDialog;
