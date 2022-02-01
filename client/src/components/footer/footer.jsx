import { useDispatch, useSelector } from "react-redux";
import { 
    deleteAll, 
    updateFilter } from "../../store/todoSlice"

import './footer.css'

function Footer() {
    const todos = useSelector(state => state.todos.todos)
    const filter = useSelector(state => state.todos.filter)

    // console.log(filter)

    // const tasks = useSelector(state => {
    //     const { itemsReducer } = state;
    //     return itemsReducer.tasks;
    // })

    // const filter = useSelector(state => {
    //     const { itemsReducer } = state;
    //     return itemsReducer.filter;
    // })

    const dispatch = useDispatch();

    const falseItems = todos.filter(todo => !todo.done).length
    const trueItems = todos.filter(todo => todo.done).length

    const buttonsData = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'compleated', label: 'Completed' }
    ]

    const buttons = buttonsData.map(({ name, label }) => {
        let clazz = filter === name ? "to-do__btn-active" : "to-do__board-btn";
  
        const filterBtn = (name) => {
            try {
                dispatch(updateFilter(name))
            } catch (error) {
                console.log(error)
            }
        }

        return (
            <button
                className={clazz}
                type="button"
                onClick={() => filterBtn(name)}
                key={name}
            >
                {label}
            </button>
        )
    })


    const deleteAllTasks = (e) => {
        e.preventDefault();
        try {
            dispatch(deleteAll(true))
        } catch (error) {
            console.log(error)
        }
    }

    if (todos.length) {
        const checkS = falseItems > 1 ? "s" : "";
        const classBtn = trueItems ? "to-do__board-btn-clear to-do__board-btn-active" : "to-do__board-btn-clear";

        return (
            <div className="to-do__board">
                <p className="to-do__board-list-items">
                    {falseItems} item{checkS}
                </p>
                <ul className="to-do__board-check">
                    <li className="to-do__board-li">
                        {buttons}
                    </li>
                </ul>
                <div
                 className={classBtn}
                 >
                    <button
                        className="to-do__board-list-btn"
                        onClick={deleteAllTasks}
                    >
                        Clear completed
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (<></>)
    }

}

export default Footer;
