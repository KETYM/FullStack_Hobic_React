// src/tests/Inicio.test.jsx
// Pruebas de la página de inicio: renderizado y navegación.
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { beforeEach, describe, expect, it } from 'vitest';
import Inicio from '../pages/Inicio';

const renderInicio = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <CartProvider>
                    <Inicio />
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );

describe('Página Inicio', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra el título de bienvenida', () => {
        renderInicio();
        // "BIENVENIDOS A HOBI" está partido: el "C" va en un <span>, por eso getAllByText
        expect(screen.getAllByText(/bienvenidos a hobi/i).length).toBeGreaterThan(0);
    });

    it('muestra la sección de categorías', () => {
        renderInicio();
        expect(screen.getByText(/explora nuestros universos/i)).toBeInTheDocument();
        expect(screen.getByText('Videojuegos')).toBeInTheDocument();
        expect(screen.getByText('Mangas')).toBeInTheDocument();
    });

    it('muestra el enlace "Ver Todo el Catálogo"', () => {
        renderInicio();
        expect(
            screen.getByRole('link', { name: /ver todo el catálogo/i })
        ).toHaveAttribute('href', '/catalogo');
    });

    it('muestra la sección de beneficios', () => {
        renderInicio();
        expect(screen.getByText(/envíos a todo chile/i)).toBeInTheDocument();
        expect(screen.getByText(/pago 100% seguro/i)).toBeInTheDocument();
        expect(screen.getByText(/calidad garantizada/i)).toBeInTheDocument();
    });

});
