import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Loader from "../../components/Loader";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userSignUpAction } from "../../redux/actions/userActions";

const validationSchema = yup.object({
  firstName: yup
    .string("Coloque seu nome")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .required("Nome é obrigatório"),
  lastName: yup
    .string("Coloque seu sobrenome")
    .min(3, "sobrenome deve ter no mínimo 3 caracteres")
    .required("Nome é obrigatório"),
  email: yup
    .string("Digite seu e-mail")
    .email("Entre com um email válido")
    .required("O e-mail é obrigatório"),
  password: yup
    .string("Coloque sua senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
});

const Register = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, userInfo } = useSelector(
    (state) => state.signIn
  );
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignUpAction(values));
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  // handle input show off password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //end of handle input show off password

  return (
    <>
      <Header />

      <Box
        sx={{
          bgcolor: "oklch(0.27642 0.055827 233.809)",
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c1c1c1",
        }}
      >
        <Box
          sx={{
            bgcolor: palette.primary.main,
            p: "20px 40px",
            border: "1px solid oklch(0.382774 0.071686 233.169)",
            maxWidth: "500px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#c1c1c1",
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              pb: 2,
            }}
          >
            cadatrar
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              inputProps={{
                autoComplete: "off",
              }}
              FormHelperTextProps={{
                style: { backgroundColor: "transparent" },
              }}
              sx={{
                mb: 3,
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
              id="firstName"
              name="firstName"
              placeholder="Nome"
              autoFocus
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              inputProps={{
                autoComplete: "off",
              }}
              FormHelperTextProps={{
                style: { backgroundColor: "transparent" },
              }}
              sx={{
                mb: 3,
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
              id="lastName"
              name="lastName"
              placeholder="sobrenome"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            <TextField
              inputProps={{
                autoComplete: "off",
              }}
              FormHelperTextProps={{
                style: { backgroundColor: "transparent" },
              }}
              sx={{
                mb: 3,
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
              id="email"
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              FormHelperTextProps={{
                style: {
                  backgroundColor: palette.primary.main,
                  margin: 0,
                  paddingLeft: "15px",
                },
              }}
              sx={{
                background: "#eee",

                mb: 1,
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
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Senha"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                mb: 2,
                borderRadius: "10px",
                bgcolor: palette.yellow2,
                color: palette.primary.main,
                transition: "all ease 1s",
                "&:hover": { bgcolor: palette.yellow2, opacity: 0.8 },
              }}
              disabled={loading}
            >
              {loading ? <Loader /> : "Entrar"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/login"
                  variant="body2"
                  style={{
                    color: "oklch(0.382774 0.071686 233.169)",
                    textDecoration: "none",
                  }}
                >
                  {"ja tem conta? Login"}
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Register;
