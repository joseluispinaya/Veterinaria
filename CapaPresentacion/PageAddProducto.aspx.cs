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
	public partial class PageAddProducto : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}
        [WebMethod]
        public static Respuesta<List<ECategoria>> ListaCategorias()
        {
            try
            {
                Respuesta<List<ECategoria>> Lista = NTiposGeneral.GetInstance().ListaCategorias();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los roles: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EProducto oProduc, byte[] imageBytes)
        {
            try
            {
                // Instancia de Utilidadesj para evitar múltiples llamadas a getInstance()
                var utilidades = Utilidadesj.GetInstance();

                // Procesar la imagen si existe
                string imageUrl = string.Empty;
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imageprodu/";
                        imageUrl = utilidades.UploadPhotoA(stream, folder);
                    }
                }

                // Crear objeto EUsuario con los datos
                EProducto obj = new EProducto
                {
                    Marca = oProduc.Marca,
                    Nombre = oProduc.Nombre,
                    Descripcion = oProduc.Descripcion,
                    IdCategoria = oProduc.IdCategoria,
                    IdVeterinaria = oProduc.IdVeterinaria,
                    Stock = oProduc.Stock,
                    ImagenProdu = imageUrl,
                    Precio = oProduc.Precio
                };

                // Registrar el usuario respuesta.Estado
                Respuesta<bool> respuesta = NProducto.GetInstance().RegistrarProducto(obj);
                return respuesta;
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