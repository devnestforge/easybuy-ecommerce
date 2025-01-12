import React, { createContext, useContext, useState, useEffect } from 'react'

// Crear el contexto del carrito
const CartContext = createContext()

// Proveedor de contexto del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // Al montar el componente, verificamos si ya hay productos en localStorage
    const storedCart = localStorage.getItem('cartItems')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart)) // Cargar el carrito desde localStorage
    }
  }, [])

  useEffect(() => {
    // Guardar el carrito en localStorage cada vez que cartItems cambie
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    } else {
      localStorage.removeItem('cartItems') // Si no hay productos, eliminamos el carrito
    }
  }, [cartItems])

  useEffect(() => {
    // Escuchar cambios en localStorage desde otras pestañas
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
  const addToCart = (product) => {
    setCartItems(prevCartItems => {
      const existingProductIndex = prevCartItems.findIndex(item => {
        // Verificar si el producto ya existe, por ejemplo, considerando id y otros atributos
        return item.id === product.id && JSON.stringify(item) === JSON.stringify(product)
      })

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, incrementamos su cantidad
        const updatedCartItems = [...prevCartItems]
        updatedCartItems[existingProductIndex].quantity += 1
        // Actualizamos el localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        return updatedCartItems
      } else {
        // Si el producto no existe, lo agregamos con una cantidad inicial de 1
        const updatedCartItems = [...prevCartItems, { ...product, quantity: 1 }]
        // Actualizamos el localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        return updatedCartItems
      }
    })
  }

  // Función para eliminar productos del carrito
  const removeFromCart = (id) => {
    setCartItems(prevCartItems => {
      const updatedCartItems = prevCartItems.filter(item => item.id !== id)
      // Actualizar el localStorage con el carrito modificado
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      return updatedCartItems
    })
  }

  // Calcular el total de productos en el carrito (sumando las cantidades)
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para acceder al carrito
export const useCart = () => useContext(CartContext)
