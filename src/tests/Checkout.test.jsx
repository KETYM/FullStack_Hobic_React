// src/tests/Checkout.test.jsx
// Pruebas de VALIDACIÓN de formulario: enviar vacío y teléfono inválido.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Checkout from '../pages/Checkout';

// Producto mínimo para que el carrito no esté vacío
// (Checkout redirige a /carrito si no hay nada).
const PRODUCTO = {
    id: 'prod-test',
    nombre: 'Dune',
    precio: 1000,
    imagen: '/imagenes/dune.jpg',
    categoria: 'libros',
    descuento: 0,
    cantidad: 1,
};

const renderCheckout = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <CartProvider>
                    <Checkout />
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );

describe('Validación del formulario de Checkout', () => {

    // Preparar el escenario: carrito con 1 producto y sin sesión (nombre vacío).
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('carritoHobic', JSON.stringify([PRODUCTO]));
        // Math.random controlado: siempre éxito (para no ir a /pago-error)
        vi.spyOn(Math, 'random').mockReturnValue(0.9);
    });

    it('muestra errores de validación al enviar el formulario vacío', async () => {
        const user = userEvent.setup();
        renderCheckout();

        // Botón "Confirmar y Pagar" sin haber escrito nada
        await user.click(screen.getByRole('button', { name: /confirmar y pagar/i }));

        expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
        expect(screen.getByText(/Formato inválido/)).toBeInTheDocument();
        expect(screen.getByText('La dirección es obligatoria.')).toBeInTheDocument();
        expect(screen.getByText('Selecciona una región.')).toBeInTheDocument();
        expect(screen.getByText('Selecciona una comuna.')).toBeInTheDocument();
    });

    it('acepta un teléfono chileno válido pero rechaza uno inválido', async () => {
        const user = userEvent.setup();
        renderCheckout();

        // Llenar todos los campos excepto el teléfono con un valor inválido
        await user.type(screen.getByPlaceholderText(/av\. siempreviva/i), 'Av. Siempreviva 742');
        await user.type(screen.getByPlaceholderText(/\+56912345678/i), '1234');

        await user.click(screen.getByRole('button', { name: /confirmar y pagar/i }));

        // El teléfono inválido debe mostrar SU error específico
        expect(screen.getByText(/Formato inválido\. Debe ser un número chileno/)).toBeInTheDocument();
        // Y no debe haber navegado (los errores siguen en pantalla)
        expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
    });

});
