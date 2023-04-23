import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contain productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ) 
  }

  // otherwise return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}


const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cartItem to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  // check if quantity is 1, remove that from cart 
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => 
      cartItem.id !== cartItemToRemove.id)
  }

  // for quantity > 1, reduce the quantity
  return cartItems.map((cartItem) => (
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  ))
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})


const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

// reducer function to be dispatched 
const cartReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}) => {
  // const [isCartOpen, setIsCartOpen] = useState(false)
  // const [cartItems, setCartItems] = useState([])
  // const [cartCount, setCartCount] = useState(0)
  // const [cartTotal, setCartTotal] = useState(0)

  const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = 
    useReducer(cartReducer, INITIAL_STATE)

  // // calculate the total quantity at cart icon 
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity, 0)
  //   setCartCount(newCartCount)
  // }, [cartItems])

  // // calculate the total cart value at cart checkout page
  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
  //   setCartTotal(newCartTotal)
  // }, [cartItems])


  // generic function (action generator) dispatch action to update cart 
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0)

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)

    dispatch(
      createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS, 
        {
          cartItems: newCartItems,
          cartCount: newCartCount,
          cartTotal: newCartTotal,
        } 
      )
    )
  }

  // helper function to add 1 product to cart items array 
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  // helper function to remove 1 item from cart items array 
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  // helper function to clear 1 product from cart items array 
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems)
  }

  // (action generator)
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }


  const value = { isCartOpen, setIsCartOpen, addItemToCart, 
    removeItemFromCart, clearItemFromCart, cartItems, cartCount, 
    cartTotal }

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}
