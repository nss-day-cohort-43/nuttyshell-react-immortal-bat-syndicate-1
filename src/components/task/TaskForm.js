import React, { useContext, useRef } from "react"
import { TaskContext } from "./TaskProvider"
import { useHistory } from "react-router-dom"

//renders a form to create a new task
export const TaskForm = () => {
    const { addTask } = useContext(TaskContext)

    const task = useRef()
    const date = useRef()

    const history = useHistory()

    //creates a new task object and adds it to the database, then takes the user back to the tasks page
    const constructNewTask = () => {
        addTask({
            task: task.current.value,
            date: date.current.value,
            userId: parseInt(localStorage.getItem("nutty_customer")),
            completed: false
        }).then(() => history.push("/tasks"))
    }

    //prevents submission of form until all fields filled out, then creates a new task
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
                {/* prevents user from selecting a past date for completion goal */}
                <input type="date" name="date" ref={date} min={new Date(Date.now() - 18000000).toISOString().split("T")[0]} required />
                <button type="submit">Save Task</button>
                <button type="button" onClick={() => {
                    //takes user back to tasks list
                    history.push("/tasks")
                }}>Cancel</button>
            </form>
         </section>
     )
}