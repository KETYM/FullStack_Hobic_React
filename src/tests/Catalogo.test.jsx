// src/tests/Catalogo.test.jsx
// Pruebas del catálogo: filtros de categoría y buscador de productos.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Catalogo from '../pages/Catalogo';

const renderCatalogo = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <CartProvider>
                    <Catalogo />
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );

describe('Página Catálogo', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra todos los productos al cargar', () => {
        renderCatalogo();

        // Nuestro seed tiene 10 productos; Dune debe estar visible
        expect(screen.getByText(/dune/i)).toBeInTheDocument();
        expect(screen.getByText(/halo infinite/i)).toBeInTheDocument();
    });

    it('el filtro por categoría muestra solo productos de esa categoría', async () => {
        const user = userEvent.setup();
        renderCatalogo();

        // Clic en el filtro "Libros"
        await user.click(screen.getByRole('button', { name: /^libros$/i }));

        // Debe mostrar Dune (libro) y SDLA (libro)
        expect(screen.getByText(/dune/i)).toBeInTheDocument();
        expect(screen.getByText(/señor de los anillos/i)).toBeInTheDocument();

        // NO debe mostrar Halo (videojuego)
        expect(screen.queryByText(/halo infinite/i)).not.toBeInTheDocument();
    });

    it('el buscador filtra productos por nombre', async () => {
        const user = userEvent.setup();
        renderCatalogo();

        // Escribir "dune" en el buscador
        const buscador = screen.getByPlaceholderText(/buscar por título/i);
        await user.type(buscador, 'dune');

        // Solo debe aparecer Dune
        expect(screen.getByText(/dune/i)).toBeInTheDocument();
        expect(screen.queryByText(/halo infinite/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/señor de los anillos/i)).not.toBeInTheDocument();
    });

    it('muestra mensaje cuando no hay resultados', async () => {
        const user = userEvent.setup();
        renderCatalogo();

        const buscador = screen.getByPlaceholderText(/buscar por título/i);
        await user.type(buscador, 'xyzproductoquenoexiste');

        expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument();
    });

});
