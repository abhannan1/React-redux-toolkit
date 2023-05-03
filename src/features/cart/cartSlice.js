import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"
import axios from "axios";
import { openModal } from "../model/modalSlice";



const url = 'https://course-api.com/react-useReducer-cart-project';


const initialState = {
    cartItems: [],
    amount:2,
    total:0,
    isLoading:true
}

// export const getCartItems = createAsyncThunk("cart/getCartItems", ()=>{
//    return fetch(url)
//     .then((resp)=>resp.json())
//     .catch((err)=>console.log(err))
// });

//with ThunkAPI i can access any thing from any slice here and can generate custom message for error

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI)=>{
    //1st parameter is prop from the function in component
    //second parameter is thunkAPI
    //
    try{
        // console.log(name)
        // console.log(thunkAPI)
        // console.log(thunkAPI.getState())

        // thunkAPI.dispatch(openModal())
        const resp = await axios(url)
        return resp.data
    } catch(error){
        return thunkAPI.rejectWithValue('Something went wrong')
        //this will available in rejected case in action
    }
})



const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        clearCart: (state,action)=>{
            state.cartItems = []
        },
        increase: (state,action)=>{
            const cartItem = state.cartItems.find((item)=>
            item.id===action.payload)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state,action)=>{
            const cartItem = state.cartItems.find((item)=>item.id===action.payload)
            cartItem.amount = cartItem.amount - 1 
        },
        remove:(state,action)=>{
            state.cartItems = state.cartItems.filter((item)=>item.id!==action.payload.id)
        },
        getTotals: (state,action) =>{
            // const {total, amount} = state.cartItems.reduce((cartTotal, currentItem)=>{
            //     cartTotal.amount += currentItem.amount 
            //     cartTotal.total += currentItem.amount *currentItem.price
            //     return cartTotal
            //     // console.log(cartTotal)
            // },{
            //     total:0,
            //     amount:0
            // })

            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item)=>{
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = parseFloat(total.toFixed(2))
        }


    },
    extraReducers: (builder)=>{
        builder
            .addCase(getCartItems.pending,(state,action)=>{
                state.isLoading = true 
            })
            .addCase(getCartItems.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected,(state,action)=>{
                state.isLoading = false 
            })
    },


    // extraReducers:{
    //     [getCartItems.pending]: (state,action)=>{
    //         state.isLoading = true 
    //     },
    //     [getCartItems.fulfilled]: (state,action)=>{
    //         // console.log(action)
    //         state.isLoading = false;
    //         state.cartItems = action.payload;
    //     },
    //     [getCartItems.rejected]: (state,action)=>{
    //         // console.log(action.payload)
    //         state.isLoading = false 
    //     }
    // }
})

export const {clearCart, increase, decrease,remove, getTotals} = cartSlice.actions
// export const {actions} = cartSlice
// export const actions = cartSlice.actions
export default cartSlice.reducer