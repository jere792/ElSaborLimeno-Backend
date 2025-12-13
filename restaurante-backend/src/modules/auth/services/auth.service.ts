import { AuthDao } from '../dao/auth.dao.js';
import { LoginDto } from '../dtos/login.dto.js';
import { RegistroClienteDto } from '../dtos/registro-cliente.dto.js';
import { signToken, verifyToken as verifyJWT } from '../../../shared/config/jwt.config.js';

export class AuthService {
  private authDao: AuthDao;

  constructor() {
    this.authDao = new AuthDao();
  }

  async login(loginDto: LoginDto) 
  {
    const result = await this.authDao.login(loginDto.email, loginDto.password);

    if (result.codigo === 0) 
    {
      throw new Error(result.mensaje);
    }

    const token = signToken({
      id: result.usuario!.id_usuario,
      email: result.usuario!.email,
      id_rol: result.usuario!.id_rol
    });

    return {
      mensaje: result.mensaje,
      token,
      usuario: {
        id: result.usuario!.id_usuario,
        nombres: result.usuario!.nombres,
        apellidos: result.usuario!.apellidos,
        email: result.usuario!.email,
        telefono: result.usuario!.telefono,
        direccion: result.usuario!.direccion,
        id_rol: result.usuario!.id_rol,
        fecha_registro: result.usuario!.fecha_registro
      }
    };
  }

  async registroCliente(registroDto: RegistroClienteDto) 
  {
      const result = await this.authDao.registroCliente({
        nombres: registroDto.nombres,
        apellidos: registroDto.apellidos,
        email: registroDto.email,
        clave: registroDto.password,
        telefono: registroDto.telefono
      });

      if (result.codigo === 0) 
      {
        throw new Error(result.mensaje);
      }

      const token = signToken({
        id: result.id_usuario,
        email: registroDto.email,
        id_rol: 5
      });

      return {
        mensaje: result.mensaje,
        token,
        usuario: {
          id: result.id_usuario,
          nombres: registroDto.nombres,
          apellidos: registroDto.apellidos,
          email: registroDto.email,
          telefono: registroDto.telefono,
          id_rol: 5
        }
      };
  }

  verifyToken(token: string) 
  {
    try {
      const decoded = verifyJWT(token);
      
      return {
        id: decoded.id,
        email: decoded.email,
        id_rol: decoded.id_rol
      };
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}
