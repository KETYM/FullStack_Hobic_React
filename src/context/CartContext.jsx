import { createContext, useState, useEffect, useContext} from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- por convención, el contexto exporta su hook junto al Provider
export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [carrito, setCarrito] = useState(() => {
        try {
            const carritoGuardado = localStorage.getItem('carritoHobic');
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('carritoHobic', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.id === producto.id);

            if (productoExistente) {
                return prevCarrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad }];
        });
        alert("Añadido al carrito de compra");
    };

    // Cambiado para recibir ID en lugar de index
    const cambiarCantidad = (id, cambio) => {
        setCarrito((prevCarrito) => 
            prevCarrito.map(item => {
                if (item.id === id) {
                    const nuevaCantidad = item.cantidad + cambio;
                    return { ...item, cantidad: nuevaCantidad < 1 ? 1 : nuevaCantidad };
                }
                return item;
            })
        );
    };

    // Cambiado para filtrar por ID en lugar de index
    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
    };

    // Vacía el carrito completo (cuando la compra se concretó)
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPlata = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return(
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito, // Corregido el typo aquí
            cambiarCantidad,
            eliminarDelCarrito,
            vaciarCarrito,
            totalArticulos,
            totalPlata
        }}>
            {children}
        </CartContext.Provider>
    );
}