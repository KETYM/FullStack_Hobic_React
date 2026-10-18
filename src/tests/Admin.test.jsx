import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Admin from '../pages/Admin';
import { inicializarInventario } from '../data/mockData';

const renderAdmin = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <CartProvider>
                    <Admin />
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );

describe('Página Admin (Inventario)', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        inicializarInventario();
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    it('muestra el título de administración y la tabla de inventario', () => {
        renderAdmin();
        expect(screen.getByText(/administración de inventario/i)).toBeInTheDocument();
        expect(screen.getByText(/dune/i)).toBeInTheDocument();
    });

    it('muestra advertencia al intentar guardar producto con precio inválido', async () => {
        const user = userEvent.setup();
        renderAdmin();

        const inputs = screen.getAllByRole('textbox');
        const numberInputs = screen.getAllByRole('spinbutton');

        await user.type(inputs[0], 'Producto Test'); // Nombre
        await user.type(numberInputs[0], '0'); // Precio
        await user.type(inputs[1], '/imagenes/test.jpg'); // Imagen
        await user.selectOptions(screen.getByRole('combobox'), 'libros');

        await user.click(screen.getByRole('button', { name: /guardar producto/i }));
        expect(screen.getByText(/el precio debe ser mayor a 0/i)).toBeInTheDocument();
    });

    it('permite agregar un nuevo producto exitosamente', async () => {
        const user = userEvent.setup();
        renderAdmin();

        const inputs = screen.getAllByRole('textbox');
        const numberInputs = screen.getAllByRole('spinbutton');

        await user.type(inputs[0], 'Nuevo Libro Test');
        await user.type(numberInputs[0], '12990');
        await user.type(inputs[1], '/imagenes/test.jpg');
        await user.selectOptions(screen.getByRole('combobox'), 'libros');

        await user.click(screen.getByRole('button', { name: /guardar producto/i }));
        expect(await screen.findByText(/producto agregado correctamente/i)).toBeInTheDocument();
        expect(screen.getByText('Nuevo Libro Test')).toBeInTheDocument();
    });

    it('permite eliminar un producto del inventario', async () => {
        const user = userEvent.setup();
        renderAdmin();

        const botonesBorrar = screen.getAllByRole('button', { name: /borrar/i });
        await user.click(botonesBorrar[0]);

        expect(await screen.findByText(/producto eliminado/i)).toBeInTheDocument();
    });
});