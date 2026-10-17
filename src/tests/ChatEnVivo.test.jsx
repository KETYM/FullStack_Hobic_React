import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ChatEnVivo from '../components/ChatEnVivo';

describe('Componente ChatEnVivo', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        Element.prototype.scrollIntoView = vi.fn();
    });

    it('permite abrir y cerrar el widget del chat flotante', async () => {
        const user = userEvent.setup();
        render(<ChatEnVivo />);

        // Botón flotante para abrir el chat
        const botonChat = screen.getByRole('button', { name: /chat en vivo/i });
        await user.click(botonChat);

        expect(screen.getByText(/comunidad hobic/i)).toBeInTheDocument();

        // Botón para cerrar
        const botonCerrar = screen.getByRole('button', { name: /cerrar chat/i });
        await user.click(botonCerrar);

        expect(screen.queryByText(/comunidad hobic/i)).not.toBeInTheDocument();
    });

    it('permite enviar un mensaje en el chat de comunidad', async () => {
        const user = userEvent.setup();
        render(<ChatEnVivo />);

        // Abrir chat
        await user.click(screen.getByRole('button', { name: /chat en vivo/i }));

        // Escribir mensaje usando el placeholder real
        const inputMensaje = screen.getByPlaceholderText(/escribe un mensaje/i);
        await user.type(inputMensaje, 'Hola, ¿qué manga me recomiendan?{enter}');

        // Verificar que el mensaje del usuario aparece en pantalla
        expect(screen.getByText('Hola, ¿qué manga me recomiendan?')).toBeInTheDocument();
    });
});