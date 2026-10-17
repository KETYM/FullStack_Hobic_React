import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Carrito() {
    const { carrito, cambiarCantidad, eliminarDelCarrito, totalArticulos, totalPlata } = useCart();
    const navigate = useNavigate();

    if (carrito.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2 style={{ color: '#ffffff' }}>Tu carrito está vacío</h2>
                <p style={{ color: '#cbd5e1' }}>¡Parece que aún no has agregado tus mangas o juegos favoritos!</p>
                <Link to="/catalogo" className="btn btn-primary mt-3">Volver al Catálogo</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4" style={{ color: '#ffffff' }}>Tu Carrito ({totalArticulos} artículos)</h2>
            <div className="row g-4">
                {/* Columna de Productos */}
                <div className="col-lg-8">
                    <div className="card shadow-sm mb-4 border-0 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                        <ul className="list-group list-group-flush">
                            {carrito.map((producto) => (
                                <li key={producto.id} className="list-group-item py-3 px-3 border-bottom" style={{ backgroundColor: '#ffffff' }}>
                                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
                                        {/* Fila 1 en móvil: Imagen y Nombre del producto */}
                                        <div className="d-flex align-items-center me-sm-2">
                                            <img
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                style={{ width: '60px', height: '70px', objectFit: 'cover' }}
                                                className="me-3 rounded border flex-shrink-0"
                                            />
                                            <div>
                                                {/* Título en texto oscuro explícito */}
                                                <h6 className="my-0 fw-bold" style={{ fontSize: '1rem', color: '#0f172a' }}>
                                                    {producto.nombre}
                                                </h6>
                                                <small style={{ color: '#64748b' }}>
                                                    Categoría: <span className="text-capitalize" style={{ color: '#334155' }}>{producto.categoria}</span>
                                                </small>
                                            </div>
                                        </div>

                                        {/* Fila 2 en móvil: Controles, Precio y Eliminar */}
                                        <div className="d-flex align-items-center justify-content-between w-100 w-sm-auto gap-3 pt-2 pt-sm-0 border-top border-sm-0">
                                            {/* Control de cantidad con números visibles */}
                                            <div className="btn-group btn-group-sm border rounded" style={{ backgroundColor: '#f8fafc', borderColor: '#cbd5e1' }}>
                                                <button
                                                    className="btn btn-outline-secondary border-0 fw-bold px-2"
                                                    style={{ color: '#0f172a' }}
                                                    onClick={() => {
                                                        if (producto.cantidad === 1) {
                                                            eliminarDelCarrito(producto.id);
                                                        } else {
                                                            cambiarCantidad(producto.id, -1);
                                                        }
                                                    }}
                                                >-</button>
                                                <span className="btn bg-transparent border-0 disabled fw-bold px-2" style={{ color: '#0f172a', opacity: 1 }}>
                                                    {producto.cantidad}
                                                </span>
                                                <button
                                                    className="btn btn-outline-secondary border-0 fw-bold px-2"
                                                    style={{ color: '#0f172a' }}
                                                    onClick={() => cambiarCantidad(producto.id, 1)}
                                                >+</button>
                                            </div>

                                            {/* Precio en pesos visible */}
                                            <span className="fw-bold" style={{ fontSize: '1.05rem', color: '#0f172a' }}>
                                                ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                                            </span>

                                            {/* Botón Eliminar plano */}
                                            <button
                                                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-1"
                                                style={{ width: '32px', height: '32px', borderRadius: '6px' }}
                                                onClick={() => eliminarDelCarrito(producto.id)}
                                                aria-label="Eliminar producto"
                                                title="Quitar producto"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Columna de Resumen (Checkout con contenedor oscuro definido) */}
                <div className="col-lg-4">
                    <div className="card shadow-sm p-4 border-0 rounded-3" style={{ backgroundColor: '#131b2e', border: '1px solid #334155' }}>
                        <h4 className="mb-3 fw-bold" style={{ color: '#ffffff' }}>Resumen de Compra</h4>
                        
                        <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#cbd5e1' }}>Subtotal</span>
                            <span className="fw-semibold" style={{ color: '#ffffff' }}>${totalPlata.toLocaleString('es-CL')}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between mb-3 fw-semibold">
                            <span style={{ color: '#cbd5e1' }}>Envío</span>
                            <span style={{ color: '#4ade80' }}>Gratis</span>
                        </div>
                        
                        <hr style={{ borderColor: '#334155' }} />
                        
                        <div className="d-flex justify-content-between mb-4">
                            <strong className="fs-5" style={{ color: '#ffffff' }}>Total a Pagar</strong>
                            <strong className="fs-5" style={{ color: '#ffffff' }}>${totalPlata.toLocaleString('es-CL')}</strong>
                        </div>
                        
                        <button className="btn btn-primary w-100 fw-bold py-2 shadow-sm"
                            onClick={() => navigate('/pago')}
                            style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                            Proceder al Pago →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}