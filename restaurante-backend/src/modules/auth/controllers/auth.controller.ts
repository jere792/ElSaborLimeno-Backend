import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { LoginDto } from '../dtos/login.dto.js';
import { RegistroClienteDto } from '../dtos/registro-cliente.dto.js';

export class AuthController 
{
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try 
    {
      const loginDto = LoginDto.fromRequest(req.body);
      
      const validation = loginDto.validate();
     
      if (!validation.valid) 
      {
        res.status(400).json({ codigo: 0, mensaje: 'Datos inválidos', errores: validation.errors });
        return;
      }

      const result = await this.authService.login(loginDto);
      res.json(result);
    } 
    catch (error: any) 
    {
      const statusCode = error.message.includes('Credenciales') ? 401 : 500;

      res.status(statusCode).json({codigo: 0, mensaje: error.message });
    }
  };

  registroCliente = async (req: Request, res: Response): Promise<void> => {
    try {
      const registroDto = RegistroClienteDto.fromRequest(req.body);
      
      const validation = registroDto.validate();
      if (!validation.valid) 
      {
        res.status(400).json({ codigo: 0, mensaje: 'Datos inválidos', errores: validation.errors });

        return;
      }

      const result = await this.authService.registroCliente(registroDto);
      res.status(201).json(result);

    } 
    catch (error: any) 
    {
      const statusCode = error.message.includes('ya existe') ? 409 : 500;

      res.status(statusCode).json({ codigo: 0, mensaje: error.message });
    }
  };

  verificarToken = async (req: Request, res: Response): Promise<void> => {
    try 
    {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) 
      {
        res.status(401).json({ codigo: 0, mensaje: 'Token no proporcionado' });
        
        return;
      }

      const decoded = this.authService.verifyToken(token);
      res.json({ codigo: 1, mensaje: 'Token válido', data: decoded });
    } 
    catch (error: any) 
    {
      res.status(401).json({ codigo: 0, mensaje: 'Token inválido o expirado' });
    }
  };
}
