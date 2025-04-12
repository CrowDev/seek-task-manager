import Grid from "@mui/material/Grid";
import BoardColumn from "@/components/board-column/BoardColumn";
import { useDashboardContext } from "@/contexts/dashboard/DashboardContext";
import CircularProgress from "@mui/material/CircularProgress";

const Board = () => {
  const { columns, loading } = useDashboardContext();
  return (
    <Grid container spacing={3} columns={5}>
      {loading ? (
        <div className="flex justify-center p-5 w-full">
          <CircularProgress />
        </div>
      ) : (
        columns.map((column) => (
          <BoardColumn
            key={column.title}
            title={column.title}
            tasks={column.tasks}
          />
        ))
      )}
    </Grid>
  );
};

export default Board;
