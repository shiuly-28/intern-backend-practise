
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
})


export const env = {
    port: process.env.PORT || 5000,
    node_environment: process.env.NODE_ENVIRONMENT as string,
    database_url: process.env.DATABASE_URL as string,
     smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS,
    smtp_from: process.env.SMTP_FROM,
}