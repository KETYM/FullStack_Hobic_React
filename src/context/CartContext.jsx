import { createContext, useState, useEffect, useContext} from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [carrito, setCarrito] = useState(() => {
        try {
            const carritoGuardado = localStorage.getItem('carritoHobic');
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('carritoHobic', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            // Cambiado a ID por seguridad y precisión
            const productoExistente = prevCarrito.find(item => item.id === producto.id);

            if (productoExistente) {
                return prevCarrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
        // Nota: Considera cambiar este alert por un Toast en el futuro para mejor UX
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

    const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPlata = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return(
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito, // Corregido el typo aquí
            cambiarCantidad,
            eliminarDelCarrito,
            totalArticulos,
            totalPlata
        }}>
            {children}
        </CartContext.Provider>
    );
}