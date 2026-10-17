// src/tests/mockData.test.jsx
// Pruebas de la capa de datos: ofertas, CRUD completo y búsquedas.
import { beforeEach, describe, expect, it } from 'vitest';
import {
    inicializarInventario,
    obtenerProductos,
    obtenerProductoPorId,
    obtenerOfertas,
    crearProducto,
    actualizarProducto,
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

    it('obtenerProductoPorId devuelve el producto correcto o null', () => {
        // prod-001 es Dune en el seed
        const dune = obtenerProductoPorId('prod-001');
        expect(dune).not.toBeNull();
        expect(dune.nombre).toContain('Dune');
        expect(dune.categoria).toBe('libros');

        // ID inexistente devuelve null
        const noExiste = obtenerProductoPorId('id-falso-999');
        expect(noExiste).toBeNull();
    });

    it('actualizarProducto modifica los campos del inventario', () => {
        // Tomar el primer producto del seed
        const original = obtenerProductoPorId('prod-001');
        const precioOriginal = original.precio;

        // Actualizar precio y stock
        actualizarProducto('prod-001', { precio: 9999, stock: 3 });

        const actualizado = obtenerProductoPorId('prod-001');
        expect(actualizado.precio).toBe(9999);
        expect(actualizado.stock).toBe(3);
        // El nombre NO cambió
        expect(actualizado.nombre).toBe(original.nombre);

        // Restaurar para no afectar otras pruebas
        actualizarProducto('prod-001', { precio: precioOriginal, stock: original.stock });
    });

});
