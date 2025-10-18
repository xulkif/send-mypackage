import { createSlice } from "@reduxjs/toolkit";
const initialState={
    city:[],
    loading:true,

}



const CitySlice=createSlice({
    name:'city',
    initialState,
    reducers:{
        setCity:(state,action)=>{
            state.city=action.payload;
            state.loading=false
        }
    }
})
       
 

export const {setCity}=CitySlice.actions;
export default CitySlice.reducer;