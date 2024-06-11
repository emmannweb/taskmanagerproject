import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Pagination, Stack } from "@mui/material";
import { taskLoadAction } from "../../redux/actions/taskAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TaskCard from "../../components/TaskCard";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const AdminShowTask = () => {
  const { palette } = useTheme();
  const { tasks, stages, loading, pages } = useSelector(
    (state) => state.loadTasks
  );

  const dispatch = useDispatch();

  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState([]);
  const [priority, setPriority] = useState("todos");

  useEffect(() => {
    dispatch(taskLoadAction(page, keyword, checked, priority));
  }, [page, keyword, checked, priority, dispatch]);

  return (
    <>
      <Box sx={{ bgcolor: palette.secondary.main, pt: 3, pb: 3, pr: 2, pl: 2 }}>
        <h1 style={{ color: "#fafafa" }}>Listagem das tarefas</h1>
        <Box sx={{ pb: 2, pr: 1, display: "flex", justifyContent: "right" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: palette.yellow2,
              color: palette.primary.main,
              transition: "all ease 1s",
              "&:hover": { bgcolor: palette.yellow2, opacity: 0.8 },
            }}
            startIcon={<AddIcon />}
          >
            {" "}
            <Link
              to="/admin/create/task"
              style={{ color: palette.primary.main, textDecoration: "none" }}
            >
              {" "}
              Criar Tarefa
            </Link>
          </Button>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          // columns={{ xs: 6, sm: 8, md: 12 }}
        >
          {loading ? (
            <Box
              sx={{
                minHeight: "500px",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : tasks && tasks.length === 0 ? (
            <>
              <Box
                sx={{
                  minHeight: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "#c1c1c1" }}>
                  Nenhum resultado encontrado!
                </h2>
              </Box>
            </>
          ) : (
            tasks &&
            tasks.map((task) => (
              <Grid item xs={12} sm={6} key={task._id}>
                <TaskCard
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  stage={task.stage}
                  priority={task.priority}
                />
              </Grid>
            ))
          )}
        </Grid>

        <Stack spacing={2}>
          <Pagination
            sx={{ button: { color: palette.yellow2 } }}
            variant="outlined"
            page={page}
            count={pages === 0 ? 1 : pages}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      </Box>
    </>
  );
};

export default AdminShowTask;
