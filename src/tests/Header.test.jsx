import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';

const renderHeader = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <CartProvider>
                    <Header />
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );

describe('Componente Header', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra el logo Hobic y los enlaces de navegación principales', () => {
        renderHeader();
        expect(screen.getByText(/hobi/i)).toBeInTheDocument();
        expect(screen.getByText(/catálogo/i)).toBeInTheDocument();
        expect(screen.getByText(/ofertas/i)).toBeInTheDocument();
    });

    it('permite realizar una búsqueda desde el navbar', async () => {
        const user = userEvent.setup();
        renderHeader();

        const inputBusqueda = screen.getByPlaceholderText(/buscar en hobic/i);
        await user.type(inputBusqueda, 'dune{enter}');

        expect(inputBusqueda.value).toBe('');
    });
});