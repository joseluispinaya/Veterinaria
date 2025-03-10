using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.IO;

namespace CapaPresentacion
{
	public partial class PageUsuarios : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        // Metodo para listar los roles para el usuario
        [WebMethod]
        public static Respuesta<List<ERol>> ObtenerRol()
        {
            try
            {
                Respuesta<List<ERol>> Lista = NUsuario.GetInstance().ListaRoles();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ERol>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los roles: " + ex.Message,
                    Data = null
                };
            }
        }

        // Metodo para listar datos del usuario
        [WebMethod]
        public static Respuesta<List<EUsuario>> ObtenerUsuarios()
        {
            try
            {
                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ObtenerUsuarios();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los usuarios: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                // Instancia de Utilidadesj para evitar múltiples llamadas a getInstance()
                var utilidades = Utilidadesj.GetInstance();

                // Generar clave aleatoria y encriptarla
                string claveGenerada = utilidades.GenerarClave();
                string claveEncriptada = utilidades.ConvertirSha256(claveGenerada);

                // Procesar la imagen si existe
                string imageUrl = string.Empty;
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imgusers/";
                        imageUrl = utilidades.UploadPhotoA(stream, folder);
                    }
                }

                // Crear objeto EUsuario con los datos
                EUsuario obj = new EUsuario
                {
                    Nombres = oUsuario.Nombres,
                    Apellidos = oUsuario.Apellidos,
                    Correo = oUsuario.Correo,
                    Clave = claveEncriptada,
                    Celular = oUsuario.Celular,
                    Foto = imageUrl,
                    IdVeterinaria = oUsuario.IdVeterinaria,
                    IdRol = oUsuario.IdRol,
                    Token = Guid.NewGuid().ToString()
                };

                // Registrar el usuario respuesta.Estado
                Respuesta<bool> respuesta = NUsuario.GetInstance().RegistrarUsuario(obj);
                bool resultadoRegistro = respuesta.Estado;
                //return respuesta;

                // Crear respuesta con el resultado del registro
                return new Respuesta<bool>
                {
                    Estado = resultadoRegistro,
                    Valor = resultadoRegistro ? claveGenerada : "",
                    Mensaje = resultadoRegistro ? "Registro exitoso. Se envió la clave al correo." : "Error al registrar. Intente con otro correo."
                };
            }
            catch (Exception ex)
            {
                // Manejar excepciones
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }
    }
}