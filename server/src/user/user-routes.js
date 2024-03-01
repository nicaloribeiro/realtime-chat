import { Router } from "express";
import UserController from "./user-controller.js";

const UserRouter = Router();

UserRouter.post("/register", UserController.create);

export default UserRouter;
