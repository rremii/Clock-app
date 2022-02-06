import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {wait} from "@testing-library/user-event/dist/utils";
import {locationAPI, qoutesAPI, timeAPI} from "../api/api";

export const fetchTime = createAsyncThunk(
    'MainSlice/fetchTime',
    async (timezone) => {
        try {
            let response = await timeAPI.getTime(timezone)
            return response.data
        } catch (e) {
            throw new Error(e)
        }
    }
)
export const fetchLocation = createAsyncThunk(
    'MainSlice/fetchLocation',
    async () => {
        try {
            let response = await locationAPI.getLocation()
            return response.data
        } catch (e) {
            throw new Error(e)
        }
    }
)
export const fetchQoutes = createAsyncThunk(
    'MainSlice/fetchQoutes',
    async () => {
        try {
            let response = await qoutesAPI.getQoutes()
            return response.data
        } catch (e) {
            throw new Error(e)
        }
    }
)


let initialState = {
    qoute: {
        author: '',
        content: ''
    },
    abbreviation: '',
    time: null,
    timezone: '',
    dayOfYear: '',
    dayOfWeek: '',
    weekNumber: '',
}
const MainSlice = createSlice({
    name: 'MainSlice',
    initialState,
    reducers: {
        addSec(state, action) {
            console.log('qwe')
            state.time = state.time + 1000
        }
    },
    extraReducers: {
        [fetchTime.fulfilled]: (state, action) => {

            state.time = (new Date(action.payload.datetime)).getTime()
            state.abbreviation = action.payload.abbreviation
            state.timezone = action.payload.timezone
            state.dayOfYear = action.payload.day_of_year
            state.dayOfWeek = action.payload.day_of_week
            state.weekNumber = action.payload.week_number
        },
        [fetchTime.rejected]: (state, action) => {
            alert(action.error.message)
        },
        [fetchLocation.fulfilled]: (state, action) => {
            state.timezone = action.payload.time_zone
        },
        [fetchLocation.rejected]: (state, action) => {
            alert(action.error.message)
        },
        [fetchQoutes.fulfilled]: (state, action) => {
            state.qoute.author = action.payload.author
            state.qoute.content = action.payload.content
        },
        [fetchQoutes.rejected]: (state, action) => {
            alert(action.error.message)
        },
    }

})
export const {addSec} = MainSlice.actions
export default MainSlice.reducer


