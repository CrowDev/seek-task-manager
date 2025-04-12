import { useDashboardContext } from "@/contexts/dashboard/DashboardContext";
import AddIcon from "@mui/icons-material/Add";
const CreateTaskButton = () => {
  const { handleSetActionDialogTask } = useDashboardContext();
  return (
    <button
      onClick={() => handleSetActionDialogTask(true)}
      className="flex py-2 px-3 space-x-2 font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver"
    >
      <AddIcon />
      <span>Create new task</span>
    </button>
  );
};

export default CreateTaskButton;
