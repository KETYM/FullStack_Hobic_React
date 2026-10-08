import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente asegura el Control de Acceso (ISO 27001 - A.9)
export default function ProtectedRoute({ allowedRoles }) {
    const { usuario, loading } = useAuth();

    if (loading) return <div>Cargando políticas de seguridad...</div>;

    // Si no hay usuario, redirigir al login
    if (!usuario) {
        return <Navigate to="/inicioSesion" replace />;
    }

    // Si el usuario no tiene el rol permitido para esta vista, redirigir al inicio
    if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}