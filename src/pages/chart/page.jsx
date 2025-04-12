import { PieChart } from "@mui/x-charts/PieChart";
import { useDashboardContext } from "@/contexts/dashboard/DashboardContext";
import { useState } from "react";

const ChartPage = () => {
  const [activeButton, setActiveButton] = useState("status");
  const { columns, tasks } = useDashboardContext();

  const getData = () => {
    if (activeButton === "status") {
      return columns.map((column) => {
        return {
          id: column.title,
          value: column.tasks.length,
          label: column.title,
        };
      });
    }
    return ["high", "medium", "low"].map((priority) => {
      return {
        id: priority,
        value: tasks.filter((task) => task.priority === priority).length,
        label: priority.charAt(0).toUpperCase() + priority.slice(1),
      };
    });
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <section className="mx-auto max-w-7xl">
      <article className="mb-3">
        <h1 className="text-lg font-medium text-primary-blue">
          Dev Team Task Chart
        </h1>
      </article>
      <article className="flex flex-col space-x-10">
        <div className="flex justify-start space-x-3 md:justify-center">
          <button
            onClick={() => handleButtonClick("status")}
            className={`${activeButton === "status" ? "bg-secondary-silver text-primary-blue" : "text-secondary-gray"} py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-start hover:bg-secondary-silver`}
          >
            Check by status
          </button>
          <button
            onClick={() => handleButtonClick("priority")}
            className={`${activeButton === "priority" ? "bg-secondary-silver text-primary-blue" : "text-secondary-gray"} py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-start hover:bg-secondary-silver`}
          >
            Check by priority
          </button>
        </div>
        <div className="flex">
          {columns.length > 0 && (
            <PieChart
              series={[
                {
                  data: getData(),
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 360,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={400}
              height={300}
            />
          )}
        </div>
      </article>
    </section>
  );
};

export default ChartPage;
