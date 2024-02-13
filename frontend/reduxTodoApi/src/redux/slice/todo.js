import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const response = await fetch("http://localhost:3000/todos");
    return response.json();
});

export const createTodo = createAsyncThunk(
    "createTodo",
    async ({ title, description }, thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3000/createTodo", {
                method: "POST",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data.todo;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const completeTodo = createAsyncThunk("completeTodo",
    async ({ todoId }) => {
        const response = await fetch("http://localhost:3000/completeTodo", {
            method: "PUT",
            body: JSON.stringify({
                id: todoId
            }), headers: {
                "Content-Type": "application/json"
            }
        });
        fetchTodos()
        return todoId;
    })

export const deleteTodo = createAsyncThunk("deleteTodo",
    async ({ todoId }) => {
        const response = await fetch(`http://localhost:3000/delete-todo/${todoId}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
        fetchTodos()

        return todoId;
    }
)

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        data: null,
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true;
                console.log("pending");
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                alert("Database is down , try again after some time:)")

            })
            .addCase(completeTodo.fulfilled, (state, action) => {
                state.isLoading = false;

            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false
            })
    },
});

export default todoSlice.reducer;
