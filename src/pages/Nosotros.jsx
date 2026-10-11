import { Link } from 'react-router-dom';

export default function Nosotros() {
    return (
        <div className="container my-5">
            {/* Encabezado con Imagen y Texto */}
            <div className="row align-items-center mb-5 pb-5 border-bottom">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="position-relative">
                        <img 
                            src="/imagenes/quienesSomos.jpg" 
                            alt="Sobre Hobic" 
                            className="img-fluid rounded-4 shadow-sm w-100" 
                            style={{ objectFit: 'cover', maxHeight: '400px' }}
                        />
                    </div>
                </div>
                <div className="col-lg-6 px-lg-5">
                    <span className="badge px-3 py-2 mb-2 text-white" style={{ backgroundColor: '#e0006c' }}>
                        Nuestra Pasión
                    </span>
                    <h1 className="fw-bold mb-4 display-5 text-dark">
                        Nuestra <span style={{ color: '#043b7a' }}>Historia</span>
                    </h1>
                    <p className="text-secondary mb-4" style={{ fontSize: '16px', lineHeight: '1.8', textAlign: 'justify' }}>
                        Hobic nació como una tienda online especializada en la venta de productos relacionados con el fascinante mundo del entretenimiento: 
                        <strong> libros, series, videojuegos y mangas</strong>.
                    </p>
                    <p className="text-secondary mb-4" style={{ fontSize: '16px', lineHeight: '1.8', textAlign: 'justify' }}>
                        Nuestro objetivo principal es ofrecer a nuestros clientes una experiencia de compra única, brindando productos de altísima calidad, 
                        ediciones especiales y un servicio al cliente excepcional diseñado por y para fans del coleccionismo en Chile.
                    </p>
                    <Link to="/contacto" className="btn btn-dark px-4 py-2 rounded-3 fw-bold">
                        Habla con nosotros →
                    </Link>
                </div>
            </div>

            {/* Tarjetas de Misión y Visión */}
            <div className="row g-4 justify-content-center">
                {/* Misión */}
                <div className="col-md-6">
                    <div className="card h-100 p-4 border-0 shadow-sm text-center bg-light rounded-4" style={{ borderBottom: '4px solid #043b7a !important' }}>
                        <div className="mb-3 d-flex justify-content-center">
                            <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(4, 59, 122, 0.1)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#043b7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                    <path d="M2 17l10 5 10-5"></path>
                                    <path d="M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                        </div>
                        <h4 className="fw-bold mb-3 text-dark">Nuestra Misión</h4>
                        <p className="text-muted mb-0" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                            Llevar a cada rincón de Chile las mejores historias, aventuras y colecciones, creando una comunidad apasionada por la cultura geek y el entretenimiento.
                        </p>
                    </div>
                </div>
                
                {/* Visión */}
                <div className="col-md-6">
                    <div className="card h-100 p-4 border-0 shadow-sm text-center bg-light rounded-4" style={{ borderBottom: '4px solid #e0006c !important' }}>
                        <div className="mb-3 d-flex justify-content-center">
                            <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(224, 0, 108, 0.1)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e0006c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <circle cx="12" cy="12" r="6"></circle>
                                    <circle cx="12" cy="12" r="2"></circle>
                                </svg>
                            </div>
                        </div>
                        <h4 className="fw-bold mb-3 text-dark">Nuestra Visión</h4>
                        <p className="text-muted mb-0" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                            Convertirnos en el punto de encuentro número uno para coleccionistas y aficionados, destacando por nuestro catálogo exclusivo y atención cercana.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
