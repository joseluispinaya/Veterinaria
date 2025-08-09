using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
	public partial class Login : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<EUsuario> Iniciar(string Usuario, string Clave)
        {
            try
            {
                bool esAdmin = ValidarAdmin(Usuario);
                if (!esAdmin)
                {
                    return new Respuesta<EUsuario>
                    {
                        Estado = false,
                        Valor = "admin",
                        Mensaje = "Debe validar su cuenta revise su correo"
                    };
                }

                var tokenSesion = Guid.NewGuid().ToString();
                var ClaveEncri = Utilidadesj.GetInstance().ConvertirSha256(Clave);
                var obj = NUsuario.GetInstance().LoginUsuarios(Usuario, ClaveEncri, tokenSesion);

                // Si el usuario no existe o las credenciales son incorrectas
                if (obj?.Data == null)
                {
                    return new Respuesta<EUsuario>
                    {
                        Estado = false,
                        Valor = "",
                        Mensaje = "Credenciales incorrectas o usuario no encontrado"
                    };
                }

                // Obtener el token almacenado en la base de datos
                var tokenDbResponse = NUsuario.GetInstance().ObtenerToken(obj.Data.IdUsuario);

                return new Respuesta<EUsuario>
                {
                    Estado = tokenDbResponse.Estado, // Usa el estado real de la consulta del token
                    Data = obj.Data,
                    Valor = tokenDbResponse.Estado ? tokenDbResponse.Valor : "", // Evita devolver un token inválido
                    Mensaje = tokenDbResponse.Estado ? "Inicio de sesión exitoso" : "No se pudo obtener el token"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Valor = "",
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        private static bool ValidarAdmin(string correo)
        {
            try
            {
                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ObtenerUsuarios();
                var listaUsuarios = Lista.Data;

                var item = listaUsuarios.FirstOrDefault(x => x.Correo == correo);
                if (item == null)
                {
                    return false;
                }

                return true;

            }
            catch (Exception)
            {
                // Si ocurre un error en el envío del correo, retornar false
                return false;
            }
        }

        [WebMethod]
        public static Respuesta<EAdministrador> LogeoAdmin(string Usuario, string Clave)
        {
            try
            {
                var obj = NUsuario.GetInstance().LoginAdmin(Usuario, Clave);

                return obj;
            }
            catch (Exception ex)
            {
                return new Respuesta<EAdministrador>
                {
                    Estado = false,
                    Valor = "",
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }
    }
}