import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Blog from '../pages/Blog';

const renderBlog = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <Blog />
            </AuthProvider>
        </MemoryRouter>
    );

describe('Página Blog', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        Element.prototype.scrollTo = vi.fn();
        HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue();
        HTMLMediaElement.prototype.pause = vi.fn();
    });

    it('muestra el título del blog y widgets principales', () => {
        renderBlog();
        expect(screen.getByText(/blog de/i)).toBeInTheDocument();
        expect(screen.getByText(/hora local/i)).toBeInTheDocument();
        expect(screen.getByText(/guestbook/i)).toBeInTheDocument();
    });

    it('permite firmar el libro de visitas', async () => {
        const user = userEvent.setup();
        renderBlog();

        await user.type(screen.getByPlaceholderText(/tu apodo o nombre/i), 'TestVisitor');
        await user.type(screen.getByPlaceholderText(/escribe tu mensaje aquí/i), '¡Excelente blog!');
        await user.click(screen.getByRole('button', { name: /firmar libro/i }));

        expect(screen.getByText('TestVisitor')).toBeInTheDocument();
        expect(screen.getByText('¡Excelente blog!')).toBeInTheDocument();
    });
});