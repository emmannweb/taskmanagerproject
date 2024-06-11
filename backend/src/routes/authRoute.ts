import express from "express";
const router = express.Router();

const {
  signup,
  signin,
  logout,
  userProfile,
  resetPassword,
  forgetPassword,
} = require("../controllers/authController");

const { isAuthenticated } = require("../middleware/auth");

//auth routes
router.post("/signup", signup); // /api/signup
router.post("/signin", signin); // /api/signin
router.get("/logout", logout); // /api/logout
router.get("/me", isAuthenticated, userProfile); // /api/me
router.post("/forgetpassword", forgetPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
