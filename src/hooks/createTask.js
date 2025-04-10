import { useCallback, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useCreateTask(body) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`${API_URL}create`, {
        method: "POST",
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
  }, [body]);

  return {
    data,
    error,
    loading,
    createTask,
  };
}
