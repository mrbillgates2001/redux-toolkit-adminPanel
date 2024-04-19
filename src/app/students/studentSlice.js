import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	students: [],
	error: "",
};

export const fetchStudents = createAsyncThunk(
	"student/fetchStudents",
	async () => {
		try {
			const res = await axios.get("http://localhost:3000/students");
			const data = await res.data;
			console.log(data + " mapped successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const addStudents = createAsyncThunk(
	"student/addStudents",
	async (newStudent) => {
		try {
			const res = await axios.post(
				"http://localhost:3000/students",
				newStudent
			);
			const data = await res.data;
			console.log(data + " added successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const deleteStudents = createAsyncThunk(
	"student/deleteStudents",
	async (id) => {
		try {
			const res = await axios.delete(`http://localhost:3000/students/${id}`);
			const data = await res.data;
			console.log(data + " deleted successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateStudents = createAsyncThunk(
	"student/updateStudents",
	async (newStudent) => {
		try {
			const res = await axios.put(
				`http://localhost:3000/students/${newStudent.id}`,
				newStudent
			);
			const data = await res.data;
			console.log(data + " updated successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

const studentSlice = createSlice({
	name: "Student",
	initialState,
	reducers: {
		searchTodos: (state, action) => {
			state.searchedTodos = state.todos.filter((todo) =>
				todo.title.toLowerCase().includes(action.payload.toLowerCase())
			);
		},
		filterTodos: (state, action) => {
			state.filteredTodos = state.todos.filter((todo) => todo.completed);
		},
	},
	extraReducers: (builder) => {
		///////// FETCH STUDENTS //////////
		builder
			.addCase(fetchStudents.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchStudents.fulfilled, (state, action) => {
				state.loading = false;
				state.students = action.payload;
			})

			.addCase(fetchStudents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		///////// ADD STUDENTS //////////
		builder
			.addCase(addStudents.pending, (state) => {
				state.loading = true;
			})
			.addCase(addStudents.fulfilled, (state, action) => {
				state.loading = false;
				state.students = [...state.students, action.payload];
			})

			.addCase(addStudents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		///////// DELETE STUDENTS //////////
		builder
			.addCase(deleteStudents.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteStudents.fulfilled, (state, action) => {
				state.loading = false;
				state.students = state.students.filter(
					(student) => student.id !== action.payload.id
				);
			})

			.addCase(deleteStudents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		///////// UPDATE STUDENTS //////////
		builder
			.addCase(updateStudents.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateStudents.fulfilled, (state, action) => {
				state.loading = false;
				state.students = state.students.map((student) =>
					student.id === action.payload.id ? action.payload : student
				);
			})

			.addCase(updateStudents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const studentReducer = studentSlice.reducer;
export const studentActions = studentSlice.actions;
