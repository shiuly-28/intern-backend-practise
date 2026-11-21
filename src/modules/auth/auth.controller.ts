import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { apiResponse } from "../../utils/apiResponse.js";

const login = catchAsync((req: Request, res: Response) => {
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


const registerUser = catchAsync(async (req: Request, res: Response)=> {
    const result = await authService.registerUser(req.body)
    apiResponse.success(res, result, "Res=gister Succesfull")
})
export const authControler = {
    login,
    registerUser
}