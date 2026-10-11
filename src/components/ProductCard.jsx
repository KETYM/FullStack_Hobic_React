import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

<<<<<<< HEAD
export default function ProductCard({ producto }) {
    const { agregarAlCarrito } = useCart();

    return (
        <div className="card h-100 shadow-sm border-light position-relative">
            {/* Imagen enlazada a la ficha del producto */}
            <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                <div className="bg-light d-flex justify-content-center align-items-center p-3" style={{ height: '200px' }}>
                    <img
                        src={producto.imagen}
                        className="img-fluid"
                        style={{ maxHeight: '100%', objectFit: 'contain' }}
                        alt={producto.nombre}
                        loading="lazy"
                    />
                </div>
            </Link>

            <div className='card-body d-flex flex-column pb-5 bg-light'>
                <small className='fw-bold text-primary' style={{ fontSize: '12px' }}>
                    {producto.categoria.toUpperCase()}
                </small>
                <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                    <h6 className="card-title text-secondary mt-2 mb-3 flex-grow-1">{producto.nombre}</h6>
                </Link>
                <div>
                    {producto.descuento > 0 && (
                        <span className='text-decoration-line-through text-muted' style={{ fontSize: '13px' }}>
                            ${producto.precioAnterior.toLocaleString('es-CL')}
                        </span>

                    )}

                    <div className='d-flex align-items-center gap-2'>
                        <span className="fs-5 fw-bold text-dark">${producto.precio.toLocaleString('es-CL')}</span>
                        {producto.descuento > 0 && (
                            <span className='badge' style={{ backgroundColor: '#e0006c' }}>
                                -{producto.descuento}%
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Botón circular: agrega al carrito sin salir de la página */}
            <button
                className='btn btn-dark rounded-circle position-absolute d-flex justify-content-center align-items-center p-0'
                style={{ bottom: '15px', right: '15px', width: '40px', height: '40px' }}
                onClick={() => agregarAlCarrito(producto)}
                aria-label={`Agregar ${producto.nombre} al carrito`}>🛒</button>
=======
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
>>>>>>> 61366edc36d6442c6715748649867781d64a2716
        </div>
    );
}