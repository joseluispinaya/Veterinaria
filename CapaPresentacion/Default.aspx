<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CapaPresentacion.Default" %>

<!DOCTYPE html>

<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Veterinarias Unidas </title>
    <meta name="description" content="Veterinarias">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="manifest" href="site.webmanifest"> -->
    <link rel="shortcut icon" type="image/x-icon" href="recursos/img/favicon.ico">

    <!-- CSS here -->
    <link rel="stylesheet" href="recursos/css/bootstrap.min.css">
    <link rel="stylesheet" href="recursos/css/owl.carousel.min.css">
    <link rel="stylesheet" href="recursos/css/slicknav.css">
    <link rel="stylesheet" href="recursos/css/flaticon.css">
    <link rel="stylesheet" href="recursos/css/animate.min.css">
    <link rel="stylesheet" href="recursos/css/magnific-popup.css">
    <link rel="stylesheet" href="recursos/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="recursos/css/themify-icons.css">
    <link rel="stylesheet" href="recursos/css/slick.css">
    <link rel="stylesheet" href="recursos/css/nice-select.css">
    <link rel="stylesheet" href="recursos/css/style.css">
    <link rel="stylesheet" href="recursos/css/chatvet.css">

    <style>
        .gmapsz {
            height: 400px;
            width: 100%;
            border-radius: 4px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <!-- Preloader Start -->
    <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="recursos/img/logo/logoali.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- Preloader Start -->
    <header>
        <!--? Header Start -->
        <div class="header-area header-transparent">
            <div class="main-header header-sticky">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <!-- Logo -->
                        <div class="col-xl-2 col-lg-2 col-md-1">
                            <div class="logo">
                                <a href="#"><img src="recursos/img/logo/logoali.png" alt=""></a>
                            </div>
                        </div>
                        <div class="col-xl-10 col-lg-10 col-md-10">
                            <div class="menu-main d-flex align-items-center justify-content-end">
                                <!-- Main-menu -->
                                <div class="main-menu f-right d-none d-lg-block">
                                    <nav> 
                                        <ul id="navigation">
                                            <li><a href="Default.aspx">Inicio</a></li>
                                            <li><a href="Login.aspx">Iniciar sesion</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <%--<div class="header-right-btn f-right d-none d-lg-block ml-30">
                                    <a href="#" class="header-btn">Soporte tecnico</a>
                                </div>--%>
                            </div>
                        </div>   
                        <!-- Mobile Menu -->
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Header End -->
    </header>
    <main> 
        <!--? Slider Area Start-->
        <div class="slider-area">
            <div class="slider-active dot-style">
                <!-- Slider Single -->
                <div class="single-slider d-flex align-items-center slider-height">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-xl-7 col-lg-8 col-md-10 ">
                                <!-- Video icon -->
                                <div class="video-icon">
                                    <a class="popup-video btn-icon" href="https://www.youtube.com/watch?v=up68UAfH0d0" data-animation="bounceIn" data-delay=".4s">
                                        <i class="fas fa-play"></i>
                                    </a>
                                </div>
                                <div class="hero__caption">
                                    <span data-animation="fadeInUp" data-delay=".3s">Te ayudamos a cuidar a tu mascota</span>
                                    <h1 data-animation="fadeInUp" data-delay=".3s">Veterinarias.</h1>
                                    <p data-animation="fadeInUp" data-delay=".6s">El éxito se logra a través del aprendizaje, pero a veces sucede que se necesita un gran esfuerzo y dolor para lograrlo.</p>
                                    <a href="#" class="hero-btn" data-animation="fadeInLeft" data-delay=".3s">Contáctanos ahora<i class="ti-arrow-right"></i> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
                <!-- Slider Single -->
                <div class="single-slider d-flex align-items-center slider-height">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-xl-7 col-lg-8 col-md-10 ">
                                <!-- Video icon -->
                                <div class="video-icon">
                                    <a class="popup-video btn-icon" href="https://www.youtube.com/watch?v=1aP-TXUpNoU" data-animation="bounceIn" data-delay=".4s">
                                        <i class="fas fa-play"></i>
                                    </a>
                                </div>
                                <div class="hero__caption">
                                    <span data-animation="fadeInUp" data-delay=".3s">Te ayudamos a cuidar a tu mascota</span>
                                    <h1 data-animation="fadeInUp" data-delay=".3s">Veterinarias.</h1>
                                    <p data-animation="fadeInUp" data-delay=".6s">El éxito se logra a través del aprendizaje, pero a veces sucede que se necesita un gran esfuerzo y dolor para lograrlo.</p>
                                    <a href="#" class="hero-btn" data-animation="fadeInLeft" data-delay=".3s">Contáctanos ahora<i class="ti-arrow-right"></i> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            <!-- slider Social -->
            <%--<div class="button-text d-none d-md-block">
            <span>----</span>
            </div>--%>
        </div>
        <!-- Slider Area End -->
        <!--? Our Services Start -->
        <div class="home_blog-area mt-30">
            <div class="container">
                <div class="row justify-content-sm-center">
                    <div class="cl-xl-7 col-lg-8 col-md-10">
                        <!-- Section Tittle -->
                        <div class="section-tittle text-center mb-70">
                            <%--<span>Oure recent news</span>--%>
                            <h2>Veterinarias</h2>
                        </div> 
                    </div>
                </div>
                <div class="row" id="listaVet">
                    <%--<div class="col-xl-4 col-lg-4 col-md-6">
                        <div class="single-blogs mb-30">
                            <div class="blog-img">
                                <img src="recursos/img/gallery/blog1.png" alt="">
                            </div>
                            <div class="blogs-cap">
                                <div class="date-info">
                                    <span>Pet food</span>
                                    <p>Nov 30, 2020</p>
                                </div>
                                <h4>Amazing Places To Visit In Summer</h4>
                                <a href="#" class="read-more1">Read more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6">
                        <div class="single-blogs mb-30">
                            <div class="blog-img">
                                <img src="recursos/img/gallery/blog2.png" alt="">
                            </div>
                            <div class="blogs-cap">
                                <div class="date-info">
                                    <span>Pet food</span>
                                    <p>Nov 30, 2020</p>
                                </div>
                                <h4>Developing Creativithout Losing Visual</h4>
                                <a href="#" class="read-more1">Read more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6">
                        <div class="single-blogs mb-30">
                            <div class="blog-img">
                                <img src="recursos/img/gallery/blog3.png" alt="">
                            </div>
                            <div class="blogs-cap">
                                <div class="date-info">
                                    <span>Pet food</span>
                                    <p>Nov 30, 2020</p>
                                </div>
                                <h4>Winter Photography Tips from Glenn</h4>
                                <a href="#" class="read-more1">Read more</a>
                            </div>
                        </div>
                    </div>--%>
                </div>
            </div>
        </div>
        <!-- Our Services End -->

        <section class="blog_area single-post-area">
            <div class="container">
               <div class="row">
                  <div class="col-lg-8 posts-list">

                    <div class="single-post">
                        <div class="feature-img">
                            <div id="mapaz" class="gmapsz"></div>
                        </div>
                        <div class="blog_details">
                           <h2>Ubicacion de las veterinarias registradas en nuestro sistema integral
                           </h2>
                           <ul class="blog-info-link mt-3 mb-4">
                              <li><a href="#"><i class="fa fa-user"></i> Salud, Viajes</a></li>
                              <li><a href="#"><i class="fa fa-comments"></i> 03 Comentarios</a></li>
                           </ul>
                        </div>
                     </div>

                  </div>
                  <div class="col-lg-4">
                     <div class="blog_right_sidebar">
                        <aside class="single_sidebar_widget post_category_widget">
                           <h4 class="widget_title">Servicios</h4>
                           <ul class="list cat-list">
                              <li>
                                 <a href="#" class="d-flex">
                                    <p>Farmacia</p>
                                    <p>...</p>
                                 </a>
                              </li>
                              <li>
                                 <a href="#" class="d-flex">
                                    <p>Internado</p>
                                    <p>...</p>
                                 </a>
                              </li>
                              <li>
                                 <a href="#" class="d-flex">
                                    <p>Cirugias</p>
                                    <p>...</p>
                                 </a>
                              </li>
                              <li>
                                 <a href="#" class="d-flex">
                                    <p>Desparasitacion</p>
                                    <p>...</p>
                                 </a>
                              </li>
                              <li>
                                 <a href="#" class="d-flex">
                                    <p>Vacunacion</p>
                                    <p>...</p>
                                 </a>
                              </li>
                              <li>
                                 <a href="#" class="d-flex">
                                    <p>Estetica canina</p>
                                    <p>(21)</p>
                                 </a>
                              </li>
                           </ul>
                        </aside>
                     </div>
                  </div>
               </div>
            </div>
         </section>

        <!--? Testimonial Start -->
        <div class="testimonial-area testimonial-padding section-bg mt-70" data-background="recursos/img/gallery/section_bg03.png">
            <div class="container">
                <!-- Testimonial contents -->
                <div class="row d-flex justify-content-center">
                    <div class="col-xl-8 col-lg-8 col-md-10">
                        <div class="h1-testimonial-active dot-style">
                            <!-- Single Testimonial -->
                            <div class="single-testimonial text-center">
                                <div class="testimonial-caption ">
                                    <!-- founder -->
                                    <div class="testimonial-founder">
                                        <div class="founder-img mb-40">
                                            <img src="recursos/img/gallery/asoc.png" alt="" style="height: 132px; max-width: 130px;">
                                            <span>VetAsociados</span>
                                            <p>Creador Responsable</p>
                                        </div>
                                    </div>
                                    <div class="testimonial-top-cap">
                                        <p>“Plataforma para veterinaria. Nuestro sistema te permite gestionar ventas de medicamentos, alimentos y accesorios para mascotas, además de llevar un control del historial clínico de cada paciente.”</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Single Testimonial -->
                            <div class="single-testimonial text-center">
                                <div class="testimonial-caption ">
                                    <!-- founder -->
                                    <div class="testimonial-founder">
                                        <div class="founder-img mb-40">
                                            <img src="recursos/img/gallery/asoc.png" alt="" style="height: 132px; max-width: 130px;">
                                            <span>VetAsociados</span>
                                            <p>Creador Responsable</p>
                                        </div>
                                    </div>
                                    <div class="testimonial-top-cap">
                                        <p>“Plataforma para veterinaria. Nuestro sistema te permite gestionar ventas de medicamentos, alimentos y accesorios para mascotas, además de llevar un control del historial clínico de cada paciente.”</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Single Testimonial -->
                            <div class="single-testimonial text-center">
                                <div class="testimonial-caption ">
                                    <!-- founder -->
                                    <div class="testimonial-founder">
                                        <div class="founder-img mb-40">
                                            <img src="recursos/img/gallery/asoc.png" alt="" style="height: 132px; max-width: 130px;">
                                            <span>VetAsociados</span>
                                            <p>Creador Responsable</p>
                                        </div>
                                    </div>
                                    <div class="testimonial-top-cap">
                                        <p>“Plataforma para veterinaria. Nuestro sistema te permite gestionar ventas de medicamentos, alimentos y accesorios para mascotas, además de llevar un control del historial clínico de cada paciente.”</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Testimonial End -->
        <!--? contact-animal-owner Start -->
        <div class="contact-animal-owner section-bg mt-70" data-background="recursos/img/gallery/section_bg04.png">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="contact_text text-center">
                            <div class="section_title text-center">
                                <h3>Encuentra tu veterinaria asociada</h3>
                                <p>Consulta nuestro directorio de veterinarias y contacta directamente con la que prefieras.</p>
                            </div>
                            <div class="contact_btn d-flex align-items-center justify-content-center">
                                <a href="#" class="btn white-btn">Ver directorio</a>
                                <p>O puede pasar por algunas veterinarias asociadas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- contact-animal-owner End -->
    </main>
    <footer>
        <!-- Footer Start-->
        <div class="footer-area footer-padding">
            <div class="container">
                <div class="row d-flex justify-content-between">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                       <div class="single-footer-caption mb-50">
                         <div class="single-footer-caption mb-30">
                              <!-- logo -->
                             <div class="footer-logo mb-25">
                                 <a href="#"><img src="recursos/img/logo/logoali2_footer.png" alt=""></a>
                             </div>
                             <div class="footer-tittle">
                                 <div class="footer-pera">
                                     <p>Plataforma que une veterinarias para mejorar los servicios, apoyar el bienestar animal y el apoyo mutuo entre profesionales.</p>
                                </div>
                             </div>
                             <!-- social -->
                             <%--<div class="footer-social">
                                 <a href="https://www.facebook.com/sai4ull"><i class="fab fa-facebook-square"></i></a>
                                 <a href="#"><i class="fab fa-twitter-square"></i></a>
                                 <a href="#"><i class="fab fa-linkedin"></i></a>
                                 <a href="#"><i class="fab fa-pinterest-square"></i></a>
                             </div>--%>
                         </div>
                       </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-4 col-sm-5">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4>Asociación</h4>
                                <ul>
                                    <li><a href="#">Misión</a></li>
                                    <li><a href="#">Visión</a></li>
                                    <li><a href="#">Compromiso etico</a></li>
                                    <li><a href="#">Apoyo entre profesionales</a></li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4>¿Por qué elegirnos?</h4>
                                <ul>
                                    <li><a href="#">Plataforma amigable y fácil de usar</a></li>
                                    <li><a href="#">Consulta rápida con nuestro Chatbot inteligente</a></li>
                                    <li><a href="#">Seguridad y confidencialidad</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4>Sobre nosotros</h4>
                                <ul>
                                 <li><a href="#">Plataforma oficial de veterinarias de Riberalta</a></li>
                                 <li><a href="#"> Comprometidos con el bienestar animal</a></li>
                                 <li><a href="#">Ubicados en Riberalta-Beni, Bolivia</a></li>
                             </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer-bottom area -->
        <div class="footer-bottom-area">
            <div class="container">
                <div class="footer-border">
                     <div class="row d-flex align-items-center">
                         <div class="col-xl-12 ">
                             <div class="footer-copy-right text-center">
                                 <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Esta pagina fue hecho <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Vivi</a>
  <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
        <!-- Footer End-->
    </footer>
    <!-- Scroll Up -->
    <%--<div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>--%>


    <button id="chatButton"><i class="fab fa-reddit-alien"></i> Chat</button>

    <!-- Chatbot -->
        <div class="chat-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
            <div class="chat-header">
                Consulta con el Chatbot
                <button id="closeChat">✖</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot-message visible">
                    ¡Bienvenido! ¿En qué puedo ayudarte?
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="user-input" placeholder="Escribe tu mensaje..." />
                <%--<button id="btnvoz">
                    <i class="fas fa-microphone-slash"></i>
                </button>--%>
                <button id="btnenviar">
                    <i id="btn-icon" class="fas fa-paper-plane"></i>
                    <span id="btn-loading">...</span>
                </button>
            </div>
        </div>

    <!-- JS here -->

    

    <div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="miModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="miModalLabel">Título del Modal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-7">
                            <h6><i class="fa fa-certificate text-primary"></i>This is header 02</h6>
                            <%--<h4 class="mb-3"><i class="fa fa-certificate text-primary me-3"></i>Definition</h4>--%>
                            <span id="defini">hkjhkjhkjhkh
                            </span>

                            <h6 class="mt-3"><i class="fa fa-certificate text-primary"></i>This is header 01</h6>
                            <!-- <h5 class="mt-3 mb-2"><i class="fa fa-certificate text-primary me-3"></i>Specification</h5> -->
                            <p class="excert">etiqueta para la informacion</p>

                            <p class="mb-3" id="specifi">
                            </p>

                            <h6><i class="fa fa-certificate text-primary"></i>This is header 03</h6>

                            <p class="mb-2" id="packi">
                                indoododod
                            </p>

                        </div>
                        <div class="col-sm-5 text-center">
                            <h5 class="mb-3" id="typesa">sfdfsdfsdfsdf</h5>

                            <img id="imgUsuarioMx" src="recursos/img/gallery/blog1.png" alt="Foto usuario"
                                style="height: 250px; max-width: 250px;">
                        </div>

                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="genric-btn warning circle" data-dismiss="modal">Cerrar</button>
                    <%--<button type="button" class="btn btn-primary">Guardar cambios</button>--%>
                </div>

            </div>
        </div>
    </div>
    
    <script src="recursos/js/vendor/modernizr-3.5.0.min.js"></script>
    <!-- Jquery, Popper, Bootstrap -->
    <script src="recursos/js/vendor/jquery-1.12.4.min.js"></script>
    <script src="recursos/js/popper.min.js"></script>
    <script src="recursos/js/bootstrap.min.js"></script>
    <!-- Jquery Mobile Menu -->
    <script src="recursos/js/jquery.slicknav.min.js"></script>

    <!-- Jquery Slick , Owl-Carousel Plugins -->
    <script src="recursos/js/owl.carousel.min.js"></script>
    <script src="recursos/js/slick.min.js"></script>
    <!-- One Page, Animated-HeadLin -->
    <script src="recursos/js/wow.min.js"></script>
    <script src="recursos/js/animated.headline.js"></script>
    <script src="recursos/js/jquery.magnific-popup.js"></script>

    <!-- Nice-select, sticky -->
    <script src="recursos/js/jquery.nice-select.min.js"></script>
    <script src="recursos/js/jquery.sticky.js"></script>
    
    <!-- contact js -->
    <script src="recursos/js/contact.js"></script>
    <script src="recursos/js/jquery.form.js"></script>
    <script src="recursos/js/jquery.validate.min.js"></script>
    <script src="recursos/js/mail-script.js"></script>
    <script src="recursos/js/jquery.ajaxchimp.min.js"></script>
    
    <!-- Jquery Plugins, main Jquery -->	
    <script src="recursos/js/plugins.js"></script>
    <script src="recursos/js/main.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="js/DefaultOrig.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap"></script>
    </body>
</html>
