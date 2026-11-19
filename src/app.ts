import  express, { Application, Request, Response }  from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import { authRouter } from './modules/auth/auth.route.js';


const app : Application = express();

app.use(cors({}))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRouter)

app.get("/", (req : Request, res: Response) => {
    res.send("Server is running")
})

export default app;