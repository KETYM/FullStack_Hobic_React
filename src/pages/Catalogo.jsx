import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { obtenerProductos } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function Catalogo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filtro = searchParams.get('categoria') || 'todos';

    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState(() => searchParams.get('buscar') || '');

    useEffect(() => {
        const cargarProductos = () => {
            try {
                const lista = obtenerProductos();
                setProductos(lista || []);
            } catch (error) {
                console.error("Error al cargar el inventario", error);
                setProductos([]);
            }
        };
        cargarProductos();
    }, []);

    const cambiarFiltro = (nuevaCategoria) => {
        const params = new URLSearchParams(searchParams);
        if (nuevaCategoria === 'todos') {
            params.delete('categoria');
        } else {
            params.set('categoria', nuevaCategoria);
        }
        setSearchParams(params);
    };

    // Lógica para filtrar los productos según categoría y texto de búsqueda
    const productosFiltrados = productos.filter((prod) => {
        const coincideCategoria = filtro === 'todos' || prod.categoria.toLowerCase() === filtro.toLowerCase();
        const coincideBusqueda = busqueda.trim() === '' || 
            prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            prod.categoria.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 fw-bold">Catálogo Hobic</h2>

            {/* Buscador */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-6 col-lg-5">
                    <div className="input-group catalogo-search-group">
                        <span className="input-group-text">
                            🔍
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por título o categoría..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        {busqueda && (
                            <button 
                                className="btn btn-outline-secondary" 
                                type="button" 
                                onClick={() => setBusqueda('')}
                            >
                                ✖
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Botones de Filtro por Categorías Reales */}
            <div className="d-flex justify-content-center mb-5 gap-2 flex-wrap">
                <button 
                    className={`btn ${filtro === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => cambiarFiltro('todos')}
                >
                    Todos
                </button>
                <button 
                    className={`btn ${filtro === 'mangas' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => cambiarFiltro('mangas')}
                >
                    Mangas
                </button>
                <button 
                    className={`btn ${filtro === 'videojuegos' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => cambiarFiltro('videojuegos')}
                >
                    Videojuegos
                </button>
                <button 
                    className={`btn ${filtro === 'series' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => cambiarFiltro('series')}
                >
                    Series
                </button>
                <button 
                    className={`btn ${filtro === 'libros' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => cambiarFiltro('libros')}
                >
                    Libros
                </button>
            </div>

            {/* Grilla de Productos */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {productosFiltrados.length === 0 ? (
                    <div className="col-12 text-center mt-5 py-5">
                        <h4 className="text-muted fw-bold">No se encontraron productos</h4>
                        <p className="text-muted">Prueba con otra categoría o término de búsqueda.</p>
                        {filtro !== 'todos' && (
                            <button className="btn btn-sm btn-outline-primary mt-2" onClick={() => cambiarFiltro('todos')}>
                                Ver todos los productos
                            </button>
                        )}
                    </div>
                ) : (
                    productosFiltrados.map((producto) => (
                        <div className="col" key={producto.id}>
                            <ProductCard producto={producto} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}