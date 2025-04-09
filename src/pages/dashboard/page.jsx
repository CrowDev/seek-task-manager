import { useEffect } from "react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return tasks.map((task) => {
    return (
      <div key={task._id} className="text-gray-700">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>{task.dueDate}</p>
        <p>{task.state}</p>
      </div>
    );
  });
};

export default DashboardPage;
