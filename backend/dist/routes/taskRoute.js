"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
var { createTask, showTasks, singleTask, updateTask, deleteTask, myTask, } = require("../controllers/taskController");
var { isAuthenticated, isAdmin } = require("../middleware/auth");
//Task routes
router.post("/task/create", isAuthenticated, isAdmin, createTask); // /api/task/create
router.get("/tasks/all", showTasks); // /api/tasks/all
router.get("/task/:task_id", singleTask); // /api/task/task_id
router.get("/mytask", isAuthenticated, myTask); // /api/mytask
//router.put("/task/edit/:task_id", isAuthenticated, updateTask); // /api/task/edit/task_id
router.put("/admin/task/edit/:task_id", isAdmin, updateTask); // /api/tadmin/ask/edit/task_id
router.delete("/task/delete/:task_id", isAuthenticated, isAdmin, deleteTask); // /api/task/delete/task_id
module.exports = router;
