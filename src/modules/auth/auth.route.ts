import { Router } from "express";
import {upload} from '../../middleware/r2_middelware.js'
import validateRequest from "../../middleware/validateRequest.js";
import { UserValidation } from "./auth.validate.js";
import { authControler } from "./auth.controller.js";

const route: Router = Router();

route.post('/login', authControler.login)
route.post("/register",
    upload.single("avatar"),
    validateRequest(UserValidation.createUserValidationSchema),
    authControler.registerUser
)

export const authRouter = route;