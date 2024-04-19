import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false, 
	teachers: [],
	error: "",
};

export const fetchTeachers = createAsyncThunk(
	"student/fetchTeachers",
	async () => {
		try {
			const res = await axios.get("http://localhost:3000/teachers");
			const data = await res.data;
			console.log(data + " mapped successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const addTeachers = createAsyncThunk(
	"teacher/addTeachers",
	async (newTeacher) => {
		try {
			const res = await axios.post(
				"http://localhost:3000/teachers",
				newTeacher
			);
			const data = await res.data;
			console.log(data + " added successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const deleteTeachers = createAsyncThunk(
	"teacher/deleteTeachers",
	async (id) => {
		try {
			const res = await axios.delete(`http://localhost:3000/teachers/${id}`);
			const data = await res.data;
			console.log(data + " deleted successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTeachers = createAsyncThunk(
	"teacher/updateTeachers",
	async (newTeacher) => {
		try {
			const res = await axios.put(
				`http://localhost:3000/teachers/${newTeacher.id}`,
				newTeacher
			);
			const data = await res.data;
			console.log(data + " updated successfully");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

const teacherSlice = createSlice({
	name: "teacher",
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
		///////// FETCH TEACHERS //////////
		builder
			.addCase(fetchTeachers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTeachers.fulfilled, (state, action) => {
				state.loading = false;
				state.teachers = action.payload;
			})

			.addCase(fetchTeachers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		///////// ADD TEACHERS //////////
		builder
			.addCase(addTeachers.pending, (state) => {
				state.loading = true;
			})
			.addCase(addTeachers.fulfilled, (state, action) => {
				state.loading = false;
				state.teachers = [...state.teachers, action.payload];
			})

			.addCase(addTeachers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		///////// DELETE TEACHERS //////////
		builder
			.addCase(deleteTeachers.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTeachers.fulfilled, (state, action) => {
				state.loading = false;
				state.teachers = state.teachers.filter(
					(teacher) => teacher.id !== action.payload.id
				);
			})

			.addCase(deleteTeachers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});

		///////// UPDATE TEACHERS //////////
		builder
			.addCase(updateTeachers.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateTeachers.fulfilled, (state, action) => {
				state.loading = false;
				state.teachers = state.teachers.map((teacher) =>
					teacher.id === action.payload.id ? action.payload : teacher
				);
			})

			.addCase(updateTeachers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const teacherReducer = teacherSlice.reducer;
export const teacherActions = teacherSlice.actions;
