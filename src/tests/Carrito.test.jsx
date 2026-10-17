// src/tests/Carrito.test.jsx
// Pruebas de la página Carrito: navegación, cantidad y eliminación.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Carrito from '../pages/Carrito';

// Producto de prueba ya en el carrito
const PRODUCTO_EN_CARRITO = {
    id: 'prod-001',
    nombre: 'Dune (Edición Especial)',
    precio: 15990,
    imagen: '/imagenes/dune.jpg',
    categoria: 'libros',
    descuento: 16,
    cantidad: 2,
};

function renderCarrito() {
    return render(
        <MemoryRouter initialEntries={['/carrito']}>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/carrito" element={<Carrito />} />
                        <Route path="/pago" element={<div>Página de pago</div>} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );
}

describe('Página Carrito', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('carritoHobic', JSON.stringify([PRODUCTO_EN_CARRITO]));
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    it('muestra el título y el producto en el carrito', () => {
        renderCarrito();
        expect(screen.getByText(/tu carrito/i)).toBeInTheDocument();
        expect(screen.getAllByText(/dune/i).length).toBeGreaterThan(0);
    });

    it('el botón "Proceder al Pago" navega a /pago', async () => {
        const user = userEvent.setup();
        renderCarrito();

        await user.click(screen.getByRole('button', { name: /proceder al pago/i }));
        expect(screen.getByText('Página de pago')).toBeInTheDocument();
    });

    it('el botón "+" incrementa la cantidad', async () => {
        const user = userEvent.setup();
        renderCarrito();

        // Clic en "+" (el botón con texto +)
        const botonesMas = screen.getAllByRole('button', { name: '+' });
        await user.click(botonesMas[0]);

        // La cantidad debe pasar de 2 a 3
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('el botón "-" con cantidad 1 elimina el producto', async () => {
        // Carrito con cantidad 1
        localStorage.setItem('carritoHobic', JSON.stringify([
            { ...PRODUCTO_EN_CARRITO, cantidad: 1 }
        ]));

        const user = userEvent.setup();
        renderCarrito();

        const botonesMenos = screen.getAllByRole('button', { name: '-' });
        await user.click(botonesMenos[0]);

        // El producto fue eliminado, ahora muestra carrito vacío
        expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
    });

    it('el botón de eliminar (ícono basura) quita el producto', async () => {
        const user = userEvent.setup();
        renderCarrito();

        const botonEliminar = screen.getByRole('button', { name: /eliminar producto/i });
        await user.click(botonEliminar);

        expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
    });

});
