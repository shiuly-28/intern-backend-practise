import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { catchhAsync } from "../../utils/catchAsync.js";
import { apiResponse } from "../../utils/apiResponse.js";

const login = catchhAsync((req: Request, res: Response) => {
    const {email, password} = req.body;
})

const result = (req : Request, res : Response) => {
    const {email, password} = req.body;

    const result = authService.login({email, password})
    // res.send({
    //     success: true,
    //     message: "login success full",
    //     data: result
    // })

    apiResponse.success(res, result, "login successfull")
}


export const authControler = {
    login
}