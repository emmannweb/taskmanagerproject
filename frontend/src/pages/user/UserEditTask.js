import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { allUserAction } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { singleTask, singleTaskEdit } from "../../redux/actions/taskAction";
import { useParams } from "react-router-dom";



const UserEditTask = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { taskId } = useParams();
    const { loading, setLoading } = useState(false);

    useEffect(() => {
        dispatch(singleTask(taskId));
        dispatch(allUserAction());
    }, [dispatch]);

    const { task } = useSelector((state) => state.singleTask);
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
            _id: task && task._id ? task._id : "",
            stage: task && task.stage ? task.stage : "created",
        },

        // validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            dispatch(singleTaskEdit(values))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });



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
                    Alterar tarefa{" "}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

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
                        Alterar estado da tarefa
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default UserEditTask;
