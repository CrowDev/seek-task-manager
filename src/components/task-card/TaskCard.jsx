import { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { DashboardPageContext } from "@/contexts/dashboard/DashboardContext";

const TaskCard = ({ task }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const {
    handleSetActionDialogTask,
    handleOpenDialogTask,
    handleOpenDeleteDialogTask,
    setTaskToEdit,
  } = useContext(DashboardPageContext);

  const handleOptionsMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsMenuClose = (action, task) => {
    setTaskToEdit(task);
    if (action === "edit") {
      const isCreating = false;
      handleSetActionDialogTask(isCreating);
      handleOpenDialogTask();
    } else {
      handleOpenDeleteDialogTask();
    }
    setAnchorEl(null);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "#57a773",
      medium: "#f2b705",
      high: "#f26a4f",
    };
    return colors[priority.toLowerCase()];
  };

  return (
    <Paper
      key={task._id}
      sx={{
        borderLeft: "5px solid",
        borderColor: getPriorityColor(task.priority),
        padding: "10px",
      }}
    >
      <div className="flex justify-between mb-3">
        <span className="self-center font-semibold text-neutral-charcoal">
          {task.title}
        </span>
        <IconButton
          id="options-button"
          aria-controls={menuOpen ? "options-menu" : null}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : null}
          onClick={handleOptionsMenuClick}
          aria-label="options"
          sx={{ alignSelf: "self-start" }}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          id="options-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleOptionsMenuClose}
        >
          <MenuItem onClick={() => handleOptionsMenuClose("edit", task)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleOptionsMenuClose("delete", task)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      <p className="mb-3 text-neutral-charcoal">{task.description}</p>
      <Chip
        sx={{
          backgroundColor: getPriorityColor(task.priority),
          color: "#f8f9fa",
        }}
        label={task.priority.toUpperCase()}
      />
    </Paper>
  );
};

export default TaskCard;
