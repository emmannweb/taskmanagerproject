import { Box, Typography } from "@mui/material";
import profile from "../../images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import headerProfile from "../../images/header-profile2.jpg";
import { useEffect, useMemo } from "react";
import Loader from "../../components/Loader";
import { useTheme } from "@emotion/react";
import { userProfileAction } from "../../redux/actions/userActions";

const UserDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);
  const { user, loading } = useSelector((state) => state.profile);
  const { palette } = useTheme();
  const memoizedImg = useMemo(() => headerProfile, []);
  return (
    <>
      {loading ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      ) : user && user !== null ? (
        <>
          <Box
            sx={{
              bgcolor: palette.secondary.main,
              borderRadius: "10px",
              minHeight: "180px",
              backgroundImage: `url(${memoizedImg})`,
            }}
          ></Box>
          <Box
            sx={{
              maxWidth: "70%",
              margin: "auto",
              bgcolor: palette.secondary.main,
              p: 3,
              marginTop: "-50px",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ maxWidth: "15%", borderRadius: "50%" }}
                  src={profile}
                  alt="imagem de perfil"
                />
              </Box>
              <Box sx={{ pt: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    fontWeight: 300,
                    color: "#c1c1c1",
                  }}
                >
                  {user?.firstName}
                </Typography>
              </Box>
              <Box sx={{ pt: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: 300,
                    color: "#c1c1c1",
                  }}
                >
                  E-mail: {user?.email}
                </Typography>
              </Box>
              <Box sx={{ pt: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: 300,
                    color: "#c1c1c1",
                  }}
                >
                  Membro desde: {moment(user?.createdAt).format("DD/MM/YYYY")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserDashboard;
