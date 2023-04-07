import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Counter2State = {
    counter: number,
    loading: boolean;
};

const initialValues: Counter2State = {
    counter: 0,
    loading: false,
}

// Asynchronous set state
export const setValueAsync = createAsyncThunk(
    "counter2/setValueAsync",
    async (value: number) => {
        const job = new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                if (value >= 0) {
                    resolve(value);
                } else {
                    reject(Error(""))
                }
            }, 1000);
        });
        return await job;
    })

// Synchronous set state
const counter2Slice = createSlice({
    name: "counter2",
    initialState: initialValues,

    // update Sync state // ดึงค่า หรือ รับค่า ของฟังชั่น set Sync มาใช้งาน // น่าจะเป็นตัวอัพเดทค่า state 
    reducers: {
        increase: (state: Counter2State, action: PayloadAction<void>) => {
            state.counter = state.counter + 1;
        }
    },

    // update Async state
    extraReducers: (builder) => {
        builder.addCase(setValueAsync.fulfilled, (state, action) => { // .fulfilled == sucsess
            state.counter = action.payload // payload = ผลลัพที่ออกมาจาก ฟังชั่น set Async
            state.loading = false;
        })
        
        builder.addCase(setValueAsync.rejected, (state, action) => { // .rejected == error
            state.counter = 0;
            state.loading = false;
        })
        
        // ฟังฟั่นกำลัวจะทำงาน เมื่อทำงานเสร็จ จะ ful or rejec ก็ ปิดชั้นนี้ ปิดแสดง loading
        builder.addCase(setValueAsync.pending, (state, action) => { // .pending == loading
            state.loading = true;
        })
    }
})

export const { increase } = counter2Slice.actions;
export const counter2Selector = (store: RootState) => store.counter2Reducer;
export default counter2Slice.reducer;