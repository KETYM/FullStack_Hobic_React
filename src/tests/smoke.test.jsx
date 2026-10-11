// src/tests/smoke.test.jsx
// Prueba de humo: verifica que Vitest + React Testing Library + jsdom
// estén correctamente configurados. Si esta pasa, la infraestructura vive.
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

function Saludo({ nombre }) {
    return <p>Hola, {nombre}</p>;
}

describe('Infraestructura de testing', () => {
    it('renderiza un componente React básico', () => {
        render(<Saludo nombre="Hobic" />);
        expect(screen.getByText('Hola, Hobic')).toBeInTheDocument();
    });
});
