import { useEffect, useReducer } from 'react'
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage'

const initialState = {
  cart: [],
  total: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const id = action.payload.product.id
      let addedProduct = state.cart.find(product => product.id === id)

      if(addedProduct) {
        addedProduct.quantity += 1

        return {
          ...state,
          total: state.total + addedProduct.price
        }
      } else {
        addedProduct = action.payload.product
        addedProduct.quantity = 1

        let newTotal = state.total + addedProduct.price

        return {
          ...state,
          cart: [...state.cart, addedProduct],
          total: newTotal
        }
      }
    case 'DEL_PRODUCT':
      const removedProduct = state.cart.find(product => product.id === action.payload)
      const updatedCart = state.cart.filter(product => product.id !== action.payload)
      let newTotal = state.total - (removedProduct.price * removedProduct.quantity )

      return{
        ...state,
        cart: updatedCart,
        total: newTotal
      }
    default:
      throw new Error()
  }
}

const loggerReducer = logger(reducer)

const useCart = () => {
  const [data, setData] = useLocalStorage('cartData', initialState)
  const [state, dispatch] = useReducer(loggerReducer, data)

  useEffect(() => {
    setData(state)
  }, [state, setData])

  const { cart, total } = state

  const addProduct = product => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { product }
    })
  }

  const delProduct = id => {
    dispatch({
      type: 'DEL_PRODUCT',
      payload: id
    })
  }

  return { cart, total, addProduct, delProduct }
}

export const [CartProvider, useCartContext] = constate(useCart)