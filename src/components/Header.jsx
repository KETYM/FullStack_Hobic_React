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
        <nav className="navbar navbar-expand-xl px-3 py-3 shadow-sm sticky-top" style={{ backgroundColor: '#0d1527' }}>
            <div className="container-fluid">
                {/* Logo Hobic */}
                <Link to="/" className="navbar-brand text-white fw-bold fs-3 me-3" style={{ textDecoration: 'none' }}>
                    HOBI<span style={{ color: '#e0006c' }}>C</span>
                </Link>

                {/* Botón hamburguesa para móviles */}
                <button 
                    className="navbar-toggler navbar-dark border-0" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarHobic" 
                    aria-controls="navbarHobic" 
                    aria-expanded="false" 
                    aria-label="Alternar navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarHobic">
                    {/* Enlaces Principales de Navegación */}
                    <ul className="navbar-nav me-auto mb-2 mb-xl-0 gap-1 gap-xl-2 align-items-xl-center">
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
                                className="nav-link dropdown-toggle text-white fw-semibold" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                style={{ cursor: 'pointer' }}
                            >
                                Categorías
                            </span>
                            <ul className="dropdown-menu dropdown-menu-dark shadow">
                                <li><Link className="dropdown-item" to="/categoria/libros">📚 Libros</Link></li>
                                <li><Link className="dropdown-item" to="/categoria/mangas">📖 Mangas</Link></li>
                                <li><Link className="dropdown-item" to="/categoria/series">📺 Series</Link></li>
                                <li><Link className="dropdown-item" to="/categoria/videojuegos">🎮 Videojuegos</Link></li>
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
                        
                        {/* 🔒 Control de Acceso para Staff (Admin y Vendedor) */}
                        {esStaff && (
                            <li className="nav-item dropdown ms-xl-2">
                                <span className="nav-link dropdown-toggle text-warning fw-bold cursor-pointer" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ⚙️ Gestión
                                </span>
                                <ul className="dropdown-menu dropdown-menu-dark shadow">
                                    <li>
                                        <Link className="dropdown-item" to="/admin">📦 Inventario</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/ventas">📊 Ventas y Despachos</Link>
                                    </li>
                                    {esAdmin && (
                                        <>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item text-danger fw-semibold" to="/adminUsuarios">👥 Usuarios</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Barra de Búsqueda Global */}
                    <form onSubmit={handleBuscar} className="d-flex my-2 my-xl-0 mx-xl-3" role="search" style={{ maxWidth: '320px', width: '100%' }}>
                        <div className="input-group">
                            <input 
                                className="form-control form-control-sm bg-dark text-white border-secondary shadow-none" 
                                type="search" 
                                placeholder="Buscar en Hobic..." 
                                aria-label="Buscar"
                                value={terminoBusqueda}
                                onChange={(e) => setTerminoBusqueda(e.target.value)}
                            />
                            <button className="btn btn-sm btn-outline-light" type="submit">
                                🔍
                            </button>
                        </div>
                    </form>

                    {/* Controles de Sesión y Carrito */}
                    <div className="d-flex align-items-center gap-3 mt-3 mt-xl-0">
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
                            <Link to="/inicioSesion" className="btn btn-sm btn-outline-light text-nowrap">
                                Ingresar
                            </Link>
                        )}
                        
                        {/* Botón de Carrito con Contador */}
                        <Link to="/carrito" className="btn btn-warning position-relative px-3" title="Ver carrito">
                            🛒
                            {totalArticulos > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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