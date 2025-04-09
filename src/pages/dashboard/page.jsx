import { useEffect } from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import TaskFormDialog from "@/components/dialog/TaskFormDialog";

const API_URL = import.meta.env.VITE_API_URL;

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialogTask, setOpenDialogTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleOpenDialogTask = () => {
    setOpenDialogTask(true);
  };

  const handleCloseDialogTask = () => {
    setOpenDialogTask(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "#57a773",
      medium: "#f2b705",
      high: "#f26a4f",
    };
    return colors[priority];
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const inReviewTasks = tasks.filter((task) => task.status === "in-review");

  const doneTasks = tasks.filter((task) => task.status === "done");

  const blockedTasks = tasks.filter((task) => task.status === "blocked");

  return (
    <>
      <section className="mx-auto max-w-7xl">
        <article className="mb-3">
          <h1 className="text-2xl font-semibold text-primary-blue">
            Dev Team Task Board
          </h1>
        </article>
        <article className="flex justify-between py-2 mb-3 border-b border-secondary-gray">
          <div className="flex space-x-4">
            <button className="py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver">
              Board
            </button>
            <button className="py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver">
              List
            </button>
          </div>
          <button
            onClick={handleOpenDialogTask}
            className="py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver"
          >
            Create new task
          </button>
        </article>

        <Grid container spacing={3} columns={5}>
          <Grid size="grow">
            <Box>
              <Paper sx={{ overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                <div className="py-2 px-3 mb-3 text-lg font-semibold bg-secondary-gray text-neutral-mist">
                  <span>To Do</span>
                </div>
                <div className="flex flex-col py-2 px-3 space-y-5">
                  {todoTasks.map((task) => (
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
                      <p className="text-neutral-charcoal">
                        {task.description}
                      </p>
                    </Paper>
                  ))}
                </div>
              </Paper>
            </Box>
          </Grid>
          <Grid size="grow">
            <Box>
              <Paper sx={{ overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                <div className="py-2 px-3 mb-3 text-lg font-semibold bg-primary-teal text-neutral-mist">
                  <span>In Progress</span>
                </div>
                <div className="flex flex-col py-2 px-3 space-y-5">
                  {inProgressTasks.map((task) => (
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
                      <p className="text-neutral-charcoal">
                        {task.description}
                      </p>
                    </Paper>
                  ))}
                </div>
              </Paper>
            </Box>
          </Grid>
          <Grid size="grow">
            <Box>
              <Paper sx={{ overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                <div className="py-2 px-3 mb-3 text-lg font-semibold bg-accent-amber text-neutral-mist">
                  <span>In Review</span>
                </div>
                <div className="flex flex-col py-2 px-3 space-y-5">
                  {inReviewTasks.map((task) => (
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
                      <p className="text-neutral-charcoal">
                        {task.description}
                      </p>
                    </Paper>
                  ))}
                </div>
              </Paper>
            </Box>
          </Grid>
          <Grid size="grow">
            <Box>
              <Paper sx={{ overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                <div className="py-2 px-3 mb-3 text-lg font-semibold bg-accent-success text-neutral-mist">
                  <span>Done</span>
                </div>
                <div className="flex flex-col py-2 px-3 space-y-5">
                  {doneTasks.map((task) => (
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
                      <p className="text-neutral-charcoal">
                        {task.description}
                      </p>
                    </Paper>
                  ))}
                </div>
              </Paper>
            </Box>
          </Grid>
          <Grid size="grow">
            <Box>
              <Paper sx={{ overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                <div className="py-2 px-3 mb-3 text-lg font-semibold bg-accent-coral text-neutral-mist">
                  <span>Blocked</span>
                </div>
                <div className="flex flex-col py-2 px-3 space-y-5">
                  {blockedTasks.map((task) => (
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
                      <p className="text-neutral-charcoal">
                        {task.description}
                      </p>
                    </Paper>
                  ))}
                </div>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </section>
      <TaskFormDialog
        open={openDialogTask}
        handleClose={handleCloseDialogTask}
      />
    </>
  );
};

export default DashboardPage;
