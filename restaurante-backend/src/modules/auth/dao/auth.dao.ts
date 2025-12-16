import { getPool, sql } from '../../../shared/config/db.config.js';
import { Usuario } from '../models/usuario.model.js';

export class AuthDao 
{
  
    private mapToUsuario(data: any): Usuario 
    {
        return new Usuario({
            id_usuario: data.Id_Usuario,
            id_documento: data.Id_Documento ?? null,
            id_rol: data.Id_Roles,
            nombres: data.Nombres,
            apellidos: data.Apellidos,
            email: data.Email,
            clave: '',
            telefono: data.Telefono ?? '',
            fecha_nacimiento: data.Fecha_Nacimiento ?? null,
            genero: data.Genero ?? null,
            fecha_registro: data.Fecha_Registro,
            estado: data.Estado,
            direccion: data.Direccion ?? '',
            reservas_canceladas: data.Reservas_Canceladas,
            reservas_noshow: data.Reservas_NoShow,
            estado_reservas: data.Estado_Reservas
        });
    }

    async login(email: string, clave: string) 
    {
        try 
        {
            const pool = getPool();
            const result = await pool
                .request()
                .input('Email', sql.VarChar(255), email)
                .input('Clave', sql.VarChar(255), clave)
                .execute('SP_Login');

            const data = result.recordset[0];

            if (data.Codigo === 0) 
            {
                return { codigo: 0, mensaje: data.Mensaje };
            }

            return { codigo: 1, mensaje: data.Mensaje, usuario: this.mapToUsuario(data) };
        } 
        catch (error) 
        {
            console.error('Error en AuthDao.login:', error);
            throw new Error('Error al ejecutar login');
        }
    }

    async registroCliente(data: { nombres: string; apellidos: string; email: string;
                            clave: string; telefono?: string;}) 
    {
        try 
        {
            const pool = getPool();
            const result = await pool
                .request()
                .input('Nombres', sql.VarChar(90), data.nombres)
                .input('Apellidos', sql.VarChar(90), data.apellidos)
                .input('Email', sql.VarChar(255), data.email)
                .input('Clave', sql.VarChar(255), data.clave)
                .input('Telefono', sql.Char(15), data.telefono ?? null)
                .execute('SP_Registro_Cliente');

            const { Codigo, Mensaje, Id_Usuario } = result.recordset[0];

            return { codigo: Codigo, mensaje: Mensaje, id_usuario: Id_Usuario };
        } 
        catch (error) 
        {
            console.error('Error en AuthDao.registroCliente:', error);
            throw new Error('Error al registrar cliente');
        }
    }

    async findById(id_usuario: number): Promise<Usuario | null> {
        try 
        {
            const pool = getPool();
            const result = await pool
                .request()
                .input('Id_Usuario', sql.Int, id_usuario)
                .execute('SP_Usuario_Obtener_Id');

            return result.recordset.length > 0 
                ? this.mapToUsuario(result.recordset[0]) 
                : null;
        } 
        catch (error) 
        {
            console.error('Error en AuthDao.findById:', error);
            throw new Error('Error al buscar usuario por ID');
        }
    }
}
