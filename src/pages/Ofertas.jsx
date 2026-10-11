// src/pages/Ofertas.jsx
import { obtenerOfertas } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function Ofertas() {
    const ofertas = obtenerOfertas();

    return (
        <div className="container my-5">
            {/* Encabezado estilo original */}
            <div className="d-flex justify-content-center align-items-center mb-5 mt-4">
                <span style={{ fontSize: '2.25rem' }}>🏷️</span>
                <h1 className="titulo-catalogo mb-0 ms-3">Ofertas de la Semana</h1>
            </div>

            {ofertas.length === 0 ? (
                <p className="text-center text-muted">No hay ofertas disponibles en este momento. ¡Vuelve pronto!</p>
            ) : (
                <div className="row g-4">
                    {ofertas.map((producto) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={producto.id}>
                            <ProductCard producto={producto} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}