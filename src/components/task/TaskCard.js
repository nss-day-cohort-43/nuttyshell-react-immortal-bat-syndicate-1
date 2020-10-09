import React, { useContext } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"

//Sets up a card for a task
export const TaskCard = ({ task }) => {
    const { removeTask, completeTask } = useContext(TaskContext)

    return (
        <section className="task">
            <h3 className="task__name">{task.task}</h3>
            <p>{task.date}</p>
            <label htmlFor="complete">Completed? </label>
            <input type="checkbox" onClick={() => {
                //sets the task to complete and updates it in the database
                task.completed = true
                completeTask(task)
            }} /><br />
            <button type="button" onClick={() => {
                //deletes task from the database
                removeTask(task.id)
            }}>Delete</button>
        </section>  
    )
}