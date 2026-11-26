import { S3Client } from '@aws-sdk/client-s3';
import { env } from './.env.config.js';



export const r2Client = new S3Client({
  region: 'auto', // R2 requires 'auto'
  endpoint: `https://${env.r2_accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.r2_accessKeyId,
    secretAccessKey: env.r2_secretAccessKey,
  },
});