import app from "./app.js";
import { env} from "./config/.env.config.js"



const boostrap = () => {
    const server = app.listen(env.port, () => {
        console.log(process.cwd())
    console.log(`Server is running on port ${env.port}...`);
})

const handelSignal = () => {
    server.close(() => {
        process.exit(1)
    })
}


process.on('SIGTERM', handelSignal)
process.on('SIGINT', handelSignal)

const handelError = ((err : unknown) => {
    server.close(() => {
        process.exit(0)
    })
})

process.on('unhandledRejection', handelError);
process.on('uncaughtException', handelError)

}

boostrap();
