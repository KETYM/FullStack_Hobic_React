import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css'; 

export default function Header() {
    const { totalArticulos } = useCart();
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg px-3 py-3 shadow-sm" style={{ backgroundColor: '#0d1527' }}>
            <div className="container-fluid">
                {/* Logo */}
                <Link to="/" className="navbar-brand text-white fw-bold fs-3" style={{ textDecoration: 'none' }}>
                    HOBI<span style={{ color: '#e0006c' }}>C</span>
                </Link>

                {/* Botón hamburguesa para móviles */}
                <button className="navbar-toggler navbar-dark border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Enlaces de Navegación */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* ms-lg-4 aplica el margen solo en PC para no desarmar el celular */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-2 gap-lg-3 mt-3 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white text-decoration-none hover-pink" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-decoration-none hover-pink" to="/catalogo">Catálogo</Link>
                        </li>
                        
                        {/* 🔒 Control de Acceso: Solo visible para admins */}
                        {usuario?.rol === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-warning fw-bold hover-pink" to="/admin">Inventario</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-warning fw-bold hover-pink" to="/adminUsuarios">Usuarios</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Controles de Sesión y Carrito */}
                    {/* flex-wrap ayuda a que si la pantalla es muy pequeña, los botones no se aplasten */}
                    <div className="d-flex flex-wrap align-items-center gap-3 mt-3 mt-lg-0 pb-2 pb-lg-0">
                        {usuario ? (
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-white">Hola, <strong>{usuario.nombre}</strong></span>
                                <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <Link to="/inicioSesion" className="btn btn-outline-light">Ingresar</Link>
                        )}
                        
                        {/* Botón del carrito */}
                        <Link to="/carrito" className="btn btn-warning position-relative">
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