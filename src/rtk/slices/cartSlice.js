import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};


const cartSlice = createSlice({
    initialState : loadCartFromLocalStorage(),
    name:"cartSlice",
    reducers:{
        addToCart : (state , action)=>{
            const findProduct = state.find(product=> product.id === action.payload.id);
            if(findProduct){
                findProduct.quantity += 1;
            }
            else{
                const productClone = {...action.payload , quantity:1};
                state.push(productClone)
            }
            
        },
        deleteFromCart : (state , action)=>{
            return state.filter(product => product.id !== action.payload.id)
        },
        clear : (state , action)=>{
            return []
        },
        updateQuantity: (state, action) => {
            const product = state.find(item => item.id === action.payload.id);
            if (product) {
                product.quantity = action.payload.quantity; 
                localStorage.setItem('cart', JSON.stringify(state));
            }
        }
    }
})


export const {addToCart , deleteFromCart , clear, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;