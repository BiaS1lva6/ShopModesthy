import { createContext, useState, useContext, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    const count = cart.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [cart])

  const addToCart = (product, quantity = 1, size = "Único") => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id && item.size === size)

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        return [...prevCart, { ...product, quantity, size }]
      }
    })
  }

  const removeFromCart = (productId, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === productId && item.size === size)))
  }

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId && item.size === size ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}