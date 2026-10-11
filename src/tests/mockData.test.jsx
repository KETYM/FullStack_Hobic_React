// src/tests/mockData.test.jsx
// Pruebas de la capa de datos: ofertas y CRUD sobre el inventario.
import { beforeEach, describe, expect, it } from 'vitest';
import {
    inicializarInventario,
    obtenerProductos,
    obtenerOfertas,
    crearProducto,
    eliminarProducto,
} from '../data/mockData';

describe('mockData - Capa de datos del inventario', () => {

    // Cada prueba parte con el inventario sembrado limpio.
    beforeEach(() => {
        localStorage.clear();
        inicializarInventario();
    });

    it('obtenerOfertas devuelve solo productos con descuento mayor a 0', () => {
        const ofertas = obtenerOfertas();

        expect(ofertas.length).toBeGreaterThan(0);
        // Cada producto devuelto DEBE tener descuento positivo
        ofertas.forEach((producto) => {
            expect(producto.descuento).toBeGreaterThan(0);
        });
    });

    it('crearProducto agrega al inventario y eliminarProducto lo quita', () => {
        const totalInicial = obtenerProductos().length;

        // Crear un producto nuevo
        const nuevo = crearProducto({
            nombre: 'Producto de Prueba',
            precio: 999,
            imagen: '/imagenes/test.jpg',
            categoria: 'libros',
            descuento: 0,
            stock: 5,
            stockCritico: 2,
        });

        // El inventario creció en 1 y el producto es recuperable por id
        expect(obtenerProductos().length).toBe(totalInicial + 1);
        expect(obtenerProductos().some((p) => p.id === nuevo.id)).toBe(true);

        // Eliminarlo restaura el total original
        eliminarProducto(nuevo.id);
        expect(obtenerProductos().length).toBe(totalInicial);
        expect(obtenerProductos().some((p) => p.id === nuevo.id)).toBe(false);
    });

});
