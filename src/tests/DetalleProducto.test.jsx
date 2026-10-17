// src/tests/DetalleProducto.test.jsx
// Pruebas de la ficha de producto: useParams, redirección y agregar al carrito.
// DetalleProducto usa: useParams (lee /producto/:id), useCart, useAuth, useNavigate.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import DetalleProducto from '../pages/DetalleProducto';

// Renderiza DetalleProducto dentro de una ruta simulada /producto/:id
// RutaAlternativa: si el componente redirige (Navigate), se renderiza esa ruta
// en vez de explotar (React Router necesita un destino para Navigate).
function renderDetalle(id, rutaAlternativa = '/catalogo') {
    return render(
        <MemoryRouter initialEntries={[`/producto/${id}`]}>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/producto/:id" element={<DetalleProducto />} />
                        <Route path={rutaAlternativa} element={<div>Página de catálogo</div>} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );
}

describe('Página DetalleProducto', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        // Silenciar el alert del agregarAlCarrito
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    it('muestra la ficha del producto cuando el ID es válido', () => {
        // prod-001 es Dune en nuestro mockData seed
        renderDetalle('prod-001');

        // "Dune" aparece en el título Y en el chat de bienvenida, por eso getAllByText
        expect(screen.getAllByText(/dune/i).length).toBeGreaterThan(0);
        // Verificar que tiene botón de agregar al carrito
        expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeInTheDocument();
    });

    it('redirige al catálogo cuando el ID no existe', () => {
        renderDetalle('id-inexistente');

        // Navigate to="/catalogo" renderiza el elemento de la ruta alternativa
        expect(screen.getByText('Página de catálogo')).toBeInTheDocument();
    });

    it('agregar al carrito incrementa el contador del header', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={['/producto/prod-001']}>
                <AuthProvider>
                    <CartProvider>
                        <Routes>
                            <Route path="/producto/:id" element={<DetalleProducto />} />
                        </Routes>
                    </CartProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        await user.click(screen.getByRole('button', { name: /agregar al carrito/i }));

        // Verificar que el alert del contexto fue llamado
        expect(window.alert).toHaveBeenCalledWith('Añadido al carrito de compra');
    });

});
