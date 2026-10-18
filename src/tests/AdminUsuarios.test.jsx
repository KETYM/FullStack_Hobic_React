import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import AdminUsuarios from '../pages/AdminUsuarios';

const renderAdminUsuarios = (usuarioActual = { id: 'u-admin', correo: 'admin@hobic.cl', rol: 'admin' }) => {
    sessionStorage.setItem('datos_usuario', JSON.stringify(usuarioActual));
    return render(
        <MemoryRouter>
            <AuthProvider>
                <AdminUsuarios />
            </AuthProvider>
        </MemoryRouter>
    );
};

describe('Página AdminUsuarios', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        vi.spyOn(window, 'confirm').mockReturnValue(true);
    });

    it('muestra el título de gestión de usuarios y la lista inicial', () => {
        renderAdminUsuarios();
        expect(screen.getByText(/gestión de usuarios/i)).toBeInTheDocument();
        expect(screen.getByText(/administrador hobic/i)).toBeInTheDocument();
    });

    it('muestra advertencia al enviar formulario con RUN inválido', async () => {
        const user = userEvent.setup();
        renderAdminUsuarios();

        await user.type(screen.getByPlaceholderText(/nombre completo/i), 'Usuario Test');
        await user.type(screen.getByPlaceholderText(/12\.345\.678-9/i), '123');
        await user.click(screen.getByRole('button', { name: /guardar usuario/i }));

        expect(screen.getByText(/el formato del run es inválido/i)).toBeInTheDocument();
    });

    it('permite crear un nuevo usuario cliente', async () => {
        const user = userEvent.setup();
        renderAdminUsuarios();

        await user.type(screen.getByPlaceholderText(/nombre completo/i), 'Cliente Prueba');
        await user.type(screen.getByPlaceholderText(/12\.345\.678-9/i), '123456789');
        await user.type(screen.getByPlaceholderText(/correo@ejemplo.com/i), 'cliente@test.cl');
        await user.type(screen.getByPlaceholderText(/••••••••/i), 'secreta123');
        
        // Seleccionamos el select de rol usando queryAllByRole o buscando el select con name="rol"
        const selects = screen.getAllByRole('combobox');
        const selectRol = selects.find(s => s.name === 'rol');
        await user.selectOptions(selectRol, 'cliente');

        await user.click(screen.getByRole('button', { name: /guardar usuario/i }));
        expect(await screen.findByText(/usuario creado exitosamente/i)).toBeInTheDocument();
        expect(screen.getByText('Cliente Prueba')).toBeInTheDocument();
    });
});