import { useState } from "react";
import BoardColumn from "@/components/board-column/BoardColumn";

const TabsTasks = ({ columns }) => {
  const [activeTab, setActiveTab] = useState("To Do");
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  const activeColumn = columns.find((column) => column.title === activeTab);
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex py-2 space-x-4 border-b border-secondary-gray">
        {columns.map((column) => (
          <button
            key={column.title}
            onClick={() => handleActiveTab(column.title)}
            className={`${activeTab === column.title ? "bg-secondary-silver" : ""} py-2 px-3 text-sm font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver`}
          >
            {column.title}
          </button>
        ))}
      </div>
      <BoardColumn title={activeColumn.title} tasks={activeColumn.tasks} />
    </div>
  );
};

export default TabsTasks;
