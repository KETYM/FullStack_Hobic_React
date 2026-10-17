// src/tests/PagoExitoso.test.jsx
// Pruebas de la boleta de compra: redirección sin datos y muestra con datos.
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import PagoExitoso from '../pages/PagoExitoso';

// Boleta de prueba simulando lo que guarda Checkout
const BOLETA_DE_PRUEBA = {
    numero: '#20261234',
    fecha: '11/10/2026, 15:30',
    cliente: {
        nombre: 'Juan Pérez',
        telefono: '+56912345678',
        direccion: 'Av. Siempreviva 742',
        region: 'Metropolitana de Santiago',
        comuna: 'Santiago',
    },
    medioPago: 'tarjeta',
    productos: [
        { id: 'prod-001', nombre: 'Dune', precio: 15990, cantidad: 2, imagen: '/imagenes/dune.jpg' },
    ],
    subtotal: 31980,
    total: 31980,
};

function renderBoleta() {
    return render(
        <MemoryRouter initialEntries={['/boleta']}>
            <CartProvider>
                <Routes>
                    <Route path="/boleta" element={<PagoExitoso />} />
                    <Route path="/" element={<div>Página de inicio</div>} />
                </Routes>
            </CartProvider>
        </MemoryRouter>
    );
}

describe('Página PagoExitoso (Boleta)', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('redirige al inicio cuando no hay boleta en localStorage', () => {
        // No guardamos nada en localStorage
        renderBoleta();

        expect(screen.getByText('Página de inicio')).toBeInTheDocument();
    });

    it('muestra los datos de la boleta cuando existe', () => {
        localStorage.setItem('ultimaBoleta', JSON.stringify(BOLETA_DE_PRUEBA));
        renderBoleta();

        // Número de orden
        expect(screen.getByText('#20261234')).toBeInTheDocument();
        // Estado
        expect(screen.getByText(/pagado \/ aprobado/i)).toBeInTheDocument();
        // Datos de despacho
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText(/av\. siempreviva 742/i)).toBeInTheDocument();
        // Producto (aparece en la lista y en el chat, por eso getAllByText)
        expect(screen.getAllByText('Dune').length).toBeGreaterThan(0);
        // Total (aparece en línea de producto y en total, por eso getAllByText)
        expect(screen.getAllByText(/\$31\.980/).length).toBeGreaterThan(0);
    });

    it('muestra el medio de pago legible', () => {
        localStorage.setItem('ultimaBoleta', JSON.stringify(BOLETA_DE_PRUEBA));
        renderBoleta();

        expect(screen.getByText(/tarjeta de crédito\/débito/i)).toBeInTheDocument();
    });

});
