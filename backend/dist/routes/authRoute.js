"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { signup, signin, logout, userProfile, resetPassword, forgetPassword, } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
//auth routes
router.post("/signup", signup); // /api/signup
router.post("/signin", signin); // /api/signin
router.get("/logout", logout); // /api/logout
router.get("/me", isAuthenticated, userProfile); // /api/me
router.post("/forgetpassword", forgetPassword);
router.put("/resetpassword/:resettoken", resetPassword);
module.exports = router;
