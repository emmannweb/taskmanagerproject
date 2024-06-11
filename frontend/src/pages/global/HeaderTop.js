import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useProSidebar } from "react-pro-sidebar";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { userLogoutAction } from "../../redux/actions/userActions";

const HeaderTop = () => {
  const { collapseSidebar } = useProSidebar();
  const { palette } = useTheme();
  //const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    //dispatch(userProfileAction());
  }, []);

  //handle seller dashboard dropdown menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //log out
  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={1}
      // sx={{ bgcolor: "white" }}
    >
      <Box display="flex">
        <IconButton
          onClick={() => collapseSidebar()}
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, color: "oklch(0.382774 0.071686 233.169)" }}
        >
          <MenuIcon />
        </IconButton>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor="tertiairy.white"
          borderRadius="3px"
        ></Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, pr: 1 }}>
          <Avatar
            alt="imagem de perfil"
            //src={user && user.avatar ? user.avatar.url : profileImg}
          />
        </IconButton>
        {/* </Tooltip> */}
        <Menu
          sx={{
            mt: "45px",
            "& .MuiMenu-paper": { backgroundColor: "tertiairy.white" },
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={logOut}>
            <Typography
              sx={{ color: palette.secondaryToPrimary }}
              textAlign="center"
            >
              Log Out
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default HeaderTop;
