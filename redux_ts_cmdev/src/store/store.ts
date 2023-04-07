import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import counter1Reducer from "./slices/counter1Slice";
import counter2Reducer from "./slices/counter2Slice";

const reducer = {
    counter1Reducer,
    counter2Reducer,
}

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === "development", // ใช้แสดงข้อมูลใน command ระหว่าง พัฒนา เมื่อ npm start === "development"  && npm build !== "development" , build คือเว็บขึ้นออนไลน์ เลยไม่ให้ขช้อมูล state มั้ง , หรือเรียกว่า ไม่แสดง print logs มั้งนะ
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();