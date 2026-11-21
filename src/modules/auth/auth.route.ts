import { Router } from "express";
import { authService } from "./auth.service.js";
import validateRequest from "../../middleware/validateRequest.js";
import { UserValidation } from "./auth.validate.js";
import { authControler } from "./auth.controller.js";

const route: Router = Router();

route.post('/login', authService.login)
route.post("/register",
    validateRequest(UserValidation.createUserValidationSchema),
    authControler.registerUser
)

export const authRouter = route;