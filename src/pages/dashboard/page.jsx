import { DashboardContextProvider } from "@/contexts/dashboard/DashboardContext";
import TaskFormDialog from "@/components/dialog/TaskFormDialog";
import Board from "@/components/board/Board";
import TaskDeleteDialog from "@/components/dialog/TaskDeleteDialog";
import TabsTasks from "@/components/tab-tasks/TabsTasks";
import useBreakpoint from "@/hooks/useBreakpoint";
import CreateTaskButton from "@/components/create-new-task-button/CreateTaskButton";

const DashboardPage = () => {
  const breakpoint = useBreakpoint();

  return (
    <DashboardContextProvider>
      <>
        <section className="mx-auto max-w-7xl">
          <article className="mb-3">
            <h1 className="text-lg font-medium text-primary-blue">
              Dev Team Task Board
            </h1>
          </article>
          <article className="flex justify-between py-2 mb-3 border-b border-secondary-gray">
            <div className="flex space-x-4">
              <button className="py-2 px-3 font-semibold rounded-lg transition-colors hover:cursor-pointer text-secondary-gray hover:bg-secondary-silver">
                Board
              </button>
            </div>
            <CreateTaskButton />
          </article>
          {breakpoint === "desktop" && <Board />}
          {breakpoint === "tablet" && <TabsTasks />}
        </section>
        <TaskFormDialog />
        <TaskDeleteDialog />
      </>
    </DashboardContextProvider>
  );
};

export default DashboardPage;
