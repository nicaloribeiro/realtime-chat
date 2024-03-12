import { Router } from "express";
import UserController from "./user-controller.js";

export const AccountRouter = new Router();
export const UserRouter = new Router();

AccountRouter.post("/register", UserController.create);
AccountRouter.post("/login", UserController.login);
UserRouter.get("/find/:searchTerm", UserController.findUserByTerm);