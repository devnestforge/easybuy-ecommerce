import React, { createContext, useContext, useState, useEffect } from 'react'
import userLogic from '../logic/userLogic'

// Crear el contexto del carrito
const CartContext = createContext()

// Proveedor de contexto del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    } else {
      localStorage.removeItem('cartItems')
    }
  }, [cartItems])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem('cartItems')
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Función para agregar productos al carrito
  /*const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(
        (item) => item.id === product.id
      )

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, actualizamos la cantidad
        const updatedCartItems = [...prevCartItems]
        updatedCartItems[existingProductIndex].quantity += product.quantity || 1
        return updatedCartItems
      } else {
        // Si el producto no existe, lo agregamos
        return [...prevCartItems, { ...product, quantity: product.quantity || 1 }]
      }
    })
  }*/

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(
        (item) => item.id === product.id
      )

      let updatedCartItems

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, actualizamos la cantidad
        updatedCartItems = [...prevCartItems]
        updatedCartItems[existingProductIndex].quantity += product.quantity || 1
      } else {
        // Si el producto no existe, lo agregamos
        updatedCartItems = [...prevCartItems, { ...product, quantity: product.quantity || 1 }]
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))

      //userLogic.saveViewCartLogic(updatedCartItems)

      return updatedCartItems
    })
  }

  // Función para eliminar productos del carrito
  const removeFromCart = (id) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== id)
    })
  }

  // Calcular el total de productos en el carrito
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const syncCart = (newCart) => {
    setCartItems(newCart)
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItems, setCartItems: syncCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para acceder al carrito
export const useCart = () => useContext(CartContext)
