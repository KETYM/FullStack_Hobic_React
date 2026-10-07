import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Header() {
    const [Usuario, setUsuario] = useState(null);

    useEffect(() => {
        const sesion = sessionStorage.getItem("usuarioActual");
        if (sesion) setUsuario(JSON.parse(sesion));
    }, []);

    return (
        <nav className="d.flex justify-content-between align-items-center p-3" style={{backgroundColor: '#0d1527'}}> 
        <Link to="/" style={{ textDecoration:'none'}}>
        <h2 style={{color: 'white', margin0 }}>HOBI<span style={{color:'#e0006c'}}>C</span></h2> 
        </Link>
        <div className="nav-links text-white">
            <Link to="/">Inicio</Link> |<Link to="/catalogo"> Catálogo</Link> 
            </div>
            <div className="nav-derecha"> 
                {usuario ? (
                    <span className="text-white me-3">Hola,{usuario.nombre}</span>
                ) : (
                    <Link to="/login" className="btn btn-outline--light me-2">Ingresar</Link>
                )}
                <Link to="/carrito" className=" btn btn-warning">🛒</Link>
                </div>
        </nav>
    );
}