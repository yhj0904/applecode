import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({     //state 보관방법
    name:'user',
    initialState:{name : 'kim', age : 20},
    reducers:{
      changeName(state){  //기존 state
        return 'john kim' + state
      },
      increase(state, action){
        state.age += action.payload   // state 변경함수를 모두 action 이라함
      }

    }
})

export let {changeName, increase} = user.actions //destructuring


export default user