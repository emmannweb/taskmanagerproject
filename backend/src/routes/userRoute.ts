import express from "express";
const router = express.Router();

var {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");
var { isAuthenticated, isAdmin } = require("../middleware/auth");

//user routes

router.get("/allusers", isAuthenticated, isAdmin, allUsers); // /api/allusers
router.get("/user/:id", isAuthenticated, singleUser); // /api/user/id
router.put("/user/edit/:id", isAuthenticated, editUser); // /api/user/edit/id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser); // /api/admin/user/delete/id

module.exports = router;
