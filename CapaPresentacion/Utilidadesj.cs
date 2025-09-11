using CapaEntidad;
using CapaNegocio;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Net;

namespace CapaPresentacion
{
	public class Utilidadesj
	{
        private static readonly string OpenAIApiKey = ConfigurationManager.AppSettings["OpenAIApiKey"];
        private static List<TablasEsquema> _esquemaCache = null;

        private static readonly Dictionary<string, List<dynamic>> _memoriaConversacion = new Dictionary<string, List<dynamic>>();

        #region "PATRON SINGLETON"
        public static Utilidadesj _instancia = null;

        private Utilidadesj()
        {

        }

        public static Utilidadesj GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new Utilidadesj();
            }
            return _instancia;
        }
        #endregion

        private void GuardarEnMemoria(string sessionId, string role, string content)
        {
            if (!_memoriaConversacion.ContainsKey(sessionId))
                _memoriaConversacion[sessionId] = new List<dynamic>();

            _memoriaConversacion[sessionId].Add(new { role, content });

            // Mantener solo las últimas 20 interacciones
            if (_memoriaConversacion[sessionId].Count > 20)
                _memoriaConversacion[sessionId] =
                    _memoriaConversacion[sessionId].Skip(_memoriaConversacion[sessionId].Count - 20).ToList();
        }

        private List<dynamic> ObtenerMemoria(string sessionId)
        {
            if (_memoriaConversacion.ContainsKey(sessionId))
                return _memoriaConversacion[sessionId];
            return new List<dynamic>();
        }

        public List<TablasEsquema> ObtenerEsquemaBD()
        {
            if (_esquemaCache != null)
                return _esquemaCache;

            var respuesta = NChatBot.GetInstance().EsquemaBaseDatos();

            return _esquemaCache = respuesta.Estado
                ? respuesta.Data
                : new List<TablasEsquema>();
        }

        public string RespuestaModeloIa(string sessionId, string preguntaUser)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {
                var esquema = ObtenerEsquemaBD();

                if (!esquema.Any())
                    return "No se pudo cargar el esquema de la base de datos.";

                // FILTRAR LAS TABLAS QUE QUIERES EXCLUIR
                var tablasExcluidas = new[] { "VENTAS", "DETALLE_VENTA", "USUARIOS", "ADMINISTRADOR", "ROLES" };

                var esquemaFiltrado = esquema
                    .Where(tabla => !tablasExcluidas.Contains(tabla.NombreTabla, StringComparer.OrdinalIgnoreCase))
                    .ToList();

                var esquemaSimplificado = esquemaFiltrado.Select(tabla => new TablasEsquema
                {
                    NombreTabla = tabla.NombreTabla,
                    Columnas = tabla.Columnas.Select(col => new ColumnaEsquema
                    {
                        NombreColumna = col.NombreColumna,
                        TipoDato = col.TipoDato
                    }).ToList()
                }).ToList();

                string esquemaJson = JsonConvert.SerializeObject(esquemaSimplificado, Formatting.None);

                var promptSistema = $@"
                  Eres un generador automático de consultas T-SQL exclusivo para Microsoft SQL Server. No eres un asistente conversacional ni realizas ninguna otra tarea.

                  Tu ÚNICA función es convertir instrucciones en lenguaje natural en **sentencias SQL de tipo SELECT**, válidas y optimizadas, utilizando exclusivamente el siguiente esquema de base de datos:

                  {esquemaJson}

                  Debes interpretar correctamente términos ambiguos o sinónimos usando el siguiente diccionario:

                  DICCIONARIO DE SINÓNIMOS:
                  - VETERINARIA: veterinarias, clínicas, centros veterinarios, locales
                  - PROPIETARIO: propietarios, dueños, clientes, personas con mascotas
                  - MASCOTA: mascotas, animales, mascotas registradas
                  - HISTORIA_CLINICA: historias clínicas, historial, atenciones, ficha médica
                  - PRODUCTO: productos, artículos, insumos, medicamentos
                  - SERVICIO: servicios, atenciones, tratamientos
                  - CATEGORIA: categorías, tipos de producto, clasificaciones, grupo de productos
                  - TIPO_MASCOTA: tipos de mascota, especie, animal

                  CAMPOS COMUNES:
                  - Nombres: nombre, nombres, nombre completo
                  - Apellidos: apellido, apellidos
                  - Correo: email, correo electrónico
                  - Celular: teléfono, número, celular
                  - Foto: imagen, fotografía
                  - NroCi: numero de cedula, numero de carnet, numero de ci
                  - Direccion: ubicación, domicilio, dirección
                  - FechaRegistro: fecha de registro, fecha, cuándo fue creado
                  - IdPropietario: dueño, propietario, cliente
                  - IdVeterinaria: veterinaria, clínica
                  - NombreVeterinaria: nombre de la veterinaria, nombre de la clínica
                  - Nombre: nombre, nombre de la mascota
                  - Descripcion: descripción, detalle, información
                  - FechaNacimiento: nacimiento, cumpleaños, fecha de nacimiento
                  - Comentario: comentario, observación, nota
                  - Raza: raza, especie
                  - Genero: sexo, género
                  - Precio: precio, costo, valor, importe, monto

                  REGLAS ESTRICTAS Y OBLIGATORIAS QUE DEBES CUMPLIR:

                  1. SOLO responde con una sentencia SQL de tipo SELECT si la instrucción es válida y está relacionada con el esquema proporcionado.
                  2. NO respondas saludos, despedidas, explicaciones ni ninguna conversación general.
                  3. SI la instrucción NO está relacionada con el esquema, responde únicamente con: NO_EXISTE
                  4. SI la instrucción solicita o implica cualquier operación que no sea SELECT (por ejemplo: INSERT, UPDATE, DELETE, CREATE, DROP, ALTER), responde únicamente con: NO_VALIDO
                  5. NO uses ningún bloque de código Markdown ni decoradores. Devuelve exclusivamente texto plano.
                  6. NO uses comillas simples, dobles ni backticks para encerrar la consulta.
                  7. NO des comentarios, encabezados, descripciones ni justificaciones.
                  8. NO inventes nombres de tablas, columnas ni valores. Usa solamente los definidos en el esquema proporcionado.
                  9. SI la instrucción es ambigua pero puede deducirse razonablemente a una consulta SELECT con base en los sinónimos y campos comunes, genera la consulta SELECT correspondiente.
                  10. SI la instrucción es puramente conversacional o no contiene ninguna solicitud de consulta, responde únicamente con: NO_EXISTE

                  EJEMPLOS DE RESPUESTA ESPERADA:

                  ""original_query"": ""Listar todas las mascotas registradas.""
                  ""sql_query"": ""SELECT * FROM MASCOTAS;""

                  ""original_query"": ""Mostrar las veterinarias activas.""
                  ""sql_query"": ""SELECT * FROM VETERINARIAS WHERE Activo = 1;""

                  ""original_query"": ""Ver los productos disponibles en stock.""
                  ""sql_query"": ""SELECT * FROM PRODUCTOS WHERE Stock > 0 AND Activo = 1;""

                  ""original_query"": ""¿Qué producto es bueno para la garrapata?""
                  ""sql_query"": ""SELECT Nombre, Marca, Descripcion, Precio FROM PRODUCTOS WHERE Descripcion LIKE '%garrapata%' AND Activo = 1;""

                  ""original_query"": ""Mostrar productos de la categoría 'medicamentos'.""
                  ""sql_query"": ""SELECT P.Nombre, P.Marca, P.Precio FROM PRODUCTOS P INNER JOIN CATEGORIAS C ON P.IdCategoria = C.IdCategoria WHERE C.Descripcion = 'medicamentos' AND P.Activo = 1;""

                  ""original_query"": ""Mostrar productos disponibles en la veterinaria 'Veterinaria Central'.""
                  ""sql_query"": ""SELECT P.Nombre, P.Marca, P.Precio FROM PRODUCTOS P INNER JOIN VETERINARIAS V ON P.IdVeterinaria = V.IdVeterinaria WHERE LOWER(V.NombreVeterinaria) LIKE '%veterinaria central%' AND P.Activo = 1;""

                  ""original_query"": ""Obtener nombre, raza y género de las mascotas del propietario con CI 12345678.""
                  ""sql_query"": ""SELECT M.Nombre, M.Raza, M.Genero FROM MASCOTAS M INNER JOIN PROPIETARIOS P ON M.IdPropietario = P.IdPropietario WHERE P.NroCi = '12345678';""

                  ""original_query"": ""Cuántas historias clínicas hay este mes.""
                  ""sql_query"": ""SELECT COUNT(*) FROM HISTORIAS_CLINICAS WHERE MONTH(FechaRegistro) = MONTH(GETDATE()) AND YEAR(FechaRegistro) = YEAR(GETDATE());""

                  Ahora, genera ÚNICAMENTE la sentencia SQL correspondiente para el siguiente requerimiento:
                  ";

                // --- Construcción del historial ---
                var messages = new List<object>
                {
                    new { role = "system", content = promptSistema }
                };

                // Solo añadir historial de preguntas del usuario (evita mezclar respuestas del bot)
                messages.AddRange(
                    ObtenerMemoria(sessionId).Where(m => m.role == "user")
                );

                // Pregunta actual
                messages.Add(new { role = "user", content = preguntaUser });

                var requestBody = new
                {
                    model = "gpt-4o",
                    messages,
                    temperature = 0.2,
                    max_tokens = 200
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                        return $"Tuvimos un problema con el modelo: {response.StatusCode}";

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);

                    string respuestaChatbot = json.choices[0].message.content.ToString().Trim();

                    string respuestaFinal;

                    if (respuestaChatbot == "NO_VALIDO")
                    {
                        // Operación no permitida
                        respuestaFinal = "Tu solicitud no está permitida. Solo puedo ayudarte con consultas.";
                    }
                    else if (respuestaChatbot == "NO_EXISTE")
                    {
                        var saluda = RespuestaSaludo(preguntaUser);
                        if (saluda != "NO_SALUDA")
                        {
                            respuestaFinal = saluda;
                        }
                        else
                        {
                            var cuidados = RespCuidadosMascota(preguntaUser);
                            respuestaFinal = cuidados == "SIN_DATOS"
                                ? "Tu pregunta está fuera de nuestro modelo. Intentá con otra consulta."
                                : cuidados;
                        }
                    }
                    else
                    {
                        respuestaFinal = ModeloHumanizador(sessionId, preguntaUser, respuestaChatbot);
                    }

                    // --- Guardar en memoria ---
                    GuardarEnMemoria(sessionId, "user", preguntaUser);
                    GuardarEnMemoria(sessionId, "assistant", respuestaFinal);

                    return respuestaFinal;
                }
            }
            catch (Exception)
            {
                return "Tuvimos un problema con el modelo excep. intentá nuevamente más tarde.";
            }
        }

        // metodo para humanizar la respuesta de la consulta sql
        public string ModeloHumanizador(string sessionId, string pregunta, string ConsultaSql)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {
                var resultado = NChatBot.GetInstance().EjecutarSentenciaSql(ConsultaSql);

                if (!resultado.Estado || resultado.Data == null)
                {
                    return "No tubimos una respuesta de la base de datos. Por favor, intentá nuevamente más tarde.";
                }

                var lista = new List<Dictionary<string, object>>();
                foreach (DataRow row in resultado.Data.Rows)
                {
                    var dict = new Dictionary<string, object>();
                    foreach (DataColumn col in resultado.Data.Columns)
                    {
                        dict[col.ColumnName] = row[col];
                    }
                    lista.Add(dict);
                }

                string esquemaJson = JsonConvert.SerializeObject(lista, Formatting.None);

                var promptSistema = $@"
                    Eres un asistente de IA que responde preguntas de forma clara, amigable y profesional.

                    Instrucciones:
                    - Tienes la pregunta original de un usuario y los datos obtenidos de la base de datos en formato JSON.
                    - Tu tarea es interpretar exclusivamente los datos y generar una respuesta útil, bien redactada y natural.
                    - No inventes información que no esté presente en los datos.
                    - No repitas literalmente el JSON en la respuesta.
                    - Si aparece un campo 'Precio', asume bolivianos (Bs), nunca en dólares.
                    - Si hay más de 5 filas, muestra sólo 5 y termina con: “y X más…”.
                    - Si un campo contiene rutas, enlaces o imágenes (ej. 'ImagenMascota', 'ImagenProdu', 'ImagenLogo' o valores que empiecen con '/' o 'http'), ignóralos y no los muestres en la respuesta.
                    - Si los datos están vacíos o no hay resultados, indícalo de forma educada.

                    Responde usando solamente la información de los datos proporcionados.
                    ";

                // construir mensajes con memoria de sesión
                var messages = new List<object>
                {
                    new { role = "system", content = promptSistema }
                };

                // historial previo (user + assistant)
                messages.AddRange(ObtenerMemoria(sessionId));

                // pregunta original del usuario
                messages.Add(new { role = "user", content = pregunta });

                // datos obtenidos como instrucción de sistema (no como user)
                messages.Add(new { role = "system", content = $"Datos obtenidos en formato JSON: {esquemaJson}" });

                var requestBody = new
                {
                    model = "gpt-4o-mini",
                    messages,
                    temperature = 0.2,
                    max_tokens = 300
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        return "Tuvimos un problema al interactuar con el modelo. Por favor, intentá nuevamente más tarde.";
                    }

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);

                    return json.choices[0].message.content.ToString().Trim();
                }
            }
            catch (Exception)
            {
                return "Tuvimos un problema al generar una respuesta de la consulta sql. Por favor, intentá nuevamente más tarde.";
            }
        }

        // modelo ia a posible saludo o despedida
        public string RespuestaSaludo(string pregunta)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {

                var mensajeSistema = $@"
                    Eres un asistente virtual de veterinaria que solo responde saludos o despedidas.

                    - Si el mensaje del usuario es un saludo (como ""Hola"", ""Buenos días"") o una despedida (como ""Gracias, hasta luego""), responde de forma amable, profesional y mencionando que eres un chat de veterinaria.
                    - Si el mensaje NO es un saludo o despedida, responde exactamente con: NO_SALUDA (sin comillas). No expliques por qué no es un saludo ni agregues ningún comentario. Si no estás seguro, responde NO_SALUDA.

                    Ejemplos:
                    - Usuario: ""Hola""
                    Respuesta: ""¡Hola! Soy el asistente virtual de nuestra veterinaria. ¿En qué puedo ayudarte?""
                    - Usuario: ""Buenos días""
                    Respuesta: ""¡Buenos días! Te saluda el chat de veterinaria. ¿Cómo puedo ayudarte hoy?""
                    - Usuario: ""Gracias, hasta luego""
                    Respuesta: ""¡Gracias a ti! Soy el asistente virtual de la veterinaria. Que tengas un excelente día.""
                    - Usuario: ""¿Cuál es la capital de Italia?""
                    Respuesta: ""NO_SALUDA""

                    Responde ahora según estas instrucciones:
                    ";

                var requestBody = new
                {
                    model = "gpt-3.5-turbo",
                    messages = new[]
                    {
                        new { role = "system", content = mensajeSistema },
                        new { role = "user", content = pregunta }
                    },
                    temperature = 0.2,
                    max_tokens = 100
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        return "Tuvimos un problema con el modelo de saludos. Por favor, intentá nuevamente más tarde.";
                    }

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);

                    return json.choices[0].message.content.ToString().Trim();
                }
            }
            catch (Exception)
            {
                return "Tuvimos un problema de excepcion del modelo de saludo. Por favor, intentá nuevamente más tarde.";
            }
        }

        // modelo ia para consejos cuidados u otros solo relacionado con mascotas
        public string RespCuidadosMascota(string pregunta)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {
                var mensajeSistema = $@"
                    Eres un asistente de inteligencia artificial especializado únicamente en temas veterinarios. Solo puedes responder preguntas relacionadas con mascotas (perros, gatos, aves, conejos, peces, etc.).

                    Tu tarea es responder ÚNICAMENTE si la pregunta del usuario se relaciona con:
                    - Cuidados generales de mascotas
                    - Recomendaciones de alimentación
                    - Problemas de salud
                    - Vacunación
                    - Comportamiento
                    - Higiene
                    - Visitas al veterinario
                    - Recomendaciones de bienestar

                    ⚠️ Si la pregunta NO está relacionada con mascotas, debes responder **exactamente** con: SIN_DATOS 
                    (No escribas nada más. No uses comillas. No expliques por qué. No agregues signos, emojis, ni otro texto. Solo devuelve la palabra: SIN_DATOS en mayúsculas).

                    ### Ejemplos:

                    - Usuario: ""¿Cada cuánto debo bañar a mi perro?""
                    Respuesta: ""Lo recomendable es bañarlo una vez al mes, aunque depende de la raza y estilo de vida.""

                    - Usuario: ""¿Cuántos huesos tiene el cuerpo humano?""
                    Respuesta: SIN_DATOS

                    - Usuario: ""Mi gato tiene diarrea, ¿qué puedo hacer?""
                    Respuesta: ""Ofrécele una dieta blanda y llévalo al veterinario si no mejora en 24 horas.""

                    - Usuario: ""¿Quién es el presidente de México?""
                    Respuesta: SIN_DATOS

                    - Usuario: ""¿Cuántos planetas tiene el sistema solar?""
                    Respuesta: SIN_DATOS

                    Reglas finales:
                    - Solo responde si la pregunta trata sobre mascotas.
                    - De lo contrario, responde únicamente: SIN_DATOS
                    ";

                var requestBody = new
                {
                    model = "gpt-3.5-turbo",
                    messages = new[]
                    {
                        new { role = "system", content = mensajeSistema },
                        new { role = "user", content = pregunta }
                    },
                    temperature = 0.2,
                    max_tokens = 200
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        return "Tuvimos un problema al generar una respuesta del modelo de cuidados. Por favor, intentá nuevamente más tarde.";
                    }

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);

                    return json.choices[0].message.content.ToString().Trim();
                }
            }
            catch (Exception)
            {
                return "Tuvimos un problema al generar una respuesta Exep. Por favor, intentá nuevamente más tarde.";
            }
        }

        public string GenerarClave()
        {
            string clave = Guid.NewGuid().ToString("N").Substring(0, 6);
            return clave;
        }

        public string ConvertirSha256(string texto)
        {
            StringBuilder sb = new StringBuilder();
            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(texto));
                foreach (byte b in result)
                {
                    sb.Append(b.ToString("x2"));
                }
            }
            return sb.ToString();
        }

        public string UploadPhotoA(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";

                var fullPath = $"{folder}{file}";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);

                // Guardar la imagen en el sistema de archivos
                File.WriteAllBytes(path, stream.ToArray());

                // Verificar si el archivo fue guardado correctamente
                if (File.Exists(path))
                {
                    rutaa = fullPath;
                }
            }
            catch (IOException)
            {
                // Registrar el error en un logger si es necesario
                // Logger.LogError(ioEx.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error de E/S
            }
            catch (Exception)
            {
                // Registrar el error pero continuar el flujo
                // Puedes usar un logger si es necesario
                // Logger.LogError(ex.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error
            }
            return rutaa;
        }

        public string UploadPdf(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.pdf";

                var fullPath = $"{folder}{file}";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);

                // Guardar la imagen en el sistema de archivos
                File.WriteAllBytes(path, stream.ToArray());

                // Verificar si el archivo fue guardado correctamente
                if (File.Exists(path))
                {
                    rutaa = fullPath;
                }
            }
            catch (IOException)
            {
                // Registrar el error en un logger si es necesario
                // Logger.LogError(ioEx.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error de E/S
            }
            catch (Exception)
            {
                // Registrar el error pero continuar el flujo
                // Puedes usar un logger si es necesario
                // Logger.LogError(ex.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error
            }
            return rutaa;
        }

        public bool EnviodeCorreo(string toEmailUser, string subjec, string clave)
        {
            try
            {
                var from = "susidelta1@gmail.com";
                var name = "Veterinarias";
                var smtps = "smtp.gmail.com";
                var port = 587;
                var password = "ubnksrseceomigqb";

                var correo = new MailMessage
                {
                    From = new MailAddress(from, name)
                };
                correo.To.Add(toEmailUser);
                correo.Subject = subjec;

                string cuerpohtml = $@"
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta name='viewport' content='width=device-width' />
                        <title>Registro usuario</title> 
                    </head>
                    <body style='background-color:#EDF6FF'>
                        <br />
                        <br />
                        <div style='width:400px;border-radius:5px; margin:auto;background-color:#fff;box-shadow:0px 0px 10px  #DEDEDE;padding:20px'>
                            <table style='width:100%'>
                                <tr>
                                    <td align='center' colspan='2'>
                                      <img src='https://joseluis1989-004-site1.ltempurl.com/recursos/img/gallery/asoc.png' alt='Foto' style='height: 93px; max-width: 90px;'>
                                    </td>
                                </tr>
                                <tr>
                                    <td align='center' colspan='2'>
                                        <h2 style='margin:0px;color:#004DAF'>Sistema de Vetasociados</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td align='left' colspan='2'>
                                        <p>Se creó tu usuario. Los detalles de acceso a tu cuenta son:</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h4 style='color:#004DAF;margin:2px'>Usuario:</h4></td>
                                    <td>{toEmailUser}</td>
                                </tr>
                                <tr>
                                    <td><h4 style='color:#004DAF;margin:2px'>Clave:</h4></td>
                                    <td>{clave}</td>
                                </tr>
                            </table>
                            <div style='background-color:#FFE1CE;padding:15px;margin-top:15px;margin-bottom:10px'>
                                <p style='margin:0px;color: #F45E00;'>Le recomendamos cambiar la contraseña una vez inicie sesión.</p>
                            </div>
                            <table style='width:100%'>
                                <tr>
                                    <td><p>Para iniciar sesión presione el botón</p></td>
                                </tr>
                                <tr>
                                    <td align='center'>
                                        <a href='https://joseluis1989-004-site1.ltempurl.com/Login.aspx' style='background-color: #004DAF; color: white; padding: 10px 10px; border: none; border-radius: 5px; text-decoration:none;'>
                                            Iniciar Sesión
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <br />
                        <br />
                    </body>
                    </html>";

                correo.Body = cuerpohtml;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                using (var smtp = new SmtpClient
                {
                    Host = smtps,
                    Port = port,
                    Credentials = new NetworkCredential(from, password),
                    EnableSsl = true
                })
                {
                    smtp.Send(correo);
                }

                return true;
            }
            catch (SmtpException)
            {
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool EnviarMensaje(string numero, string mensaje)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var url = "https://enviosmszero.onrender.com/send-message"; // Cambia esto por la URL de tu API si está en otro servidor/puerto

                    var payload = new
                    {
                        number = numero,
                        message = mensaje
                    };

                    var json = JsonConvert.SerializeObject(payload);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    var response = client.PostAsync(url, content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var responseBody = response.Content.ReadAsStringAsync().Result;
                        // Opcional: puedes parsear la respuesta si necesitas más detalles
                        return true;
                    }
                    else
                    {
                        // Log de error si lo deseas
                        return false;
                    }
                }
            }
            catch (Exception)
            {
                // Aquí podrías registrar el error si lo deseas
                return false;
            }
        }
    }
}