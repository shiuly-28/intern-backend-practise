import { Router } from "express";
import { authRouter } from "./modules/auth/auth.route.js";

const routes: Router = Router()

const modulesRoute = [
    {
        path: "/auth",
        route: authRouter
    }
]
modulesRoute.forEach((route) => routes.use(route.path, route.route))

export default routes;