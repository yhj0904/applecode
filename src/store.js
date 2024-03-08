//Redux

import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'



const sample = createSlice({
  name:'sample',
  initialState: [
    {id : 0, name : 'White and Black', count : 2},
    {id : 1, name : 'Grey Yordan', count : 1}
  ],
  reducers: {
    addCount(state, action){
     let result = state.findIndex((a)=> {  // array 뒤에만 가능.
        return a.id === action.payload
      })
      state[result].count++
    },
    addItem(state, action){
      state.push(action.payload)
    }
  }
})
export const {addCount, addItem} = sample.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    sample : sample.reducer

   }
}) 