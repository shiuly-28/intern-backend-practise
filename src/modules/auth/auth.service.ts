import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import { Ilogin, RegisterUser } from "./auth.types.js"
import { ApiError } from "../../utils/apiError.js"
import { prisma } from '../../config/prisma.config.js';
import {sendEmail} from '../../utils/email/sendEmail.js'
import { welcomeEmailTemplate } from '../../utils/email/emailTemplates.js';
import {uploadImage} from '../../utils/imgeUpload.js'

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
const registerUser = async(payload: RegisterUser, avatarBuffer? : Buffer) => {

    let avatarKey : string | null = null;
    let avatarUrl : string | null = null;

    if (avatarBuffer) {
        const uploaded = await uploadImage(avatarBuffer, { folder: "avatar"})
        avatarKey = uploaded.key;
        avatarUrl = uploaded.url;
    }

    const isExistUser = await prisma.user.findUnique({
        where: {email: payload.email}
    });

    if(isExistUser){
        throw new ApiError(StatusCodes.CONFLICT, "User already exist")
    }
    const hashedPasssword = await bcrypt.hash(payload.password, 10)

    //update to  db
    const newUser = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPasssword,
            avatarKey,
            avatarUrl,
        },
        omit: {
            password: true
        },
    });
    console.log("User Register Successfully")

    // send welcome email
    try{
        await sendEmail({
            to:newUser.email,
            subject: "welcome to Rise Tgether",
            html: welcomeEmailTemplate(newUser.name),
        });
        console.log("email send successfully....")
    }catch(error){
        console.log("email send error: ", error)
    }
    return newUser
}

export const authService = {
    login,
    registerUser
}