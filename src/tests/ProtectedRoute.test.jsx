// src/tests/ProtectedRoute.test.jsx
// Pruebas del guardián de rutas: control de acceso por autenticación y rol.
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

// Página protegida ficticia que se muestra si el acceso es concedido
const VistaProtegida = () => <div>Zona protegida</div>;
const Login = () => <div>Página de login</div>;
const Inicio = () => <div>Página de inicio</div>;

function renderProtegido(usuario, allowedRoles = ['admin']) {
    // Pre-sembrar la sesión del usuario en sessionStorage
    if (usuario) {
        sessionStorage.setItem('datos_usuario', JSON.stringify(usuario));
    } else {
        sessionStorage.clear();
    }

    return render(
        <MemoryRouter initialEntries={['/admin']}>
            <AuthProvider>
                <Routes>
                    <Route element={<ProtectedRoute allowedRoles={allowedRoles} />}>
                        <Route path="/admin" element={<VistaProtegida />} />
                    </Route>
                    <Route path="/inicioSesion" element={<Login />} />
                    <Route path="/" element={<Inicio />} />
                </Routes>
            </AuthProvider>
        </MemoryRouter>
    );
}

describe('Componente ProtectedRoute (Control de Acceso)', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('redirige al login si no hay sesión', () => {
        renderProtegido(null);
        expect(screen.getByText('Página de login')).toBeInTheDocument();
    });

    it('accede si el rol está permitido', () => {
        renderProtegido({ nombre: 'Admin', rol: 'admin' }, ['admin']);
        expect(screen.getByText('Zona protegida')).toBeInTheDocument();
    });

    it('redirige al inicio si el rol NO está permitido', () => {
        renderProtegido({ nombre: 'Cliente', rol: 'cliente' }, ['admin']);
        expect(screen.getByText('Página de inicio')).toBeInTheDocument();
    });

    it('permite múltiples roles', () => {
        renderProtegido({ nombre: 'Vendedor', rol: 'vendedor' }, ['admin', 'vendedor']);
        expect(screen.getByText('Zona protegida')).toBeInTheDocument();
    });

});
