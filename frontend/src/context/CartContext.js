import { useEffect, useReducer } from 'react'
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage'

const initialState = {
  cart: [],
  total: 0
}

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case 'ADD_PRODUCT':
      const id = action.payload.product.id
      let addedProduct = state.cart.find(product => product.id === id)

      if (addedProduct) {

        return {
          ...state,
          cart: state.cart.map(product => {
            const productCopy = Object.assign({}, product)
            if (productCopy.id === id) productCopy.quantity += 1
            return productCopy
          }),
          total: state.total + addedProduct.price
        }
      } else {
        addedProduct = action.payload.product
        addedProduct.quantity = 1

        return {
          ...state,
          cart: [...state.cart, addedProduct],
          total: state.total + addedProduct.price
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
