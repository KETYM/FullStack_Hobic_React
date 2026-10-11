// src/pages/Categorias.jsx
import { useParams, Navigate } from 'react-router-dom';
import { obtenerProductosPorCategoria } from '../data/mockData';
import ProductCard from '../components/ProductCard';

// Título e ícono por cada slug válido de categoría
const CATEGORIAS = {
    libros: { titulo: 'Nuestros Libros', icono: '📚' },
    mangas: { titulo: 'Nuestros Mangas', icono: '📖' },
    series: { titulo: 'Nuestras Series', icono: '📺' },
    videojuegos: { titulo: 'Nuestros Videojuegos', icono: '🎮' },
};

export default function Categorias() {
    const { slug } = useParams();

    // Slug inválido en la URL → volver al catálogo general
    if (!CATEGORIAS[slug]) {
        return <Navigate to="/catalogo" replace />;
    }

    const productos = obtenerProductosPorCategoria(slug);
    const { titulo, icono } = CATEGORIAS[slug];

    return (
        <div className="container my-5">
            {/* Encabezado estilo original */}
            <div className="d-flex justify-content-center align-items-center mb-5 mt-4">
                <span style={{ fontSize: '2.25rem' }}>{icono}</span>
                <h1 className="titulo-catalogo mb-0 ms-3">{titulo}</h1>
            </div>

            {productos.length === 0 ? (
                <p className="text-center text-muted">No hay productos en esta categoría todavía.</p>
            ) : (
                <div className="row g-4">
                    {productos.map((producto) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={producto.id}>
                            <ProductCard producto={producto} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}