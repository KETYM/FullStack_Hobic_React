import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header() {
    const { totalArticulos } = useCart();
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleBuscar = (e) => {
        e.preventDefault();
        const texto = terminoBusqueda.trim();
        if (texto) {
            navigate(`/catalogo?buscar=${encodeURIComponent(texto)}`);
            setTerminoBusqueda('');
        } else {
            navigate('/catalogo');
        }
    };

    const esAdmin = usuario?.rol === 'admin';
    const esVendedor = usuario?.rol === 'vendedor';
    const esStaff = esAdmin || esVendedor;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark px-3 py-2 shadow-sm sticky-top" style={{ backgroundColor: '#0d1527' }}>
            <div className="container-fluid">
                {/* Logo Hobic */}
                <Link to="/" className="navbar-brand text-white fw-bold fs-3 me-3" style={{ textDecoration: 'none' }}>
                    HOBI<span style={{ color: '#e0006c' }}>C</span>
                </Link>

                {/* Botón hamburguesa para móviles */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarHobic"
                    aria-controls="navbarHobic"
                    aria-expanded="false"
                    aria-label="Alternar navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú Colapsable */}
                <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarHobic">
                    {/* Enlaces Principales */}
                    <ul className="navbar-nav me-auto mb-3 mb-lg-0 gap-1 gap-lg-2 text-center text-lg-start">
                        <li className="nav-item">
                            <Link className="nav-link text-white hover-pink fw-semibold" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white hover-pink fw-semibold" to="/catalogo">Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/ofertas" style={{ color: '#e0006c' }}>
                                Ofertas
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle text-white fw-semibold cursor-pointer"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Categorías
                            </span>
                            <ul className="dropdown-menu dropdown-menu-dark shadow">
                                <li><Link className="dropdown-item" to="/categoria/libros">Libros</Link></li>
                                <li><Link className="dropdown-item" to="/categoria/mangas">Mangas</Link></li>
                                <li><Link className="dropdown-item" to="/categoria/series">Series</Link></li>
                                <li><Link className="dropdown-item" to="/categoria/videojuegos">Videojuegos</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white hover-pink fw-semibold" to="/nosotros">Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white hover-pink fw-semibold" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white hover-pink fw-semibold" to="/contacto">Contacto</Link>
                        </li>

                        {/* Control de Acceso Staff */}
                        {esStaff && (
                            <li className="nav-item dropdown ms-lg-2">
                                <span className="nav-link dropdown-toggle text-warning fw-bold cursor-pointer" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ⚙️ Gestión
                                </span>
                                <ul className="dropdown-menu dropdown-menu-dark shadow">
                                    <li><Link className="dropdown-item" to="/admin">📦 Inventario</Link></li>
                                    <li><Link className="dropdown-item" to="/ventas">📊 Ventas y Despachos</Link></li>
                                    {esAdmin && (
                                        <>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link className="dropdown-item text-danger fw-semibold" to="/adminUsuarios">👥 Usuarios</Link></li>
                                        </>
                                    )}
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Buscador Ovalado Minimalista */}
                    <form onSubmit={handleBuscar} className="d-flex mb-3 mb-lg-0 me-lg-3 justify-content-center" role="search">
                        <div className="input-group navbar-search-pill" style={{ maxWidth: '300px', width: '100%' }}>
                            <span className="input-group-text bg-transparent border-0 text-white-50 pe-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>
                            <input
                                className="form-control bg-transparent text-white border-0 shadow-none ps-1"
                                type="search"
                                placeholder="Buscar en Hobic..."
                                aria-label="Buscar"
                                value={terminoBusqueda}
                                onChange={(e) => setTerminoBusqueda(e.target.value)}
                                style={{ fontSize: '0.88rem' }}
                            />
                        </div>
                    </form>

                    {/* Controles de Sesión y Carrito */}
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        {usuario ? (
                            <div className="d-flex align-items-center gap-2">
                                <div className="text-white small text-nowrap">
                                    Hola, <strong>{usuario.nombre}</strong>
                                    {esAdmin && <span className="badge bg-danger ms-1" style={{ fontSize: '10px' }}>Admin</span>}
                                    {esVendedor && <span className="badge bg-warning text-dark ms-1" style={{ fontSize: '10px' }}>Vendedor</span>}
                                </div>
                                <button onClick={handleLogout} className="btn btn-sm btn-outline-danger text-nowrap">
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <Link to="/inicioSesion" className="btn btn-sm btn-outline-light text-nowrap px-3">
                                Ingresar
                            </Link>
                        )}

                        {/* Carrito de Compras en blanco plano */}
                        <Link to="/carrito" className="text-white text-decoration-none position-relative p-2" title="Ver carrito">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            {totalArticulos > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                                    {totalArticulos}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}