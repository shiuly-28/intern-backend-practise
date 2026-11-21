import  express, { Application, Request, Response }  from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import { notFound } from './middleware/notFound.js';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';
import routes from './route.js';


export const app : Application = express();

app.use(cors({}))
app.use(express.json())
app.use(cookieParser())

//urlecorded
app.use(express.urlencoded({extended: true}))   


app.use('/api/v1', routes)

app.get("/", (req : Request, res: Response) => {
     res.send({
        success: true,
        message: "Server is running on port 5000"
    })
})

app.use(notFound)

app.use(globalErrorHandler);