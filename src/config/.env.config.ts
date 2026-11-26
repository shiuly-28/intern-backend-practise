
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


//r2
    r2_accountId: process.env.R2_ACCOUNT_ID as string,
    r2_accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    r2_secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
    r2_apiToken: process.env.R2_API_TOKEN as string,
    r2_endpoint: process.env.R2_ENDPOINT as string,
    r2_bucketName: process.env.R2_BUCKET_NAME as string,
    r2_publicUrl: process.env.R2_PUBLIC_URL as string,
}



