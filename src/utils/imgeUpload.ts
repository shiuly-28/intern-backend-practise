import { processAndUpload, UploadOptions, UploadResult} from './r2Storage.js'

export  const  uploadImage = (
buffer: Buffer,
options: UploadOptions

) : Promise<UploadResult>=>{
return processAndUpload(
    buffer,
    options
)
}