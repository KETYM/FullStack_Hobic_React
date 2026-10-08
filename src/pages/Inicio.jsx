import { Link } from 'react-router-dom';

export default function Inicio() {
    return (
        <div className="container mt-5 mb-5">
            {/* Sección Principal (Hero) */}
            <div className="p-5 text-center rounded-4 shadow-sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                <h1 className="display-4 fw-bold mb-3 text-dark">
                    Bienvenido a HOBI<span style={{ color: '#e0006c' }}>C</span>
                </h1>
                <p className="lead mb-4 text-secondary">
                    Tu tienda definitiva de mangas, juegos, figuras y accesorios. 
                    Encuentra tus hobbies favoritos en un solo lugar.
                </p>
                <Link to="/catalogo" className="btn btn-dark btn-lg px-5 py-2 fw-bold shadow-sm">
                    Explorar Catálogo
                </Link>
            </div>

            {/* Sección de Categorías Destacadas */}
            <div className="row mt-5 text-center g-4">
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm p-4 transition-all">
                        <div className="display-4 mb-3">📚</div>
                        <h4 className="fw-bold">Mangas</h4>
                        <p className="text-muted mb-0">Las últimas novedades y los clásicos que no pueden faltar en tu colección.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm p-4 transition-all">
                        <div className="display-4 mb-3">🎮</div>
                        <h4 className="fw-bold">Videojuegos</h4>
                        <p className="text-muted mb-0">Explora nuevos mundos y desafíos con nuestro catálogo gamer.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm p-4 transition-all">
                        <div className="display-4 mb-3">✨</div>
                        <h4 className="fw-bold">Figuras</h4>
                        <p className="text-muted mb-0">Coleccionables de alta calidad para adornar tus espacios favoritos.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}