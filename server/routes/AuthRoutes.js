import { Router } from "express";
import {
  addProfileImage,
  getUserInfo,
  login,
  signup,
  updateprofile,
  removeProfileImage,
  logout,
} from "../controller/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddelware.js";
import multer from "multer";

const authRoutes = Router();
const uploads = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateprofile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  uploads.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.post("/logout", logout);
export default authRoutes;
