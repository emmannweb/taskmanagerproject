"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
var { allUsers, singleUser, editUser, deleteUser, } = require("../controllers/userController");
var { isAuthenticated, isAdmin } = require("../middleware/auth");
//user routes
router.get("/allusers", isAuthenticated, isAdmin, allUsers); // /api/allusers
router.get("/user/:id", isAuthenticated, singleUser); // /api/user/id
router.put("/user/edit/:id", isAuthenticated, editUser); // /api/user/edit/id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser); // /api/admin/user/delete/id
module.exports = router;
