import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    return data
})

const initialState = {
    products : [],
    status : "idle",
    error : null
}

const productSlice = createSlice(
    {
        name : "products",
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder
                .addCase(fetchProducts.pending, (state) => {
                    state.status = "Loading"
                })
                .addCase(fetchProducts.fulfilled, (state, action) => {
                    state.status = "Succeeded"
                    state.products = action.payload

                })
                .addCase(fetchProducts.rejected, (state, action) => {
                    state.status = "Failed"
                    state.error = action.error.message
                })
        }
    }
)

export default productSlice.reducer