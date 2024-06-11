import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { taskLoadAction } from "../../redux/actions/taskAction";
import {
  Box,
  Card,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ListCheck from "../../components/ListCheck";
import Loader from "../../components/Loader";
import TaskCard from "../../components/TaskCard";
import { useTheme } from "@emotion/react";
import SearchBox from "../../components/SearchBox";
import PriorityDropDown from "../../components/PriorityDropDown";

const Home = () => {
  const { palette } = useTheme();
  const { tasks, stages, loading, pages } = useSelector(
    (state) => state.loadTasks
  );

  const dispatch = useDispatch();

  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  //get array values from status
  const [checked, setChecked] = useState([]);
  const [priority, setPriority] = useState("todos");

  useEffect(() => {
    dispatch(taskLoadAction(page, keyword, checked, priority));
  }, [page, keyword, checked, priority, dispatch]);

  //handle project status toggle
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  // clear category filter
  const clearCategoryFilter = () => {
    setChecked([]);
  };

  //priority handle change
  const handleChangePriority = (e) => {
    setPriority(e.target.value);
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          bgcolor: "oklch(0.27642 0.055827 233.809)",
          minHeight: "calc(100vh - 140px)",
        }}
      >
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 2, p: 2 }}>
              <Card
                sx={{
                  minWidth: 150,
                  mb: 3,
                  mt: 2,
                  p: 2,
                  bgcolor: palette.primary.main,
                  elevation: 0,
                  border: "1px solid oklch(0.382774 0.071686 233.169)",
                }}
              >
                <SearchBox />
              </Card>

              <Card
                sx={{
                  minWidth: 150,
                  mb: 3,
                  mt: 3,
                  p: 2,
                  bgcolor: palette.primary.main,
                  elevation: 0,
                  border: "1px solid oklch(0.382774 0.071686 233.169)",
                }}
              >
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                  >
                    Filrar por prioridades
                  </Typography>
                  <PriorityDropDown
                    handleChangePriority={handleChangePriority}
                    priority={priority}
                  />
                </Box>
              </Card>

              <Card
                sx={{
                  minWidth: 150,
                  mb: 3,
                  mt: 3,
                  p: 2,
                  bgcolor: palette.primary.main,
                  elevation: 0,
                  border: "1px solid oklch(0.382774 0.071686 233.169)",
                }}
              >
                <Box>
                  <Typography
                    component="h4"
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                  >
                    Filtrar por estado
                  </Typography>

                  {checked.length > 0 ? (
                    <Box
                      onClick={clearCategoryFilter}
                      sx={{
                        color: palette.yellow2,
                        fontSize: "small",
                        cursor: "pointer",
                        "&:hover": { color: palette.yellow2 },
                        mb: "-3px",
                      }}
                      component="div"
                    >
                      <ArrowBackIosIcon
                        sx={{
                          fontSize: "small",
                          pt: "3px",
                          color: palette.yellow2,
                        }}
                      />{" "}
                      Limpar
                    </Box>
                  ) : (
                    ""
                  )}

                  <ListCheck
                    stages={stages && stages}
                    handleToggle={handleToggle}
                    checked={checked}
                  />
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>
              {loading ? (
                <Box
                  sx={{
                    minHeight: "calc(100vh - 210px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                tasks.map((task, i) => (
                  <TaskCard
                    key={i}
                    id={task._id}
                    title={task.title}
                    description={task.description}
                    stage={task.stage}
                    priority={task.priority}
                    attributed={task?.attributed?._id}
                  />
                ))
              )}
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
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Home;
