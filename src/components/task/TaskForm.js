import React, { useContext, useRef } from "react"
import { TaskContext } from "./TaskProvider"
import { useHistory } from "react-router-dom"

export const TaskForm = () => {
    const { addTask } = useContext(TaskContext)

    const task = useRef()
    const date = useRef()

    const history = useHistory()

    const constructNewTask = () => {
        addTask({
            task: task.current.value,
            date: date.current.value,
            userId: parseInt(localStorage.getItem("nutty_customer")),
            completed: false
        }).then(() => history.push("/tasks"))
    }

    const handleSubmit = event => {
        event.preventDefault()
        constructNewTask()
    }

     return (
         <section className="taskForm">
             <form onSubmit={handleSubmit}>
                 <label htmlFor="task">Task: </label>
                <input type="text" name="task" ref={task} required />
                <label htmlFor="date">Date to be Completed: </label>
                <input type="date" name="date" ref={date} min={new Date(Date.now() - 18000000).toISOString().split("T")[0]} required />
                <button type="submit">Save Task</button>
                <button type="button" onClick={() => {
                    history.push("/tasks")
                }}>Cancel</button>
            </form>
         </section>
     )
}