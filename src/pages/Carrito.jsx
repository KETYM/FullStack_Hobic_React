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
        <div className="container mt-5">
            <h2 className="mb-4" style={{ color: '#ffffff' }}>Tu Carrito ({totalArticulos} artículos)</h2>
            <div className="row">
                {/* Columna de Productos */}
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <ul className="list-group list-group-flush">
                            {carrito.map((producto) => (
                                <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div className="d-flex align-items-center">
                                        <img 
                                            src={producto.imagen} 
                                            alt={producto.nombre} 
                                            style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
                                            className="me-3 border rounded"
                                        />
                                        <div>
                                            <h6 className="my-0 fw-bold" style={{ color: '#1e293b' }}>{producto.nombre}</h6>
                                            <small style={{ color: '#64748b' }}>Categoría: {producto.categoria}</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        {/* Controles de cantidad: "-" elimina el producto si cantidad es 1 */}
                                        <div className="btn-group btn-group-sm">
                                            <button 
                                                className="btn btn-outline-secondary" 
                                                onClick={() => {
                                                    if (producto.cantidad === 1) {
                                                        eliminarDelCarrito(producto.id);
                                                    } else {
                                                        cambiarCantidad(producto.id, -1);
                                                    }
                                                }}
                                            >-</button>
                                            <span 
                                                className="px-3 py-1 fw-bold d-flex align-items-center"
                                                style={{ backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px solid #dee2e6', minWidth: '40px', justifyContent: 'center' }}
                                            >{producto.cantidad}</span>
                                            <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                                        </div>
                                        <span className="fw-bold" style={{ color: '#1e293b' }}>${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</span>
                                        <button
                                            className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                                            style={{ width: '32px', height: '32px', borderRadius: '6px' }}
                                            onClick={() => eliminarDelCarrito(producto.id)}
                                            aria-label="Eliminar producto"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Columna de Resumen (Checkout) */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-4">
                        <h4 className="mb-3" style={{ color: '#ffffff' }}>Resumen de Compra</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#cbd5e1' }}>Subtotal</span>
                            <span style={{ color: '#ffffff' }}>${totalPlata.toLocaleString('es-CL')}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span style={{ color: '#cbd5e1' }}>Envío</span>
                            <span className="fw-bold" style={{ color: '#10b981' }}>Gratis</span>
                        </div>
                        <hr style={{ borderColor: '#475569' }} />
                        <div className="d-flex justify-content-between mb-4">
                            <strong style={{ color: '#ffffff' }}>Total a Pagar</strong>
                            <strong style={{ color: '#ffffff' }}>${totalPlata.toLocaleString('es-CL')}</strong>
                        </div>
                        <button className="btn btn-success w-100 fw-bold"
                            onClick={() => navigate('/pago')}>
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
