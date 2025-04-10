import { createContext, useContext, useState } from "react";
import { useTasks } from "@/hooks/getTasks";

export const DashboardPageContext = createContext(null);

export const DashboardContextProvider = ({ children }) => {
  const [isCreatingTask, setIsCreatingTask] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [openDialogTask, setOpenDialogTask] = useState(false);
  const [openDeleteDialogTask, setOpenDeleteDialogTask] = useState(false);
  const { tasks, refetch } = useTasks();
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

  const handleCloseDialogTask = (isSubmit) => {
    setOpenDialogTask(false);
    if (isSubmit) {
      console.log("here");
      refetch();
    }
  };

  const handleCloseDeleteDialogTask = (isDelete) => {
    setOpenDeleteDialogTask(false);
    if (isDelete) {
      refetch();
    }
  };

  return (
    <DashboardPageContext.Provider
      value={{
        isCreatingTask,
        handleSetActionDialogTask,
        handleOpenDialogTask,
        handleOpenDeleteDialogTask,
        taskToEdit,
        setTaskToEdit,
        openDialogTask,
        openDeleteDialogTask,
        handleCloseDialogTask,
        handleCloseDeleteDialogTask,
        tasks,
        refetch,
        columns,
      }}
    >
      {children}
    </DashboardPageContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardPageContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider",
    );
  }
  return context;
};
