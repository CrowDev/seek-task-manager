import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const BoardColumn = ({ title, tasks }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      low: "#57a773",
      medium: "#f2b705",
      high: "#f26a4f",
    };
    return colors[priority];
  };

  return (
    <Grid size="grow">
      <Box>
        <Paper sx={{ overflow: "hidden", backgroundColor: "#f8f9fa" }}>
          <div className="py-2 px-3 mb-3 text-lg font-semibold bg-secondary-gray text-neutral-mist">
            <span>{title}</span>
          </div>
          <div className="flex flex-col py-2 px-3 space-y-5">
            {tasks.map((task) => (
              <Paper
                key={task._id}
                sx={{
                  borderLeft: "5px solid",
                  borderColor: getPriorityColor(task.priority),
                  padding: "10px",
                }}
              >
                <div className="flex mb-3">
                  <span className="font-semibold text-neutral-charcoal">
                    {task.title}
                  </span>
                  <Chip
                    sx={{
                      backgroundColor: getPriorityColor(task.priority),
                      color: "#f8f9fa",
                    }}
                    label={task.priority.toUpperCase()}
                  />
                </div>
                <p className="text-neutral-charcoal">{task.description}</p>
              </Paper>
            ))}
          </div>
        </Paper>
      </Box>
    </Grid>
  );
};

export default BoardColumn;
