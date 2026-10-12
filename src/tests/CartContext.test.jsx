// src/tests/CartContext.test.jsx
// Pruebas de LÓGICA del carrito usando renderHook:
// monta el hook useCart dentro del CartProvider y verifica el estado.
import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { useCart } from '../context/CartContext';

// Producto falso para inyectar al carrito
const PRODUCTO = {
    id: 'prod-test',
    nombre: 'Dune',
    precio: 1000,
    imagen: '/imagenes/dune.jpg',
    categoria: 'libros',
    descuento: 0,
};

// Envolver el hook en el Provider (requisito del Context)
const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

// Monta el hook y devuelve su resultado para manipularlo en cada prueba
function montarCarrito() {
    return renderHook(() => useCart(), { wrapper });
}

describe('Lógica del Carrito (CartContext)', () => {

    // Limpiar localStorage ANTES de cada prueba: el carrito persiste ahí,
    // y sin esto una prueba "heredaría" el estado de la anterior.
    beforeEach(() => {
        localStorage.clear();
        // alert() nativo rompe jsdom: lo silenciamos en todas las pruebas
        vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    it('agregar un producto incrementa totalArticulos', () => {
        const { result } = montarCarrito();

        expect(result.current.totalArticulos).toBe(0);

        act(() => {
            result.current.agregarAlCarrito(PRODUCTO);
        });

        expect(result.current.totalArticulos).toBe(1);

        // Agregar el mismo producto dos veces más = 3 unidades del mismo ítem
        act(() => {
            result.current.agregarAlCarrito(PRODUCTO);
            result.current.agregarAlCarrito(PRODUCTO);
        });

        expect(result.current.carrito).toHaveLength(1);   // un solo ítem
        expect(result.current.totalArticulos).toBe(3);    // 3 unidades
    });

    it('cambiarCantidad no deja bajar de 1 unidad', () => {
        const { result } = montarCarrito();

        act(() => {
            result.current.agregarAlCarrito(PRODUCTO);
        });

        // Intentar bajar de 1 con cambio -5: debe quedar en 1
        act(() => {
            result.current.cambiarCantidad(PRODUCTO.id, -5);
        });

        expect(result.current.carrito[0].cantidad).toBe(1);

        // Subir 2 unidades: 1 + 2 = 3
        act(() => {
            result.current.cambiarCantidad(PRODUCTO.id, 2);
        });

        expect(result.current.carrito[0].cantidad).toBe(3);
    });

    it('eliminarDelCarrito quita el ítem y recalcula totalPlata', () => {
        const { result } = montarCarrito();

        const productoB = { ...PRODUCTO, id: 'prod-b', precio: 2000 };

        act(() => {
            result.current.agregarAlCarrito(PRODUCTO);   // 1000
            result.current.agregarAlCarrito(productoB);  // 2000
        });

        expect(result.current.totalPlata).toBe(3000);

        // Eliminar el producto B: solo queda el de 1000
        act(() => {
            result.current.eliminarDelCarrito('prod-b');
        });

        expect(result.current.carrito).toHaveLength(1);
        expect(result.current.carrito[0].id).toBe('prod-test');
        expect(result.current.totalPlata).toBe(1000);
    });

});
