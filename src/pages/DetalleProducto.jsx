// src/pages/DetalleProducto.jsx
import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { obtenerProductoPorId } from '../data/mockData';

export default function DetalleProducto() {
    // useParams: extrae los parámetros de la URL → /producto/prod-001 → { id: 'prod-001' }
    const { id } = useParams();
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCart();

    // Se busca el producto en el inventario (mockData/localStorage)
    const producto = obtenerProductoPorId(id);

    const [cantidad, setCantidad] = useState(1);

    // ID inexistente: redirigir al catálogo
    if (!producto) {
        return <Navigate to="/catalogo" replace />;
    }

    // Alerta de stock bajo (<= stockCritico)
    const stockBajo = producto.stock <= producto.stockCritico;

    const handleAgregar = () => {
        agregarAlCarrito(producto, cantidad);
    };

    const handleComprarAhora = () => {
        agregarAlCarrito(producto, cantidad);
        navigate('/pago');
    };

    return (
        <div className="container my-5">
            <div className="row">

                {/* COLUMNA IZQUIERDA: Imagen, Características y Descripción */}
                <div className="col-lg-8 pe-lg-5">

                    {/* Imagen del Producto */}
                    <div
                        className="d-flex justify-content-center p-4 mb-4 rounded border"
                        style={{ backgroundColor: 'var(--bg-surface)' }}
                    >
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                        />
                    </div>

                    <hr className="my-5 border-secondary" />

                    {/* Características: se renderizan desde detalles.attr1..4 */}
                    <h3 className="fs-4 mb-4">Características del producto</h3>
                    <div className="row g-4 mb-4">
                        {Object.values(producto.detalles).map((detalle) => (
                            <div key={detalle.etiqueta} className="col-md-6 d-flex align-items-center gap-3">
                                <div
                                    className="p-3 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: '50px', height: '50px', backgroundColor: 'var(--bg-surface-elevated)' }}
                                >
                                    <span className="fw-bold fs-5" style={{ color: 'var(--text-muted)' }}>•</span>
                                </div>
                                <div>
                                    <span className="d-block text-muted" style={{ fontSize: '14px' }}>{detalle.etiqueta}</span>
                                    <span className="fw-bold">{detalle.valor}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="my-5 border-secondary" />

                    {/* Descripción */}
                    <h3 className="fs-4 mb-3">Descripción</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px' }}>
                        {producto.descripcion}
                    </p>
                </div>

                {/* COLUMNA DERECHA: Caja de Compra (Buy Box) */}
                <div className="col-lg-4">
                    <div
                        className="rounded p-4 shadow-sm position-sticky"
                        style={{ top: '20px', backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}
                    >
                        <p className="text-muted small mb-2">{producto.categoria.toUpperCase()} | Hobic</p>
                        <h1 className="fs-4 fw-bold mb-3">{producto.nombre}</h1>

                        {/* Precio con descuento */}
                        {producto.descuento > 0 && (
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <span className="text-decoration-line-through text-muted" style={{ fontSize: '15px' }}>
                                    ${producto.precioAnterior.toLocaleString('es-CL')}
                                </span>
                                <span className="badge" style={{ backgroundColor: '#e0006c' }}>
                                    -{producto.descuento}%
                                </span>
                            </div>
                        )}
                        <h2 className="display-6 fw-normal mb-3">
                            ${producto.precio.toLocaleString('es-CL')}
                        </h2>

                        {/* Envío */}
                        <div className="mb-4">
                            <p className="text-success fw-bold mb-1">Llega gratis mañana</p>
                            <p className="text-muted small ms-4 mb-0">Solo en Santiago</p>
                        </div>

                        {/* Stock y Cantidad */}
                        {stockBajo ? (
                            <p className="fw-bold mb-2" style={{ color: '#e0006c' }}>
                                ¡Últimas unidades! Solo quedan {producto.stock}
                            </p>
                        ) : (
                            <p className="text-success fw-bold mb-2">¡Stock disponible!</p>
                        )}
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <span className="text-muted small">Cantidad:</span>
                            <select
                                className="form-select form-select-sm w-auto fw-bold"
                                value={cantidad}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                            >
                                {Array.from({ length: producto.stock }, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>
                                        {num} unidad{num > 1 ? 'es' : ''}
                                    </option>
                                ))}
                            </select>
                            <span className="text-muted small">({producto.stock} disponibles)</span>
                        </div>

                        {/* Botones de Acción */}
                        <div className="d-flex flex-column gap-2">
                            <button
                                onClick={handleComprarAhora}
                                className="btn text-white py-2 fw-bold"
                                style={{ backgroundColor: '#3483fa' }}
                            >
                                Comprar ahora
                            </button>
                            <button
                                onClick={handleAgregar}
                                className="btn py-2 fw-bold"
                                style={{ backgroundColor: '#e3edfb', color: '#3483fa' }}
                            >
                                Agregar al carrito
                            </button>
                        </div>

                        {/* Info extra */}
                        <div className="mt-4 pt-3 border-top border-secondary">
                            <p className="text-muted small mb-1">Retira gratis a partir de mañana en sucursales.</p>
                            <p className="text-muted small mb-0">Devolución gratis. Tienes 30 días desde que lo recibes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}