import { createSlice } from "@reduxjs/toolkit"

const initialState={
    product:[]
}

 const ProductTodo= createSlice({
    name: 'products',
    initialState,
    reducers:{
        addProduct:(state,action)=>{
           const newProduct={...action.payload, id: Math.floor(Math.random()*1000)}
           state.product.push(newProduct)
        },
        removeProduct:(state,action)=>{
          state.product=  state.product.filter(item=>item?.id !== action.payload)
          console.log("State",state.product)

        },
        updateProduct:(state,action)=>{
            const getitemIndex=state.product.findIndex((item)=>item.id===action.payload.id)
            console.log(getitemIndex,"getindex")
            if(getitemIndex >=0){
                // state.product[getitemIndex] = { ...state.product[getitemIndex], ...action.payload };
                state.product[getitemIndex] = { ...action.payload };
            
            //    ...state.product[getitemIndex], yhe old value show karega
            // or iski jgay yhe new data action.payload rewrite ho jayega
            // console.log("first",{...action.payload})
            }

        }
    }
    })

 export const {addProduct,removeProduct,updateProduct}=ProductTodo.actions;
    export default ProductTodo.reducer;