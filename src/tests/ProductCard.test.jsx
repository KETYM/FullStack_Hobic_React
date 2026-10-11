import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProductCard from "../components/ProductCard";
import userEvent from "@testing-library/user-event";

const PRODUCTO_DE_PRUEBA = {
    id: 'prod-test',
    nombre: 'Dune (Edición Especial)',
    categoria: 'libros',
    precio: 500,
    precioAnterior: 750,
    descuento: 33,
    imagen: '/imagenes/dune.jpg',
    stock: 10,
};

// ProductCard usa <Link> (necesita Router) y useCart() (necesita CartProvider).
// Este helper envuelve el componente en ambos providers.
const renderConProviders = (ui) =>
    render(
        <MemoryRouter>
            <CartProvider>{ui}</CartProvider>
        </MemoryRouter>
    );

describe('Componente ProductCard', ()=>{

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('muestra nombre, precio y badge de descuento recibidos por props', () => {
        renderConProviders(<ProductCard producto={PRODUCTO_DE_PRUEBA}/>);

        expect(screen.getByText('Dune (Edición Especial)')).toBeInTheDocument();
        expect(screen.getByText('$500')).toBeInTheDocument();
        expect(screen.getByText('$750')).toBeInTheDocument();
        expect(screen.getByText('-33%')).toBeInTheDocument();
        expect(screen.getByText('LIBROS')).toBeInTheDocument();
    });

    it('agrega el producto al carrito al hacer clic en "Agregar al Carrito"', async()=>{
        // jsdom no implementa alert de verdad: lo reemplazamos por un ESPÍA
        // que registra las llamadas sin mostrar ventanas.
        const alertaEspia = vi.spyOn(window, 'alert').mockImplementation(() =>{});
        const user = userEvent.setup();

        renderConProviders(<ProductCard producto={PRODUCTO_DE_PRUEBA}/>);

        await user.click(
            screen.getByRole('button', {name: /agregar al carrito/i})
        );

        expect(alertaEspia).toHaveBeenCalledWith('Añadido al carrito de compra');
    });
    });