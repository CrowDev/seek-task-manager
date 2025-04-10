import { useCallback, useState, useContext } from "react";
import { DashboardPageContext } from "@/contexts/dashboard/DashboardContext";

const API_URL = import.meta.env.VITE_API_URL;

export function useUpsertTask(body) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isCreatingTask, taskToEdit } = useContext(DashboardPageContext);

  const createTask = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const url = isCreatingTask
        ? `${API_URL}create`
        : `${API_URL}edit/${taskToEdit._id}`;
      const response = await fetch(url, {
        method: isCreatingTask ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [body, isCreatingTask, taskToEdit]);

  return {
    data,
    error,
    loading,
    createTask,
  };
}
