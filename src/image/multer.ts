import multer, { FileFilterCallback, diskStorage } from 'multer';
import path from 'path';
import { Request } from 'express';

// Define the file filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4', '.mov', '.avi'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Check if the file extension is allowed
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false); 
  }
};

// Multer config for images and videos
const storage = diskStorage({});

const upload = multer({ storage, fileFilter });

export default upload;
