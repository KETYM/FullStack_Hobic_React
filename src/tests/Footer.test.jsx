import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../components/Footer";

describe('Componente Footer', () => {

    it('muestra el texto de copyright con el nombre Hobic', () => {
        render(<Footer/>);
        expect(
            screen.getByText(/Hobic - Todos los derechos reservados/)
        ).toBeInTheDocument();
    });

    it('muestra el año actual calculado dinámicamente', ()=>{
        render(<Footer/>);
        const anioActual = new Date().getFullYear();
        expect(screen.getByText(new RegExp(anioActual))).toBeInTheDocument();
    });
});