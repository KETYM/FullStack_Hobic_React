import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function Inicio() {
    const [promos] = useState(() => {
        const productos = obtenerProductos();
        return productos.filter(p => p.promo || (p.descuento && p.descuento > 0));
    });

    return (
        <div>
            {/* Banner Principal */}
            <div className="w-100 position-relative overflow-hidden" style={{ maxHeight: '420px', backgroundColor: '#0d1527' }}>
                <img 
                    src="/imagenes/banner.jpeg" 
                    alt="Hobic Banner" 
                    className="w-100 h-100" 
                    style={{ objectFit: 'cover', minHeight: '260px', maxHeight: '420px', opacity: 0.9 }}
                />
            </div>

            {/* Título de Bienvenida */}
            <div className="container mt-4 mb-4 text-center">
                <div className="d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e0006c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                        <polyline points="17 2 12 7 7 2"></polyline>
                    </svg>
                    <h1 className="fw-black mb-0 display-6" style={{ letterSpacing: '1px' }}>
                        BIENVENIDOS A HOBI<span style={{ color: '#e0006c' }}>C</span>
                    </h1>
                </div>
                <p className="text-muted mt-2">Tu tienda definitiva de mangas, libros, series y videojuegos en Chile</p>
            </div>

            <main className="container mb-5">
                {/* SECCIÓN 1: QUIÉNES SOMOS */}
                <section id="quienes-somos" className="my-5">
                    <div 
                        className="card shadow-sm p-4 p-md-5 border-0 rounded-4"
                        style={{ backgroundColor: '#ffffff', borderLeft: '6px solid #043b7a !important' }}
                    >
                        <h2 className="fw-bold mb-3 fs-3" style={{ color: '#043b7a' }}>Quiénes somos</h2>
                        <p className="text-secondary mb-4" style={{ fontSize: '16px', lineHeight: '1.7', textAlign: 'justify' }}>
                            Hobic es una tienda online especializada en la venta de productos relacionados con el mundo del
                            entretenimiento, incluyendo libros, series, videojuegos y mangas. Nuestro objetivo es ofrecer a
                            nuestros clientes una experiencia de compra única y satisfactoria, brindando productos de
                            calidad y un servicio excepcional.
                        </p>
                        <div className="d-flex justify-content-end">
                            <Link 
                                to="/contacto" 
                                className="btn text-white px-4 py-2 fw-semibold rounded-3 shadow-sm"
                                style={{ backgroundColor: '#043b7a' }}
                            >
                                Contáctanos →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: EXPLORA POR CATEGORÍA */}
                <section className="my-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold fs-3 text-dark">EXPLORA NUESTROS UNIVERSOS</h2>
                        <p className="text-muted small">Selecciona una categoría para ver todos sus productos</p>
                    </div>

                    <div className="row g-4 text-center">
                        {/* Videojuegos */}
                        <div className="col-6 col-md-3">
                            <Link to="/catalogo?categoria=videojuegos" className="text-decoration-none">
                                <div className="card shadow-sm border-0 h-100 py-4 px-2 rounded-4 bg-light hover-shadow transition-all">
                                    <div className="display-5 mb-2">🎮</div>
                                    <h5 className="fw-bold text-dark mt-2">Videojuegos</h5>
                                    <span className="text-muted small">Ver catálogo &rarr;</span>
                                </div>
                            </Link>
                        </div>

                        {/* Mangas */}
                        <div className="col-6 col-md-3">
                            <Link to="/catalogo?categoria=mangas" className="text-decoration-none">
                                <div className="card shadow-sm border-0 h-100 py-4 px-2 rounded-4 bg-light hover-shadow transition-all">
                                    <div className="display-5 mb-2">📖</div>
                                    <h5 className="fw-bold text-dark mt-2">Mangas</h5>
                                    <span className="text-muted small">Ver catálogo &rarr;</span>
                                </div>
                            </Link>
                        </div>

                        {/* Series */}
                        <div className="col-6 col-md-3">
                            <Link to="/catalogo?categoria=series" className="text-decoration-none">
                                <div className="card shadow-sm border-0 h-100 py-4 px-2 rounded-4 bg-light hover-shadow transition-all">
                                    <div className="display-5 mb-2">📺</div>
                                    <h5 className="fw-bold text-dark mt-2">Series</h5>
                                    <span className="text-muted small">Ver catálogo &rarr;</span>
                                </div>
                            </Link>
                        </div>

                        {/* Libros */}
                        <div className="col-6 col-md-3">
                            <Link to="/catalogo?categoria=libros" className="text-decoration-none">
                                <div className="card shadow-sm border-0 h-100 py-4 px-2 rounded-4 bg-light hover-shadow transition-all">
                                    <div className="display-5 mb-2">📚</div>
                                    <h5 className="fw-bold text-dark mt-2">Libros</h5>
                                    <span className="text-muted small">Ver catálogo &rarr;</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 3: BENEFICIOS */}
                <section className="my-5 py-4">
                    <div className="row g-4 text-center">
                        <div className="col-md-4">
                            <div className="p-4 border rounded-4 shadow-sm bg-white h-100">
                                <div className="display-6 mb-3 text-danger">🚚</div>
                                <h5 className="fw-bold" style={{ color: '#043b7a' }}>Envíos a todo Chile</h5>
                                <p className="text-muted small mb-0">Despachos rápidos y seguros para que tu aventura comience cuanto antes.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 border rounded-4 shadow-sm bg-white h-100">
                                <div className="display-6 mb-3 text-danger">🔒</div>
                                <h5 className="fw-bold" style={{ color: '#043b7a' }}>Pago 100% Seguro</h5>
                                <p className="text-muted small mb-0">Tus datos están protegidos. Aceptamos todas las tarjetas de crédito y débito.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 border rounded-4 shadow-sm bg-white h-100">
                                <div className="display-6 mb-3 text-danger">⭐</div>
                                <h5 className="fw-bold" style={{ color: '#043b7a' }}>Calidad Garantizada</h5>
                                <p className="text-muted small mb-0">Productos originales y seleccionados por expertos para coleccionistas.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 4: PROMOS DESTACADAS */}
                <section className="my-5">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                        <div>
                            <h2 className="mb-0 fs-3 fw-bold">Promos Destacadas</h2>
                            <p className="text-muted small mb-0">Ofertas por tiempo limitado con los mejores precios</p>
                        </div>
                        <span className="badge bg-danger px-3 py-2 fs-6">
                            🔥 Ofertas Especiales
                        </span>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {promos.slice(0, 8).map((producto) => (
                            <div className="col" key={producto.id}>
                                <ProductCard producto={producto} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <Link to="/catalogo" className="btn btn-outline-dark btn-lg px-5 fw-bold rounded-pill">
                            Ver Todo el Catálogo →
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}