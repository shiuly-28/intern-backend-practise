import { PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from "../config/.env.config.js";
import {r2Client} from '../config/r2.js'
import sharp from 'sharp';
import crypto from 'crypto';

export type ImageFolder = 'products' | 'avatar' | 'profile';

export interface UploadOptions {
  folder: ImageFolder;
  entityId?: string;
}

export interface UploadResult {
  key: string;
  url: string;
}

export const processAndUpload = async (
  buffer: Buffer,
  options: UploadOptions
): Promise<UploadResult> => {
  // 1. Optimize & convert image to WebP using Sharp
  const processedBuffer = await sharp(buffer)
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toBuffer();

  // 2. Build unique R2 object key
  const fileName = `${crypto.randomUUID()}.webp`;

  const key = options.entityId
    ? `${options.folder}/${options.entityId}/${fileName}`
    : `${options.folder}/${fileName}`;

  // 3. Upload to Cloudflare R2 (note capital 'K' in Key)
  await r2Client.send(
    new PutObjectCommand({
      Bucket: env.r2_bucketName,
      Key: key,
      Body: processedBuffer,
      ContentType: 'image/webp',
    })
  );

  // 4. Construct public URL
  const baseUrl = env.r2_publicUrl.replace(/\/+$/, '');
  const url = `${baseUrl}/${key}`;

  return {
    key,
    url,
  };
};