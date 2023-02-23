import { Router } from "express";
import {
  createUser,
  loginUser,
} from "../../controllers/usersControllers/usersControllers.js";
import multer from "multer";

const usersRouter = Router();
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
export const upload = multer({ storage });

usersRouter.post("/login", loginUser);
usersRouter.post("/create", upload.single("avatar"), createUser);

export default usersRouter;
