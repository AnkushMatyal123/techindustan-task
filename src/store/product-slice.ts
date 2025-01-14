import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
}

export interface ProductsState {
  items: Product[]
  currentProduct: Product | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchTerm: string
  categoryFilter: string
  categories: { slug: string, name: string , url: string}[]
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  status: 'idle',
  error: null,
  searchTerm: '',
  categoryFilter: '',
  categories: [],
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ searchTerm, category }:Partial<{ searchTerm?: string; category?: string }> = {}) => {
    let url = 'https://dummyjson.com/products?limit=100'
    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}`
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}`
    }
    const response = await fetch(url)
    const data = await response.json()
    return data.products
  }
)

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await fetch('https://dummyjson.com/products/categories')
  const data = await response.json()
  return data
})

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await response.json()
  return data
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.categoryFilter = ''
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload
      fetchProducts({ category: action.payload })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  },
})

export const { setSearchTerm, setCategoryFilter } = productsSlice.actions
export default productsSlice.reducer

