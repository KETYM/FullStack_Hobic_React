// src/tests/Ofertas.test.jsx
// Pruebas de la página de ofertas: renderizado y filtrado por descuento.
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Ofertas from '../pages/Ofertas';

const renderOfertas = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <CartProvider>
                    <Ofertas />
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );

describe('Página Ofertas', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra el título de la página', () => {
        renderOfertas();
        expect(screen.getByText(/ofertas de la semana/i)).toBeInTheDocument();
    });

    it('muestra productos con descuento', () => {
        renderOfertas();
        // Todos los productos del seed tienen descuento > 0
        expect(screen.getAllByText(/dune/i).length).toBeGreaterThan(0);
    });

});
