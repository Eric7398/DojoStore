import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'
// THIS IS THE CONNECT THE REDUX STORE!!! 
// ALSO INSIDE INDEX.JS FILE

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,

})

// Check if cart items are in local storage 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// Check if user info is in local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

// The starting state of these localstorages || "Sessions"
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

// createStore -> "storage" 
// initialState -> empty object that is empty 
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
