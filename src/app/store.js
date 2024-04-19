import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./students/studentSlice";
import { teacherReducer } from "./teachers/teacherSlice";

export const store = configureStore({
	reducer: {
		student: studentReducer,
		teacher: teacherReducer,
	},
});
