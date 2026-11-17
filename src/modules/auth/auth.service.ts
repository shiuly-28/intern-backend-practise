import { Request, Response } from "express"
import { Ilogin } from "./auth.types.js"

const login = (payload : Ilogin) => {
    const {email, password} = payload

    const user = {
        name : "shiuly",
        email : "shiuly@gmail.com",
        password : "123456"
    }

    if(user.email !== email) throw new Error ("User not found")

    if(user.password !== password) throw new Error ("Wrong Pass")

    return user;

}


export const authService = {
    login
}