import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name:'message',
    initialState:[],
    reducers:{
        createMessage(state,action){
            state.push({
                id:action.payload.id,
                type:'success',
                title: 'Success',
                txt:action.payload.message
            })
        },
        removeMessage(state,requestId){
            const index = state.findIndex(item=> item === requestId.payload)
            state.splice(index,1);
        }
    }
})


export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
    async function(payload,{dispatch,requestId}){
        dispatch(messageSlice.actions.createMessage({
            ...payload,
            id:requestId,
        }))

        setTimeout(() => {
            dispatch(messageSlice.actions.removeMessage(requestId))
        }, 3000);
             
    }
)
export default messageSlice.reducer;
