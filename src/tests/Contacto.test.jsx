// src/tests/Contacto.test.jsx
// Pruebas del formulario de contacto: validación y envío exitoso.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Contacto from '../pages/Contacto';

const renderContacto = () =>
    render(
        <MemoryRouter>
            <Contacto />
        </MemoryRouter>
    );

describe('Página Contacto', () => {

    it('muestra el título del formulario', () => {
        renderContacto();
        expect(screen.getByText('Contacto Hobic')).toBeInTheDocument();
    });

    it('muestra errores al enviar el formulario vacío', async () => {
        const user = userEvent.setup();
        renderContacto();

        await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

        // "nombre completo" aparece en label, placeholder y error → getAllByText
        expect((await screen.findAllByText(/nombre completo/i)).length).toBeGreaterThan(0);
        expect(await screen.findByText(/correo electrónico es obligatorio/i)).toBeInTheDocument();
        expect(await screen.findByText(/seleccionar un motivo/i)).toBeInTheDocument();
    });

    it('muestra confirmación al enviar un formulario válido', async () => {
        const user = userEvent.setup();
        renderContacto();

        await user.type(screen.getByPlaceholderText('Tu nombre completo'), 'Juan Pérez');
        await user.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'juan@test.cl');
        await user.selectOptions(screen.getByRole('combobox'), 'consulta');
        await user.type(
            screen.getByPlaceholderText('Escribe tu mensaje o consulta aquí...'),
            'Hola, tengo una consulta.'
        );

        await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

        expect(await screen.findByText(/mensaje enviado con éxito/i)).toBeInTheDocument();
    });

});
