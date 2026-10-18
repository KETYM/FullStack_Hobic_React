import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PanelVendedor from '../pages/PanelVendedor';

const renderPanelVendedor = () =>
    render(
        <MemoryRouter>
            <PanelVendedor />
        </MemoryRouter>
    );

describe('Página PanelVendedor', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra el título del panel de ventas y métricas', () => {
        renderPanelVendedor();
        expect(screen.getByText(/panel de ventas y despachos/i)).toBeInTheDocument();
        expect(screen.getByText(/ingresos totales/i)).toBeInTheDocument();
        expect(screen.getByText(/pedidos pendientes/i)).toBeInTheDocument();
    });

    it('permite filtrar pedidos por pendientes', async () => {
        const user = userEvent.setup();
        renderPanelVendedor();

        await user.click(screen.getByRole('button', { name: /pendientes/i }));
        expect(screen.getByText('#20261001')).toBeInTheDocument();
    });

    it('permite cambiar el estado de un pedido', async () => {
        const user = userEvent.setup();
        renderPanelVendedor();

        const selectsEstado = screen.getAllByRole('combobox');
        await user.selectOptions(selectsEstado[0], 'Preparando');

        expect(selectsEstado[0].value).toBe('Preparando');
    });
});