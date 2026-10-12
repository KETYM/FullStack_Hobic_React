import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ producto, ...props }) {
    const item = producto || props;
    const { agregarAlCarrito } = useCart();

    const handleAgregar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        agregarAlCarrito(item);
    };

    const categoriaNombre = (item.categoria || 'GENERAL').toUpperCase();
    const tieneDescuento = item.descuento && item.descuento > 0;

    return (
        <div className="card h-100 shadow-sm border-0 position-relative transition-all bg-white rounded-3 overflow-hidden">
            {/* Etiqueta de Descuento Visual */}
            {tieneDescuento && (
                <div
                    className="position-absolute top-0 end-0 text-white px-2 py-1 m-2 rounded fw-bold z-1 small"
                    style={{ backgroundColor: '#e0006c' }}
                >
                    -{item.descuento}%
                </div>
            )}

            {/* Imagen con Enlace al Detalle */}
            <Link
                to={`/producto/${item.id}`}
                className="d-flex justify-content-center align-items-center p-3 text-decoration-none"
                style={{ backgroundColor: '#f8f9fa', height: '220px' }}
            >
                <img
                    src={item.imagen}
                    className="img-fluid"
                    style={{ maxHeight: '100%', objectFit: 'contain' }}
                    alt={item.nombre}
                    loading="lazy"
                />
            </Link>

            {/* Cuerpo de la Tarjeta */}
            <div className="card-body d-flex flex-column p-3">
                <span className="badge bg-secondary mb-2 align-self-start" style={{ fontSize: '11px' }}>
                    {categoriaNombre}
                </span>

                <Link
                    to={`/producto/${item.id}`}
                    className="text-decoration-none text-dark"
                >
                    <h6 className="card-title text-truncate fw-bold mb-2" title={item.nombre} style={{ fontSize: '15px' }}>
                        {item.nombre}
                    </h6>
                </Link>

                <div className="mt-auto pt-2">
                    <div className="d-flex align-items-baseline gap-2 mb-3">
                        <span className="fs-5 fw-bold text-dark">
                            ${Number(item.precio || 0).toLocaleString('es-CL')}
                        </span>
                        {item.precioAnterior && (
                            <span className="text-decoration-line-through text-muted small">
                                ${Number(item.precioAnterior).toLocaleString('es-CL')}
                            </span>
                        )}
                    </div>

                    <button
                        className="btn btn-dark w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 py-2"
                        onClick={handleAgregar}
                    >
                        <span>🛒</span>
                        <span>Agregar al Carrito</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
