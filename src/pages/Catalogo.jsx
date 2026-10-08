import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState('todos');
    
    // Importamos la función de nuestro contexto corregido
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        // En el futuro, esto será un fetch a tu API de Spring Boot.
        // Por ahora, lee el mismo inventario que crea el Admin.
        const cargarProductos = () => {
            try {
                const inventarioGuardado = JSON.parse(localStorage.getItem("inventarioHobic")) || [];
                setProductos(inventarioGuardado);
            } catch (error) {
                console.error("Error al cargar el inventario", error);
                setProductos([]);
            }
        };
        cargarProductos();
    }, []);

    // Lógica para filtrar los productos según el botón seleccionado
    const productosFiltrados = filtro === 'todos' 
        ? productos 
        : productos.filter(prod => prod.categoria === filtro);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 fw-bold">Catálogo Hobic</h2>

            {/* Botones de Filtro */}
            <div className="d-flex justify-content-center mb-5 gap-2 flex-wrap">
                <button 
                    className={`btn ${filtro === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => setFiltro('todos')}
                >
                    Todos
                </button>
                <button 
                    className={`btn ${filtro === 'manga' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => setFiltro('manga')}
                >
                    Mangas
                </button>
                <button 
                    className={`btn ${filtro === 'juegos' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => setFiltro('juegos')}
                >
                    Juegos
                </button>
                <button 
                    className={`btn ${filtro === 'figuras' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => setFiltro('figuras')}
                >
                    Figuras
                </button>
                <button 
                    className={`btn ${filtro === 'accesorios' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => setFiltro('accesorios')}
                >
                    Accesorios
                </button>
            </div>

            {/* Grilla de Productos */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {productosFiltrados.length === 0 ? (
                    <div className="col-12 text-center mt-5">
                        <h4 className="text-muted">No hay productos disponibles en esta categoría.</h4>
                        <p>Prueba agregando algunos desde el panel de Administración.</p>
                    </div>
                ) : (
                    productosFiltrados.map((producto) => (
                        <div className="col" key={producto.id}>
                            <div className="card h-100 shadow-sm border-0 position-relative">
                                {/* Etiqueta de Descuento Visual */}
                                {producto.descuento > 0 && (
                                    <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded fw-bold z-1">
                                        -{producto.descuento}%
                                    </div>
                                )}
                                
                                <img 
                                    src={producto.imagen} 
                                    className="card-img-top p-3" 
                                    alt={producto.nombre} 
                                    style={{ height: '250px', objectFit: 'contain' }}
                                    loading="lazy"
                                />
                                
                                <div className="card-body d-flex flex-column bg-light">
                                    <span className="badge bg-secondary mb-2 align-self-start">
                                        {producto.categoria.toUpperCase()}
                                    </span>
                                    <h5 className="card-title text-truncate" title={producto.nombre}>
                                        {producto.nombre}
                                    </h5>
                                    
                                    <div className="mt-auto pt-3">
                                        <p className="fs-5 fw-bold mb-3 text-dark">
                                            ${producto.precio.toLocaleString('es-CL')}
                                        </p>
                                        <button 
                                            className="btn btn-dark w-100 fw-bold transition-all"
                                            onClick={() => agregarAlCarrito(producto)}
                                        >
                                            <i className="bi bi-cart-plus me-2"></i> 
                                            Agregar al Carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}