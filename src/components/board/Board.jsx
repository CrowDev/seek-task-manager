import Grid from "@mui/material/Grid";
import BoardColumn from "@/components/board-column/BoardColumn";
import { useDashboardContext } from "@/contexts/dashboard/DashboardContext";

const Board = () => {
  const { columns } = useDashboardContext();
  return (
    <Grid container spacing={3} columns={5}>
      {columns.map((column) => (
        <BoardColumn
          key={column.title}
          title={column.title}
          tasks={column.tasks}
        />
      ))}
    </Grid>
  );
};

export default Board;
