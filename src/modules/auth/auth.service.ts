import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import { Ilogin, RegisterUser } from "./auth.types.js"
import { ApiError } from "../../utils/apiError.js"
import { prisma } from '../../config/prisma.config.js';

const login = (payload : Ilogin) => {
    const {email, password} = payload

   const user = {
    "name": "Refat",
  "email": "refat@gmail.com",
  "password": "password123"
}

    if(user.email !== email) throw new ApiError (404, "User not found")

    if(user.password !== password) throw new ApiError (404, "Wrong Pass")

    return user;

}

// register
const registerUser = async(payload: RegisterUser) => {

    const isExistUser = await prisma.user.findUnique({
        where: {email: payload.email}
    });

    if(isExistUser){
        throw new ApiError(StatusCodes.CONFLICT, "User already exist")
    }
    const hashedPasssword = await bcrypt.hash(payload.password, 10)

    const newUser = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPasssword,
        },
        omit: {
            password: true
        }
    });
    return newUser
}

export const authService = {
    login,
    registerUser
}