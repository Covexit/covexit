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
      console.log('id', id)
      let addedProduct = state.cart.find(product => product.id === id)
      // console.log('addedProduct', addedProduct)

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
      let newTotal = state.total - (removedProduct.price * removedProduct.quantity)
      return {
        ...state,
        cart: updatedCart,
        total: newTotal
      }


    case 'UPDATE_PRODUCT':

      const updatedProducts = state.cart.map((product) => {
        if (product.id === action.payload.product_id) {
          return {
            ...product,
            quantity: action.payload.quantity
          }
        } else {
          return product
        }
      })


      const newState = { ...state }
      return {
        ...newState,
        cart: updatedProducts
        // total:
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

  const updateProduct = (product) => {
    console.log('product', product)
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: product,
    })
  }

  return { cart, total, addProduct, delProduct, updateProduct }
}

export const [CartProvider, useCartContext] = constate(useCart)
