import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Carrito() {
    const { carrito, cambiarCantidad, eliminarDelCarrito, totalArticulos, totalPlata } = useCart();

    if (carrito.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Tu carrito está vacío</h2>
                <p className="text-muted">¡Parece que aún no has agregado tus mangas o juegos favoritos!</p>
                <Link to="/catalogo" className="btn btn-primary mt-3">Volver al Catálogo</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Tu Carrito ({totalArticulos} artículos)</h2>
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
                                            <h6 className="my-0">{producto.nombre}</h6>
                                            <small className="text-muted">Categoría: {producto.categoria}</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        {/* Controles de cantidad */}
                                        <div className="btn-group btn-group-sm">
                                            <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, -1)}>-</button>
                                            <span className="btn btn-light disabled text-dark">{producto.cantidad}</span>
                                            <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                                        </div>
                                        <span className="fw-bold">${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</span>
                                        <button className="btn btn-sm btn-danger" onClick={() => eliminarDelCarrito(producto.id)}>
                                            🗑️
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
                        <h4 className="mb-3">Resumen de Compra</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>${totalPlata.toLocaleString('es-CL')}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 text-success">
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4">
                            <strong>Total a Pagar</strong>
                            <strong>${totalPlata.toLocaleString('es-CL')}</strong>
                        </div>
                        <button className="btn btn-success w-100 fw-bold">
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}