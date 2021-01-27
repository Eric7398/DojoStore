import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

// THIS IS THE CONNECT THE REDUX STORE!!! 
// ALSO INSIDE INDEX.JS FILE

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

// createStore -> "storage" 
// initialState -> empty object that is empty 
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
