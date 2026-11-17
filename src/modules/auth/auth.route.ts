import { Router } from "express";
import { authService } from "./auth.service.js";

const route: Router = Router();

route.post('/login', authService.login)

export const authRouter = route;