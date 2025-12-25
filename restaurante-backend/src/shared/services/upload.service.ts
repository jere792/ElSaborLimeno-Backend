// src/shared/services/upload.service.ts

import cloudinary from '../config/cloudinary.config.js';
import { UploadApiResponse } from 'cloudinary';

export interface UploadResult {
  success: boolean;
  url?: string;
  public_id?: string;
  message?: string;
}

export class UploadService {
  
  /**
   * Sube una imagen a Cloudinary desde un buffer
   * @param fileBuffer Buffer del archivo
   * @param folder Carpeta en Cloudinary (ej: 'usuarios/perfiles')
   * @param fileName Nombre del archivo (opcional)
   */
  async uploadImage(
    fileBuffer: Buffer,
    folder: string = 'uploads',
    fileName?: string
  ): Promise<UploadResult> {
    try {
      // Convertir buffer a base64
      const base64Image = `data:image/png;base64,${fileBuffer.toString('base64')}`;

      // Subir a Cloudinary
      const result: UploadApiResponse = await cloudinary.uploader.upload(base64Image, {
        folder: folder,
        public_id: fileName,
        resource_type: 'image',
        transformation: [
          { width: 500, height: 500, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });

      return {
        success: true,
        url: result.secure_url,
        public_id: result.public_id
      };
    } catch (error: any) {
      console.error('Error uploading to Cloudinary:', error);
      return {
        success: false,
        message: error.message || 'Error al subir imagen'
      };
    }
  }

  /**
   * Elimina una imagen de Cloudinary
   * @param publicId ID público de la imagen en Cloudinary
   */
  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Error deleting from Cloudinary:', error);
      return false;
    }
  }

  /**
   * Extrae el public_id de una URL de Cloudinary
   * @param url URL completa de Cloudinary
   */
  extractPublicId(url: string): string | null {
    try {
      // Ejemplo: https://res.cloudinary.com/demo/image/upload/v1234/folder/image.jpg
      // Retorna: folder/image
      const regex = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      return null;
    }
  }
}
