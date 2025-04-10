import { useState } from "react";
import { useTasks } from "@/hooks/getTasks";
import { DashboardPageContext } from "@/contexts/dashboard/DashboardContext";
import Grid from "@mui/material/Grid";
import TaskFormDialog from "@/components/dialog/TaskFormDialog";
import BoardColumn from "@/components/board-column/BoardColumn";
import TaskDeleteDialog from "@/components/dialog/TaskDeleteDialog";
import TabsTasks from "@/components/tab-tasks/TabsTasks";
import useBreakpoint from "@/hooks/useBreakpoint";

const DashboardPage = () => {
  const [openDialogTask, setOpenDialogTask] = useState(false);
  const [openDeleteDialogTask, setOpenDeleteDialogTask] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { tasks, loading, error, refetch } = useTasks();
  const breakpoint = useBreakpoint();

  const handleSetActionDialogTask = (isCreating) => {
    if (isCreating) {
      setTaskToEdit(null);
    }
    setIsCreatingTask(isCreating);
    handleOpenDialogTask();
  };

  const handleOpenDialogTask = () => {
    setOpenDialogTask(true);
  };

  const handleOpenDeleteDialogTask = () => {
    setOpenDeleteDialogTask(true);
  };

  const handleCloseDeleteDialogTask = (isDelete) => {
    setOpenDeleteDialogTask(false);
    if (isDelete) {
      refetch();
    }
  };

  const handleCloseDialogTask = (isSubmit) => {
    setOpenDialogTask(false);
    if (isSubmit) {
      refetch();
    }
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const inReviewTasks = tasks.filter((task) => task.status === "in-review");
  const doneTasks = tasks.filter((task) => task.status === "done");
  const blockedTasks = tasks.filter((task) => task.status === "blocked");

  const columns = [
    {
      title: "To Do",
      tasks: todoTasks,
    },
    {
      title: "In Progress",
      tasks: inProgressTasks,
    },
    {
      title: "In Review",
      tasks: inReviewTasks,
    },
    {
      title: "Done",
      tasks: doneTasks,
    },
    {
      title: "Blocked",
      tasks: blockedTasks,
    },
  ];

  return (
    <DashboardPageContext.Provider
      value={{
        isCreatingTask,
        handleSetActionDialogTask,
        handleOpenDialogTask,
        handleOpenDeleteDialogTask,
        taskToEdit,
        setTaskToEdit,
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
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
                onClick={() => handleSetActionDialogTask(true)}
                className="py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver"
              >
                Create new task
              </button>
            </article>
            {breakpoint === "desktop" && (
              <Grid container spacing={3} columns={5}>
                {columns.map((column) => (
                  <BoardColumn
                    key={column.title}
                    title={column.title}
                    tasks={column.tasks}
                  />
                ))}
              </Grid>
            )}
            {breakpoint === "tablet" && <TabsTasks columns={columns} />}
          </section>
          <TaskFormDialog
            open={openDialogTask}
            handleClose={handleCloseDialogTask}
          />
          <TaskDeleteDialog
            open={openDeleteDialogTask}
            handleClose={handleCloseDeleteDialogTask}
          />
        </>
      )}
    </DashboardPageContext.Provider>
  );
};

export default DashboardPage;
