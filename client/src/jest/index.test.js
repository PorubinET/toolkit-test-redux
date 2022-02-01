import expect from 'expect';
import { render } from '@testing-library/react';

import {
    getTasks,
    addTask,
    updateTasks,
    updateTask,
    updateCheck,
    deleteTask,
    deleteTaskAll
} from "../../src/services/taskServices";

import todoReducer, {
    taskLoad,
    initialState,
    todoSlice,
    inputDelete,
    updateText,
    updateChecker,
    completedAll,
    deleteAll,
    updateFilter,
    createTask,
    increment,
    decrement
} from '../store/todoSlice'

import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore([thunk]);

const mockState = {
    todos: [{
        _id: "ssdas212uh3344220",
        text: "text1",
        done: false,
        desc: '',
        date: '2022-01-30T21:24:30.283Z'
    },
    {
        _id: 'ssdas212uh3344221',
        text: "text2",
        done: false,
        desc: '',
        date: '2022-02-30T21:24:30.283Z'
    },
    {
        _id: 'ssdas212uh3344222',
        text: "text3",
        done: false,
        desc: '',
        date: '2022-03-30T21:24:30.283Z'
    }],
    filter: 'all',
}

it('returns initial state', () => {
    const nextState = todoReducer(undefined, {});
    expect(nextState).toBe(initialState);
});

it('filter', () => {
    const nextState = todoReducer(initialState, updateFilter('compleated'));
    expect(nextState.filter).toBe('compleated');
    // console.log(nextState.filter, "<<<filter")
});



    it('Test should transmit a fake database', async () => {
        const mockGet = jest.spyOn(axios, 'get');
        mockGet.mockImplementation(() => Promise.resolve({
            status: 200,
            data: mockState 
        }));
        const store = mockStore(mockState);
        const request = await store.dispatch(taskLoad());
        const nextState = todoReducer(initialState, request);
        expect(nextState.todos).toBe(mockState);
        expect(request.meta.requestStatus).toEqual("fulfilled")
        expect(request.type).toEqual("todos/load/fulfilled")
        expect(request.payload).toEqual(mockState)
        // console.log(nextState.todos, "<<<getTodos")
    })
    
    it('Test should pass the text to create a new task', async () => {
        const mockGet = jest.spyOn(axios, 'post');
        mockGet.mockImplementation(() => Promise.resolve({
            status: 200,
            statusText: "OK",
            data: {
                _id: 'ssdas212uh3344223',
                text: "bla-bla",
                done: false,
                desc: '',
                date: '2022-03-30T21:24:30.283Z'
            }
        }));
        const someText = 'bla-bla'
        const store = mockStore(mockState);
        const request = await store.dispatch(createTask(someText));
        const nextState = todoReducer(mockState, request);
        // console.log(nextState, '<<createTask')
        // expect(nextState.todos).toEqual([request.payload])   
        // expect(request.meta.requestStatus).toEqual("fulfilled")
        // expect(request.type).toEqual("users/createTask/fulfilled")
        // expect(request.meta.arg).toEqual('bla-bla')
        // console.log(nextState.todos)
    })

    it('Test should delete by id', async () => {
        const mockGet = jest.spyOn(axios, 'delete');
        mockGet.mockImplementation(() => Promise.resolve({
            status: 200,
            statusText: "OK",
        }));
        const store = mockStore(mockState);
        const _id = "ssdas212uh3344222"
        const request = await store.dispatch(inputDelete(_id));
        const nextState = todoReducer(mockState, request);
        // console.log(nextState, "<<<inputDelete")
        // const request = await store.dispatch(inputDelete(_id));
        // console.log(mockGet.mockRejectedValue)
        // console.log(request.payload)
    })

    it('Test should update the text', async () => {
        const mockGet = jest.spyOn(axios, 'put');
        mockGet.mockImplementation(() => Promise.resolve({
            status: 200,
            statusText: "OK",
        }));
        const store = mockStore(mockState);
        const newText = "lalalalala"
        const id = "ssdas212uh3344222"
        const request = await store.dispatch(updateText({_id: id, input: newText}));
        const nextState = todoReducer(mockState, request);
        // console.log(nextState, "<<<updateTask")



        
        // let _id = "ssdas212uh3344222"
        // const request = await store.dispatch(inputDelete(_id));
        // console.log(mockGet.mockRejectedValue)
        // console.log(request.payload)
    })


// describe('extraReducers', () => {
 

// it('Delete _id', async () => {
//     const mockGet = jest.spyOn(axios, 'delete');
//     mockGet.mockImplementation(() => Promise.resolve({
//         status: 200,
//     }))
//     const _id = "ssdas212uh3344222";
//     const store = mockStore(mockState);
//     const request = await store.dispatch(inputDelete(_id));
// })

// it('deleteTask', async () => {
//     const _id = "61f6ab244ad6820d94474232";
//     await deleteTask(_id); 
//     const res = await getTasks()
//     expect(await res.data.filter(todo => todo._id === _id)).toEqual([])
// })

// it('deleteTask', async () => {
//     const _id = "61f6ab244ad6820d94474232";
//     const store = mockStore(mockState);
//     await store.dispatch(deleteTask(_id)); 
//     const res = store.dispatch(taskLoad())
//     expect(await res.data.filter(todo => todo._id === _id)).toEqual([])
// })

