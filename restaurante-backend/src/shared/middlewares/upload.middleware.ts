// src/shared/middlewares/upload.middleware.ts

import multer from 'multer';
import { Request } from 'express';

// Configurar multer para almacenar en memoria
const storage = multer.memoryStorage();

// Filtro para solo permitir imágenes
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Permitir solo imágenes
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen (jpg, png, gif, webp)'));
  }
};

// Configurar límites
const limits = {
  fileSize: 5 * 1024 * 1024 // 5MB máximo
};

export const uploadSingle = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
}).single('foto_perfil'); // Campo esperado en el form

export const uploadMultiple = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
}).array('imagenes', 10); // Hasta 10 imágenes
