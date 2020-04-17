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
      console.log('removedProduct', removedProduct)
      const updatedCart = state.cart.filter(product => product.id !== action.payload)
      console.log('updatedCart', updatedCart)
      let newTotal = state.total - (removedProduct.price * removedProduct.quantity)
      console.log('newTotal', newTotal)
      return {
        ...state,
        cart: updatedCart,
        total: newTotal
      }


    case 'UPDATE_PRODUCT':
      // const id = action.payload.product.id
      //id of action.payload.id
      //id of product
      //if they match then set the product.quantity to the action.payload.quantity?

      const quantity = action.payload
      console.log('quantity', quantity)

      // const productToUpdate = state.cart.find(product => product.id === action.payload.id)
      // console.log(productToUpdate, 'productToUpdate')




      let productQuantity = state.cart.find(product => product.quantity === quantity)
      console.log('productQuantity', productQuantity)

      const updatedQuantity = state.cart.filter(product => product.quantity !== quantity)
      console.log('updatedQuantity', updatedQuantity)


      const newState = { ...state }
      return {
        ...newState,
        cart: updatedQuantity,
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

  const updateProduct = (quantity) => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      // payload: { product },
      // id,
      payload: quantity
      // payload: id

    })
  }

  return { cart, total, addProduct, delProduct, updateProduct }
}

export const [CartProvider, useCartContext] = constate(useCart)
