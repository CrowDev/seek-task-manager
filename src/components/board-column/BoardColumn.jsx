import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TaskCard from "@/components/task-card/TaskCard";

const BoardColumn = ({ title, tasks }) => {
  const getBoardColor = (title) => {
    const colors = {
      "To Do": "bg-secondary-gray",
      "In Progress": "bg-primary-teal",
      "In Review": "bg-accent-amber",
      Done: "bg-accent-success",
      Blocked: "bg-accent-coral",
    };
    return colors[title];
  };

  return (
    <Grid size="grow">
      <Box>
        <Paper sx={{ overflow: "hidden", backgroundColor: "#f8f9fa" }}>
          <div
            className={`py-2 px-3 mb-3 text-lg font-semibold ${getBoardColor(title)} text-neutral-mist`}
          >
            <span>{title}</span>
          </div>
          <div className="flex flex-col py-2 px-3 space-y-5">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </Paper>
      </Box>
    </Grid>
  );
};

export default BoardColumn;
