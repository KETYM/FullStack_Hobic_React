// src/tests/Recuperar.test.jsx
// Pruebas de la página de recuperación de contraseña.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Recuperar from '../pages/Recuperar';

const renderRecuperar = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <Recuperar />
            </AuthProvider>
        </MemoryRouter>
    );

describe('Página Recuperar Contraseña', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra el título y el botón de restablecer', () => {
        renderRecuperar();
        expect(screen.getByText('Recuperar Contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /restablecer contraseña/i })).toBeInTheDocument();
    });

    it('muestra error si las contraseñas no coinciden', async () => {
        const user = userEvent.setup();
        renderRecuperar();

        await user.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'test@correo.cl');
        await user.type(screen.getByPlaceholderText('Ej: 12.345.678-9'), '123456789');
        await user.type(screen.getByPlaceholderText('Mínimo 6 caracteres'), 'secreta123');
        await user.type(screen.getByPlaceholderText('Repite tu nueva contraseña'), 'diferente123');

        await user.click(screen.getByRole('button', { name: /restablecer contraseña/i }));

        expect(await screen.findByText(/contraseñas no coinciden/i)).toBeInTheDocument();
    });

    it('muestra error si la contraseña es muy corta', async () => {
        const user = userEvent.setup();
        renderRecuperar();

        await user.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'test@correo.cl');
        await user.type(screen.getByPlaceholderText('Ej: 12.345.678-9'), '123456789');
        await user.type(screen.getByPlaceholderText('Mínimo 6 caracteres'), '123');
        await user.type(screen.getByPlaceholderText('Repite tu nueva contraseña'), '123');

        await user.click(screen.getByRole('button', { name: /restablecer contraseña/i }));

        expect(await screen.findByText(/al menos 6 caracteres/i)).toBeInTheDocument();
    });

});
