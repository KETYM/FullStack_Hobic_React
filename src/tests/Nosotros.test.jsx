// src/tests/Nosotros.test.jsx
// Prueba de la página institucional Nosotros: renderizado de contenido.
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Nosotros from '../pages/Nosotros';

describe('Página Nosotros', () => {

    it('muestra el título de la historia', () => {
        render(
            <MemoryRouter>
                <Nosotros />
            </MemoryRouter>
        );
        // "Nuestra Historia" está partido: "Historia" va en un <span>
        expect(screen.getByText('Nuestra')).toBeInTheDocument();
        expect(screen.getByText('Historia')).toBeInTheDocument();
    });

    it('muestra el enlace de contacto', () => {
        render(
            <MemoryRouter>
                <Nosotros />
            </MemoryRouter>
        );
        expect(
            screen.getByRole('link', { name: /habla con nosotros/i })
        ).toHaveAttribute('href', '/contacto');
    });

});
