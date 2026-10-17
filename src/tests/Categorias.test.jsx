// src/tests/Categorias.test.jsx
// Pruebas de la página de categorías: useParams, redirección y filtrado.
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Categorias from '../pages/Categorias';

function renderCategoria(slug) {
    return render(
        <MemoryRouter initialEntries={[`/categoria/${slug}`]}>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/categoria/:slug" element={<Categorias />} />
                        <Route path="/catalogo" element={<div>Página de catálogo</div>} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );
}

describe('Página Categorías', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra el título correcto para libros', () => {
        renderCategoria('libros');
        expect(screen.getByText('Nuestros Libros')).toBeInTheDocument();
    });

    it('muestra solo productos de la categoría seleccionada', () => {
        renderCategoria('libros');
        // Dune es libro, Halo es videojuego
        expect(screen.getAllByText(/dune/i).length).toBeGreaterThan(0);
        expect(screen.queryByText(/halo/i)).not.toBeInTheDocument();
    });

    it('redirige al catálogo con un slug inválido', () => {
        renderCategoria('categoria-falsa');
        expect(screen.getByText('Página de catálogo')).toBeInTheDocument();
    });

});
