import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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
        </div>
    );
}