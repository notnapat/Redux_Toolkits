import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Counter1State = {
    counter: number,
    loading: boolean;
};

const initialValues: Counter1State = {
    counter: 0,
    loading: false,
}

// Asynchronous set state
export const setValueAsync = createAsyncThunk(
    "counter1/setValueAsync",
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
const counter1Slice = createSlice({
    name: "counter1",
    initialState: initialValues,

    // update Sync state // ดึงค่า หรือ รับค่า ของฟังชั่น set Sync มาใช้งาน // น่าจะเป็นตัวอัพเดทค่า state 
    reducers: {
        increase: (state: Counter1State, action: PayloadAction<void>) => {
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

export const { increase } = counter1Slice.actions;
export const counter1Selector = (store: RootState) => store.counter1Reducer;
export default counter1Slice.reducer;