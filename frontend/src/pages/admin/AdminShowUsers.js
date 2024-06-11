import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { adminDeleteAction, allUserAction } from "../../redux/actions/userActions";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import Swal from 'sweetalert2';

const AdminShowUsers = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  useEffect(() => {
    dispatch(allUserAction());
  }, []);

  const { users, loading } = useSelector((state) => state.allUsers);
  let data = [];
  data = users !== undefined && users?.length > 0 ? users : [];

  const deleteUserById = (e, id, nome, sobrenome) => {
    if (id) {
      // console.log(id, nome, sobrenome);

      Swal.fire({
        title: 'Deseja excluir o usuário abaixo?',
        html: `Nome:${nome} <br/> Sobrenome: ${sobrenome}`,
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
          dispatch(adminDeleteAction(id));
          dispatch(allUserAction());
          console.log('event confirmed')
        } else if (result.isDismissed) {
          //Swal.fire('Changes are not saved', '', 'info')
          console.log('event canceled')
          return '';
        }
      })
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID do usuário",
      width: 150,
      editable: true,
      headerClassName: "dg-header-style",
    },

    {
      field: "firstName",
      headerName: "Nome",
      width: 150,
      headerClassName: "dg-header-style",
    },
    {
      field: "lastName",
      headerName: "Sobrenome",
      width: 150,
      headerClassName: "dg-header-style",
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 150,
      headerClassName: "dg-header-style",
    },

    {
      field: "role",
      headerName: "Status do usuário",
      headerClassName: "dg-header-style",
      width: 150,
      renderCell: (params) =>
        params.row.role === "admin" ? "Admin" : "Usuario",
    },
    {
      field: "active",
      headerName: "Ativação",
      headerClassName: "dg-header-style",
      width: 150,
      renderCell: (params) =>
        params.row.active === false ? "Não" : "Sim",
    },

    {
      field: "createdAt",
      headerName: "Data de criação",
      width: 150,
      headerClassName: "dg-header-style",
      renderCell: (params) => moment(params.row.createdAt).format("DD/MM/YYYY"),
    },

    {
      field: "Alterar",
      width: 70,
      headerClassName: "dg-header-style",
      renderCell: (value) => (
        <Link to={`/admin/user/edit/${value.row._id}`}>
          <IconButton aria-label="edit">
            <EditIcon sx={{ color: palette.yellow2 }} />
          </IconButton>
        </Link>
      ),
    },
    {
      field: "Deletar",
      width: 70,
      headerClassName: "dg-header-style",
      renderCell: (value) => (
        <IconButton aria-label="delete" onClick={(e) => deleteUserById(e, value.row._id, value.row.firstName, value.row.lastName)}>
          <DeleteSweepIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Todos os usuários
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
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
              to="/admin/create/user"
              style={{ color: palette.primary.main, textDecoration: "none" }}
            >
              {" "}
              Criar usuário
            </Link>
          </Button>
        </Box>
        <Paper sx={{ bgcolor: "secondary.main" }}>
          <Box sx={{ height: 400, width: "100%", bgcolor: "secondary.main" }}>
            <DataGrid
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "#c1c1c1",
                },
                "& .dg-header-style": {
                  backgroundColor: "secondary.main",
                },

                color: "#fafafa",
                [`& .${gridClasses.row}`]: {
                  bgcolor: "secondary.main",
                },
                button: {
                  color: "#fafafa",
                },
              }}
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AdminShowUsers;
