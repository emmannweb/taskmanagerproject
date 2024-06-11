import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

const PriorityDropDown = ({ handleChangePriority, priority }) => {
  const { setUniquePriority } = useSelector((state) => state.loadTasks);

  const { palette } = useTheme();

  return (
    <Box sx={{ minWidth: 120, pt: 2 }}>
      <FormControl fullWidth>
        <Select
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: palette.secondary.main,
                  color: "#fafafa",
                },
              },
            },
          }}
          // labelStyle={{ color: "#00ffff" }}
          sx={{
            color: "#fafafa",
            "&:before": {
              borderColor: "var(--galaxy-blue)",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          // label="Priority"
          onChange={handleChangePriority}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {setUniquePriority &&
            setUniquePriority.map((val, id) => (
              <MenuItem key={id} value={val}>
                {val}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PriorityDropDown;
