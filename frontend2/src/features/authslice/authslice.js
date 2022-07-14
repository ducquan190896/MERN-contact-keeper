import {createSlice, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import { json } from 'express'


const initialState = {
    user: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const register = createAsyncThunk('register/auth', 
        async (formdata, thunkAPI) => {
            try {
                console.log(formdata)
                const response = await fetch('http://localhost:5000/api/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formdata)
                })
                const data = await response.json()
                return data
            } catch (err) {
                return  thunkAPI.rejectWithValue(err.message)
            }
        }
)

// export const login = createAsyncThunk('login/auth', 
//         async (formdata, thunkAPI) => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/users/signin', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formdata)
//                 })
//                 const data = await response.json()
//                 return data
//             } catch (err) {
//                 return thunkAPI.rejectWithValue(err.message)
//             }
//         }
// )

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            state.user = ''
        })
    }

})


export const {reset} = authSlice.actions
export default authSlice.reducer