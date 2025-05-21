import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : [],
    reducers:{
        addfeed :(state,action)=>{
             return action.payload},
        removeUserFromfeed : (state,action)=> {
            const newfeed = state.filter(r=> r._id != action.payload );
            return newfeed;
        },
    },
});

export const {addfeed, removeUserFromfeed} = feedSlice.actions;
export default feedSlice.reducer;