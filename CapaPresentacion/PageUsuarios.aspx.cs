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
                // Validar el número máximo
                if (ValidarSoloDosUsuarios(oUsuario.IdVeterinaria))
                {
                    return new Respuesta<bool>
                    {
                        Estado = false,
                        Mensaje = "La veterinaria ya tiene el número máximo de usuarios permitidos (2)."
                    };
                }

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

                string resw = string.Empty;

                if (resultadoRegistro)
                {

                    bool enviado = EnviodeCorreos(obj.Correo, claveGenerada);
                    resw = enviado ? "Se envió un correo con usuario y clave." : "No se pudo enviar el correo solicite al iniciar sesion";

                }
                // Crear respuesta con el resultado del registro
                return new Respuesta<bool>
                {
                    Estado = resultadoRegistro,
                    Mensaje = resultadoRegistro
                        ? $"Registro exitoso. {resw}"
                        : "Error al registrar. Intente con otro correo."
                };
            }
            catch (Exception)
            {
                // Manejar excepciones
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error intente mas tarde"
                };
            }
        }

        //sin usar
        [WebMethod]
        public static Respuesta<bool> GuardarOriginal(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                // Validar el número máximo
                if (ValidarSoloDosUsuarios(oUsuario.IdVeterinaria))
                {
                    return new Respuesta<bool>
                    {
                        Estado = false,
                        Mensaje = "La veterinaria ya tiene el número máximo de usuarios permitidos (2)."
                    };
                }

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

                string resw = string.Empty;

                if (resultadoRegistro)
                {
                    string fechaActual = DateTime.Now.ToString("dd/MM/yyyy");
                    string nombreSistema = "Sistema Integrado de veterinarias";

                    string sms = $"{fechaActual}\n" +
                     $"Credenciales de acceso:\n" +
                     $"Usuario: {obj.Correo}\n" +
                     $"Clave: {claveGenerada}\n\n" +
                     $"Sistema: {nombreSistema}\n" +
                     $"Por favor guarde esta información de forma segura.";

                    bool enviado = utilidades.EnviarMensaje(obj.Celular, sms);
                    resw = enviado ? "Se envió usuario y clave a su numero de whatsapp." : "Error no se pudo enviar el sms";

                }
                // Crear respuesta con el resultado del registro
                return new Respuesta<bool>
                {
                    Estado = resultadoRegistro,
                    //Valor = resultadoRegistro ? claveGenerada : "",
                    Mensaje = resultadoRegistro
                        ? $"Registro exitoso. {resw}"
                        : "Error al registrar. Intente con otro correo."
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

        private static bool EnviodeCorreos(string correo, string clave)
        {
            try
            {
                // Instanciar Utilidadesj y enviar el correo
                return Utilidadesj.GetInstance().EnviodeCorreo(correo, "Cuenta Creada", clave);
            }
            catch (Exception)
            {
                // Si ocurre un error en el envío del correo, retornar false
                return false;
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (oUsuario == null || oUsuario.IdUsuario <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos de usuario inválidos" };
                }

                // Obtener el usuario existente
                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ObtenerUsuarios();

                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdUsuario == oUsuario.IdUsuario);
                if (item == null)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Usuario no encontrado" };
                }

                // Manejar la imagen, si se proporciona una nueva
                string imageUrl = item.Foto;  // Mantener la foto actual por defecto

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imgusers/";
                        string newImageUrl = Utilidadesj.GetInstance().UploadPhotoA(stream, folder);

                        if (!string.IsNullOrEmpty(newImageUrl))
                        {
                            // Eliminar la imagen anterior si existe
                            if (!string.IsNullOrEmpty(item.Foto))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(item.Foto);
                                if (File.Exists(oldImagePath))
                                {
                                    File.Delete(oldImagePath);
                                }
                            }
                            imageUrl = newImageUrl;
                        }
                    }
                }

                // Actualizar los datos del usuario
                item.IdUsuario = oUsuario.IdUsuario;
                item.Nombres = oUsuario.Nombres;
                item.Apellidos = oUsuario.Apellidos;
                item.Correo = oUsuario.Correo;
                item.Celular = oUsuario.Celular;
                item.Foto = imageUrl;
                item.IdVeterinaria = oUsuario.IdVeterinaria;
                item.IdRol = oUsuario.IdRol;
                item.Activo = oUsuario.Activo;

                // Guardar cambios
                Respuesta<bool> respuesta = NUsuario.GetInstance().ActualizarUsuario(item);
                return respuesta;
            }
            catch (IOException ioEx)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Error al manejar la imagen: " + ioEx.Message };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        private static bool ValidarSoloDosUsuarios(int IdVeterinaria)
        {
            try
            {
                var respuesta = NUsuario.GetInstance().ObtenerUsuarios();

                if (respuesta.Estado && respuesta.Data != null)
                {
                    // Filtrar usuarios de la veterinaria 
                    var usuariosVeterinaria = respuesta.Data
                        .Where(u => u.IdVeterinaria == IdVeterinaria)
                        .ToList();

                    // Verificar si ya tiene 2 o más usuarios
                    return usuariosVeterinaria.Count >= 2;
                }

                // Si no se pudo obtener la lista correctamente, asumimos que no tiene 2 usuarios aún
                return false;
            }
            catch (Exception)
            {
                // En caso de error, asumir que no se puede validar
                return false;
            }
        }

        [WebMethod]
        public static Respuesta<string> EnvioSmsdo(string correo)
        {

            try
            {
                var utilidades = Utilidadesj.GetInstance();
                string claveGenerada = utilidades.GenerarClave();
                string claveEncriptada = utilidades.ConvertirSha256(claveGenerada);

                bool enviado = EnviodeCorreos(correo, claveGenerada);

                return new Respuesta<string>()
                {
                    Estado = enviado,
                    Valor = enviado ? claveGenerada : "",
                    Mensaje = enviado ? "Se envió correo y clave a su numero de whatsap." : "Error no se pudo enviar el sms",
                    Data = enviado ? claveEncriptada : ""
                };
            }
            catch (Exception)
            {
                return new Respuesta<string>()
                {
                    Estado = false,
                    Valor = "Error en el catch",
                    Mensaje = "Ocurrio un error catch intente mas tarde",
                    Data = "error catch"
                };
            }

        }

        [WebMethod]
        public static Respuesta<string> EnvioSms(string celular, string correo)
        {

            try
            {
                var utilidades = Utilidadesj.GetInstance();
                string claveGenerada = utilidades.GenerarClave();
                string claveEncriptada = utilidades.ConvertirSha256(claveGenerada);

                string fechaActual = DateTime.Now.ToString("dd/MM/yyyy");
                string nombreSistema = "Sistema Integrado de veterinarias";

                string sms = $"{fechaActual}\n" +
                 $"Credenciales de acceso:\n" +
                 $"Usuario: {correo}\n" +
                 $"Clave: {claveGenerada}\n\n" +
                 $"Sistema: {nombreSistema}\n" +
                 $"Por favor guarde esta información de forma segura.";

                string smsor = $"Estimado usuario:\n\nSe han generado sus credenciales de acceso:\nUsuario: {correo}\nClave: {claveGenerada}\n\nPor favor guarde esta información de forma segura.";
                bool enviado = utilidades.EnviarMensaje(celular, sms);

                return new Respuesta<string>()
                {
                    Estado = enviado,
                    Valor = enviado ? claveGenerada : "",
                    Mensaje = enviado ? "Se envió correo y clave a su numero de whatsap." : "Error no se pudo enviar el sms",
                    Data = enviado ? claveEncriptada : ""
                };
            }
            catch (Exception)
            {
                return new Respuesta<string>()
                {
                    Estado = false,
                    Valor = "Error en el catch",
                    Mensaje = "Ocurrio un error catch intente mas tarde",
                    Data = "error catch"
                };
            }

        }
    }
}