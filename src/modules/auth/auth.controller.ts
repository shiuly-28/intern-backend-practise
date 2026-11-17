import { Request, Response } from "express";
import { authService } from "./auth.service.js";

const login = (req : Request, res : Response) => {
    const {email, password} = req.body;

    const result = authService.login({email, password})
    res.send({
        success: true,
        message: "login success full",
        data: result
    })
}

export const authControler = {
    login
}