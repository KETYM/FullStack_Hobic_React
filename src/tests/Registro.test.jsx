import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Registro from "../pages/Registro";

const renderRegistro = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <Registro />
            </AuthProvider>
        </MemoryRouter>
    );

async function llenarFormularioValido(user) {
    await user.type(screen.getByPlaceholderText('Tu nombre y apellido'), 'Juan Pérez');
    await user.type(screen.getByPlaceholderText('Ej: 12.345.678-9'), '123456789');
    await user.type(screen.getByPlaceholderText('Ej: Av. Siempreviva 742'), 'Av. Siempreviva 742');

    await user.selectOptions(screen.getByRole('combobox', { name: /región/i }), 'Metropolitana de Santiago');
    await user.selectOptions(screen.getByRole('combobox', { name: /comuna/i }), 'Santiago');

    await user.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'nuevo@correo.cl');
    await user.type(screen.getByPlaceholderText('Mínimo 6 caracteres'), 'secreta123');
    await user.type(screen.getByPlaceholderText('Repite la contraseña'), 'secreta123');
}

describe('Página de Registro', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('muestra errores de validación al enviar el formulario vacío', async () => {
        const user = userEvent.setup();
        renderRegistro();

        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        // findByText espera a que React termine de renderizar los errores
        expect(await screen.findByText(/nombre completo es requerido/i)).toBeInTheDocument();
        expect(await screen.findByText(/formato de run inválido/i)).toBeInTheDocument();
        expect(await screen.findByText(/dirección es requerida/i)).toBeInTheDocument();
        expect(await screen.findByText(/seleccionar una región/i)).toBeInTheDocument();
    });

    it('al seleccionar una región se habilita y carga el select de comunas', async () => {
        const user = userEvent.setup();
        renderRegistro();

        const selectComuna = screen.getByRole('combobox', { name: /comuna/i });

        // Antes de elegir región: deshabilitado
        expect(selectComuna).toBeDisabled();

        // Elegir región: se habilita
        await user.selectOptions(
            screen.getByRole('combobox', { name: /región/i }),
            'Metropolitana de Santiago'
        );

        expect(selectComuna).toBeEnabled();
        // Verificar que contiene comunas de esa región
        expect(screen.getByRole('option', { name: 'Santiago' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Ñuñoa' })).toBeInTheDocument();
    });

    it('muestra error si el correo ya está registrado', async () => {
        // Pre-sembrar un usuario existente en localStorage
        localStorage.setItem('usuariosHobic', JSON.stringify([
            { id: 'u1', nombre: 'Admin', correo: 'admin@hobic.cl', password: 'adm123', rol: 'admin' }
        ]));

        const user = userEvent.setup();
        renderRegistro();

        await llenarFormularioValido(user);
        // Cambiar el email a uno que ya existe
        await user.clear(screen.getByPlaceholderText('ejemplo@correo.com'));
        await user.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'admin@hobic.cl');

        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        expect(
            await screen.findByText(/ya está registrado/i)
        ).toBeInTheDocument();
    });

    it('registro exitoso muestra confirmación y guarda el usuario', async () => {
        const user = userEvent.setup();
        renderRegistro();

        await llenarFormularioValido(user);
        await user.click(screen.getByRole('button', { name: /registrarse/i }));

        //verificar mensaje de exito
        expect(
            await screen.findByText(/cuenta creada con éxito/i)
        ).toBeInTheDocument();

        //verificar que el usuario quedó en localStorage
        await waitFor(() => {
            const usuarios = JSON.parse(localStorage.getItem('usuariosHobic'));
            const nuevo = usuarios.find(u => u.correo === 'nuevo@correo.cl');
            expect(nuevo).toBeDefined();
            expect(nuevo.rol).toBe('cliente');
        });
    });
});