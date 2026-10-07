import { createContext, useState, useEffect, useContext} from 'react';
// 1. Inicializamos el contexto
const CartContext = createContext();

//2. Hook personalizado para facilitar su uso en los componentes
export const useCart = () => useContext(CartContext);

//3. Proveedor del contexto
export const CartProvider = ({children}) =>{
    //Inicializamos el estado leyendo el localStorage directamente
    const []
}