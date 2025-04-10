import { useDashboardContext } from "@/contexts/dashboard/DashboardContext";
const CreateTaskButton = () => {
  const { handleSetActionDialogTask } = useDashboardContext();
  return (
    <button
      onClick={() => handleSetActionDialogTask(true)}
      className="py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver"
    >
      Create new task
    </button>
  );
};

export default CreateTaskButton;
