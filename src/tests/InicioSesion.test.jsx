import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import{AuthProvider} from '../context/AuthContext';
import InicioSesion from '../pages/InicioSesion';

const renderLogin = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <InicioSesion/>
            </AuthProvider>
        </MemoryRouter>
    );

    describe('Página de inicio de sesión', () =>{
        beforeEach(() =>{
            localStorage.clear();
            sessionStorage.clear();
        });

        it('muestra error al ingresar credenciales inválidas', async () =>{
            const user = userEvent.setup();
            renderLogin();

            await user.type(screen.getByPlaceholderText('tu@correo.com'),'noexiste@correo.com');
            await user.type(screen.getByPlaceholderText('••••••••'),'claveincorrecta');
            await user.click(screen.getByRole('button',{name:/ingresar/i}));

            expect(
                await screen.findByText(/correo o contraseña incorrectos/i)
            ).toBeInTheDocument();
        });

        it('login exitoso con admin guarda la sesión en sessionStorage', async () =>{
            const user = userEvent.setup();
            renderLogin();

            await user.type(screen.getByPlaceholderText('tu@correo.com'), 'admin@hobic.cl');
            await user.type(screen.getByPlaceholderText('••••••••'), 'adm123');
            await user.click(screen.getByRole('button',{name:/ingresar/i}));

            await waitFor(() => {
                const datos = JSON.parse(sessionStorage.getItem('datos_usuario'));
                expect(datos).not.toBeNull();
                expect(datos.rol).toBe('admin');
                expect(datos.correo).toBe('admin@hobic.cl');
            });
        });

        it('muestra enlaces a registro y recuperación de contraseña', ()=> {
            renderLogin();

            expect(
                screen.getByRole('link', {name: /olvidaste tu contraseña/i})
            ).toHaveAttribute('href','/recuperar');
        });
    });