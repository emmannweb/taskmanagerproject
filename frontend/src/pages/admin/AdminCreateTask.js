import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../utils/moduleToolbar";
import { useTheme } from "@emotion/react";
import { allUserAction } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
  title: yup
    .string("Adicione um título da tarefa")
    .min(4, "o título deve ter no mínimo 10 caracteres ")
    .required("título obrigatório"),
  description: yup
    .string("Adicione conteúdo de texto")
    .min(10, "o conteúdo do texto deve ter no mínimo 10 caracteres ")
    .required("o conteúdo do texto é obrigatório"),
  attributed: yup
    .string("Adicione usuário para essa tarefa")
    .required("obrigatório"),
});

const AdminCreateTask = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { loading, setLoading } = useState(false);

  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch]);

  const { users } = useSelector((state) => state.allUsers);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "normal",
      stage: "created",
      attributed: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createNewTask(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const createNewTask = async (values) => {
    try {
      // setLoading(true);
      const { data } = await axios.post("/api/task/create", values);
      console.log(data);
      toast.success("Tarefa criada");
      // setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: palette.secondary.main,
          p: { xs: "20px 15px", sm: "20px 50px", lg: "30px 150px" },
        }}
      >
        <Typography variant="h4" sx={{ pb: 4, color: "#c1c1c1" }}>
          {" "}
          Criar tarefa{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box component="span" sx={{ color: palette.yellow2 }}>
            *título da tarefa
          </Box>
          <TextField
            inputProps={{
              autoComplete: "off",
            }}
            FormHelperTextProps={{
              style: { backgroundColor: "transparent" },
            }}
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              input: {
                background: "#eee",
              },
            }}
            fullWidth
            id="title"
            //label="título da tarefa"
            name="title"
            placeholder="Título da tarefa"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />

          <Box component="span" sx={{ color: palette.yellow2 }}>
            *conteudo da tarefa
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <ReactQuill
              theme="snow"
              placeholder={"Escreve o conteudo da tarefa..."}
              modules={modules}
              value={values.description}
              onChange={(e) => setFieldValue("description", e)}
            />
            <Box
              component="span"
              sx={{
                color: "#d32f2f",
                fontSize: "12px",
                pl: 2,
              }}
            >
              {touched.description && errors.description}
            </Box>
          </Box>

          <Box component="span" sx={{ color: palette.yellow2 }}>
            escolher a prioridade da tarefa
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                fullWidth
                labelId="priority"
                id="demo-select-small"
                name="priority"
                placeholder="Select address"
                //label="Prioridade"
                value={values.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.priority && Boolean(errors.priority)}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component="span" sx={{ color: palette.yellow2 }}>
            Escolher o estado da tarefa
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                fullWidth
                labelId="stage"
                id="demo-select-small"
                name="stage"
                value={values.stage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.stage && Boolean(errors.stage)}
              >
                <MenuItem value="created">Criada</MenuItem>
                <MenuItem value="inProgress">Em progresso</MenuItem>
                <MenuItem value="completed">Concluida</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component="span" sx={{ color: palette.yellow2 }}>
            Atribuir alguem para essa tarefa
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                fullWidth
                labelId="attributed"
                id="demo-select-small"
                name="attributed"
                value={values.attributed}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.attributed && Boolean(errors.attributed)}
              >
                {users &&
                  users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{
              mt: 3,
              p: 1.5,
              mb: 2,
              borderRadius: "25px",
              bgcolor: palette.yellow2,
              color: palette.primary.main,
              "&:hover": { color: "white" },
            }}
            disabled={loading}
          >
            Criar tarefa
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdminCreateTask;
