import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
//import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useMemo } from "react";
import { useTheme } from "@emotion/react";

const ListCheck = ({ stages, handleToggle, checked, categ }) => {
  const { palette } = useTheme();
  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {stages &&
        stages.map((cat, id) => {
          const labelId = `checkbox-list-label-${cat.id}`;

          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(cat._id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(cat._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    sx={{
                      color: "#fcca50!important",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${
                    cat?._id === "created"
                      ? "Criada"
                      : cat?._id === "inProgress"
                      ? "Em progresso"
                      : "Concluída"
                  } (${cat.count})`}
                  sx={{ color: "#fafafa" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
};

export default ListCheck;
