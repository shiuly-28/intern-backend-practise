import { Response } from "express"

export class apiResponse {
    static success(
        res : Response,
        data : any,
        message : string = 'success',
        statusCode : number = 200
    ){
        return res.status(statusCode).json({
            success: true,
            message,
            data
        })
    }

}