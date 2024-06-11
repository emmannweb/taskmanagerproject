import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { taskLoadAction } from "../redux/actions/taskAction";
import { useState } from "react";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const TaskCard = ({ id, title, description, stage, priority, attributed }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState([]);
  const [priorities, setPriorities] = useState("todos");

  const { userInfo } = useSelector((state) => state.signIn);

  const deleteTaskMethod = async (id) => {
    try {
      const res = await axios.delete(`/api/task/delete/${id}`);
      toast.success('tarefa deletada.')

    } catch (error) {
      console.log(error)
    }
  }


  const deleteTaskById = (id, title) => {
    if (id) {

      Swal.fire({
        title: 'Deseja excluir a tarefa abaixo?',
        html: `${title} `,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: "Cancelar",
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
          title: 'title-alert',
          // html: 'html-style'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          deleteTaskMethod(id)
          dispatch(taskLoadAction(page, keyword, checked, priorities));
          console.log('event confirmed')
        } else if (result.isDismissed) {
          //Swal.fire('Changes are not saved', '', 'info')
          console.log('event canceled')
          return '';
        }
      })
    }
  }



  return (
    <Card
      sx={{
        minWidth: 275,
        mb: 2,
        mt: 2,
        bgcolor: palette.primary.main,
        border: "1px solid oklch(0.382774 0.071686 233.169)",
        position: 'relative'
      }}
    >
      {
        userInfo && userInfo?.role === 'admin' ?
          <>

            <Box sx={{ position: 'absolute', top: '10px', right: '30px' }}>
              <Link to={`/admin/edit/task/${id}`}>
                <IconButton aria-label="edit">
                  <EditIcon sx={{ color: palette.yellow2 }} />
                </IconButton>
              </Link>
              <IconButton aria-label="deletar" onClick={() => deleteTaskById(id, title)}>
                <DeleteIcon sx={{ color: 'red', ml: '10px' }} />
              </IconButton>
            </Box>
          </>
          :
          userInfo && userInfo?.role === 'user' && userInfo?.id === attributed ?
            <>
              <Box sx={{ position: 'absolute', top: '10px', right: '30px' }}>

                <Link to={`/user/edit/task/${id}`}>
                  <IconButton aria-label="edit">
                    <EditIcon sx={{ color: palette.yellow2 }} />
                  </IconButton>
                </Link>
              </Box>
            </>
            :
            ''
      }
      <CardContent>
        <Typography
          sx={{ fontSize: "12px", color: "#fafafa", fontWeight: 500 }}
          gutterBottom
        >
          Prioridade{" "}
          <IconButton>
            <FlagCircleIcon
              sx={{
                color:
                  priority && priority === "high"
                    ? "#ff0000"
                    : priority === "medium"
                      ? "#ff9900"
                      : priority === "normal"
                        ? palette.yellow1
                        : "#007fff",
                fontSize: 14,
              }}
            />
          </IconButton>
        </Typography>

        <Typography variant="h6" sx={{ color: "#00689d" }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: "#f5f5f5" }}>
          <Box component='span' dangerouslySetInnerHTML={{ __html: description?.split(" ").slice(0, 15).join(" ") }}></Box>
        </Typography>

        <Typography sx={{ color: palette.yellow2, fontSize: "12px" }}>
          <Box component="span" sx={{ color: "#fafafa" }}>
            Estado:{" "}
          </Box>{" "}
          {stage && stage === "created"
            ? "Criada"
            : stage === "inProgress"
              ? "Em progresso"
              : "Concluída"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
