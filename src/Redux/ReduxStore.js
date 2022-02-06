import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import MainReducer from "./MainReduser";
// import {configureStore} from '@redux/toolkit'
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
    reducer: {
        MainReducer: MainReducer,
    },
})
window.store = store
export default store
