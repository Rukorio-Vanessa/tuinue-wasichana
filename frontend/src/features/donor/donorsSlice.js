import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    state: "idle",
    error: null,
    donorsList: [],
    donationAmount:0
}

const USERS_URL = "https://tuinue-wasichana-api.onrender.com/users";

export const fetchDonors = createAsyncThunk("donors/fetchDonors", async () => {
    const response = await axios.get(USERS_URL)
    return [...response.data]
})

export const createDonor = createAsyncThunk("donors/createDonor", async (data) => {
    const response = await axios.post(`${USERS_URL}`, data)
    return [response.data]
})

export const updateDonor = createAsyncThunk("donors/updateDonor", async({id,data}) =>{
    const response = await axios.patch(`${USERS_URL}/${id}`,data)
    return [response.data]
})

export const deleteDonor = createAsyncThunk("donors/deleteDonor", async (id) => {
    const deleteRequest = await axios.delete(`${USERS_URL}/${id}`)
    return [deleteRequest.status]
})

const donorsSlice = createSlice({
    name: "donors",
    initialState,
    reducers: {
    changeDonateAmount:(state,action) => void(state.donationAmount = action.payload)

    }, extraReducers(builder) {
        builder
            .addCase(fetchDonors.fulfilled, (state, action) => {
                state.donorsList = action.payload;
            })
            .addCase(createDonor.fulfilled, (state, action) => {
                state.donorsList = action.payload;
            })
            .addCase(updateDonor.fulfilled,(state,action) =>{
                state.donorsList = action.payload;
            })
            .addCase(deleteDonor.fulfilled,(state,action) =>{
                console.log(action.payload)
            })
    }
})

export const selectDonors = (state) => (state.donors.donorsList)

export const selectDonationAmount = (state) => (state.donors.donationAmount)

export const {changeDonateAmount} = donorsSlice.actions;

export default donorsSlice.reducer;