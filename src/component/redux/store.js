import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./todoSlice"
import TodoProduct from "./productTodo"
export const store=configureStore({
    reducer:{
        tasks: TodoReducer,
        products:TodoProduct
    }
})