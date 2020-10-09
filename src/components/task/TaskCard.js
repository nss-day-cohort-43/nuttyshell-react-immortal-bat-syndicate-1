import React, { useContext, useState, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"

export const TaskCard = ({ task }) => {
    const { removeTask, completeTask } = useContext(TaskContext)
    return (
        <section className="task">
            <h3 className="task__name">{task.task}</h3>
            <p>{task.date}</p>
            <label htmlFor="complete">Completed? </label>
            <input type="checkbox" onClick={() => {
                task.completed = true
                completeTask(task)
            }} /><br />
            <button type="button" onClick={() => {
                removeTask(task.id)
            }}>Delete</button>
        </section>  
    )
}