import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import "./Task.css"
import { useHistory } from "react-router-dom"

export const TaskList = () => {
    const { tasks, getTasksByUserId } = useContext(TaskContext)

    const history = useHistory()
    const userId = localStorage.getItem("nutty_customer")
    
    useEffect(() => {
            getTasksByUserId(userId)
    }, [])

    const incompleteTasks = tasks.filter(task => task.completed === false)

    return (	
        <>
            <h2>Tasks</h2>
            <button type="button" onClick={() => {
                history.push("/tasks/create")
            }}>New Task</button>
            <div className="tasks">
                {
                    incompleteTasks.map(task => {
                        return <TaskCard key={task.id} task={task} />
                    })
                }
            </div>
        </>
    )
}