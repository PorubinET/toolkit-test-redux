import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, completedAll } from "../../store/todoSlice"
import TaskItem from "../taskItem/taskItem"

import './taskinput.css'


function TaskInput() {
    const [text, setText] = useState('');
    const dispatch = useDispatch()   
    const filter = useSelector(state => state.todos.filter)
    const todos = useSelector(state => {
        if (filter === "compleated") {
            return state.todos.todos.filter((items) => items.done);
        }
        else if (filter === "active") {
            return state.todos.todos.filter(items => !items.done);
        }
        else {
            return state.todos.todos
        }
    })

    // ввод текста
    const handleChange = (e) => { setText(e.target.value = e.target.value.replace(/ +/g, ' ')) }


    // добавление таски
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text === "" || text === " ") {
            alert('Заполните поле')
        }
        else {
            dispatch(createTask(text))
            setText(e.target.value = "")
        }
    };

    const allCompleated = async (e) => {
        e.preventDefault();
        dispatch(completedAll(todos.every(todo => todo.done)))
    }

    // взаимодействие с css 
    let classArrow, classCheck;

    if (todos.length) {
        classArrow = "to-do__list-btn-arrow to-do__list-btn-arrow-active";
        classCheck = "to-do__list-btn to-do__list-btn-active";
    } else {
        classArrow = "to-do__list-btn-arrow";
        classCheck = "to-do__list-btn";
    }

    if (todos.every(item => item.done)) { classArrow += " to-do__fading" }

    return (
        <div className="App flex">
            <form
                className="add"
            onSubmit={handleSubmit}
            >
                <input
                    className={classCheck}
                    onClick={allCompleated}
                    type="checkbox">
                </input>
                <img
                    className={classArrow}
                    src="/img/arrow.svg"
                    alt="arrow"
                />
                <input
                    className="to-do__task"
                    type="text"
                    required={true}
                    value={text}
                    onChange={handleChange}
                    placeholder="What needs to be done?">
                </input>
            </form>
            <ul >
                {todos.map((task) => (
                    <TaskItem
                        _id={task._id}
                        desc={task.desc}
                        done={task.done}
                        text={task.text}
                        date={task.date}
                        key={task._id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TaskInput;
