import {
    getTasks,
    addTask,
    updateTasks,
    updateTask,
    updateCheck,
    deleteTask,
    deleteTaskAll
} from "../../src/services/taskServices";

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
    todos: [],
    filter: 'all',
  };

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {  
        updateFilter(state, action) {
            state.filter = action.payload
        }
    },
    
    extraReducers: (builder) => {
        builder   
        .addCase(taskLoad.fulfilled, (state, action) => {
            state.todos = action.payload;
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.todos = state.todos.concat(action.payload);
        })
        .addCase(inputDelete.fulfilled, (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload)
        })
        .addCase(updateText.fulfilled, (state, action) => {
            state.todos = state.todos.map(todo => ({ ...todo, text: todo._id === action.payload._id ? action.payload.input: todo.text}))
        })
        .addCase(updateChecker.fulfilled, (state, action) => {
            state.todos = state.todos.map(todo => ({ ...todo, done: todo._id !== action.payload._id ? todo.done : !todo.done }))
        })
        .addCase(completedAll.fulfilled, (state, action) => {
            state.todos.every(todo => todo.done) ? state.todos.map(todo => todo.done = !todo.done) : state.todos.map(todo => todo.done = true)
        })
        .addCase(deleteAll.fulfilled, (state, action) => {
            state.todos = state.todos.filter(todo => !todo.done) 
        })
    }
})

export const {
    updateFilter,
} = todoSlice.actions

export default todoSlice.reducer;

    export const taskLoad = createAsyncThunk(
        'todos/load',
        async function () {
            try {
                const response = await getTasks()
                const data = await response.data;
                return data
            } catch (error) {
                console.log(error)
            }

        }
    )

 export const inputDelete = createAsyncThunk(
    'users/inputDelete',
    async (_id) => {
        try {
            const res = await deleteTask(_id); 
            if(res.status === 200)  {
                return _id
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const createTask = createAsyncThunk(
    'users/createTask',
    async (payload) => {
        try {
            const res  = await addTask({text: payload.trim()});
            if(res.status === 200)  {
                return res.data
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const updateText = createAsyncThunk(
    'users/updateText',
    async (payload) => {
        try {
            const res = await updateTask(payload._id, {text: payload.input})
            console.log(res)
            if(res.status === 200)  {
                return { _id: payload._id, input: payload.input}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )
  
  export const updateDesc = createAsyncThunk(
    'users/updateDesc',
    async (payload) => {
        try {
            console.log(payload, 'users/updateDesc');
            const res = await updateTask(payload._id, {desc: payload.input})
            if(res.status === 200)  {
                return {payload}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const updateChecker = createAsyncThunk(
    'users/updateChecker',
    async (payload) => {
        try {
            const res = await updateCheck(payload._id, {done: !payload.done})
            if(res.status === 200)  {
                return { _id: payload._id, done: payload.done}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const completedAll = createAsyncThunk(
    'users/completedAll',
    async (payload) => {
        try {
            if(payload){
                console.log(payload, "true")
                const res = await updateTasks({done: false});
                if(res.status === 200)  {
                    return { done: payload}
                }
            }
            else{
                const res = await updateTasks({done: true})
                if(res.status === 200)  {
                    return { done: payload}
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const deleteAll = createAsyncThunk(
    'users/deleteAll',
    async (payload) => {
        try {
            const res = await deleteTaskAll(payload)
            if(res.status === 200)  {
                return {payload}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )
  
  export const updateDate = createAsyncThunk(
    'users/updateDate',
    async (payload) => {
        try {
            console.log(payload, 'users/updateDate');
            const res = await updateTask(payload._id, {date: payload.time})
            if(res.status === 200)  {
                return {payload}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  



