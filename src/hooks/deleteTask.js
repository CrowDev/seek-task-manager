import { useCallback, useState, useContext } from "react";
import { DashboardPageContext } from "@/contexts/dashboard/DashboardContext";

const API_URL = import.meta.env.VITE_API_URL;

export function useDeleteTask() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { taskToEdit } = useContext(DashboardPageContext);

  const deleteTask = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`${API_URL}delete/${taskToEdit?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [taskToEdit]);

  return {
    data,
    error,
    loading,
    deleteTask,
  };
}
