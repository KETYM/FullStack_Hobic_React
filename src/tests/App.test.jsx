import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

describe('Componente App (Enrutador Principal)', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('renderiza la barra de navegación y la página de inicio por defecto', () => {
        render(<App />);
        const elementosHobi = screen.getAllByText(/hobi/i);
        expect(elementosHobi.length).toBeGreaterThan(0);
    });
});