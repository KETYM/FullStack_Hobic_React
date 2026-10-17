// src/tests/PagoError.test.jsx
// Pruebas de la pantalla de error de pago: navegación de los botones de reintento.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PagoError from '../pages/PagoError';

// Renderiza PagoError y registra a dónde navega cada botón.
// Usamos Routes con destinos ficticios para interceptar la navegación.
function renderPagoError() {
    return render(
        <MemoryRouter initialEntries={['/pago-error']}>
            <Routes>
                <Route path="/pago-error" element={<PagoError />} />
                <Route path="/pago" element={<div>Página de pago</div>} />
                <Route path="/carrito" element={<div>Página del carrito</div>} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Página PagoError', () => {

    it('muestra el título de transacción fallida', () => {
        renderPagoError();
        expect(screen.getByText(/transacción fallida/i)).toBeInTheDocument();
    });

    it('el botón "volver a realizar pago" navega a /pago', async () => {
        const user = userEvent.setup();
        renderPagoError();

        await user.click(screen.getByRole('button', { name: /volver a realizar pago/i }));

        // Si navigate('/pago') funcionó, se renderiza el destino
        expect(screen.getByText('Página de pago')).toBeInTheDocument();
    });

    it('el botón "volver al carrito" navega a /carrito', async () => {
        const user = userEvent.setup();
        renderPagoError();

        await user.click(screen.getByRole('button', { name: /volver al carrito/i }));

        expect(screen.getByText('Página del carrito')).toBeInTheDocument();
    });

});
