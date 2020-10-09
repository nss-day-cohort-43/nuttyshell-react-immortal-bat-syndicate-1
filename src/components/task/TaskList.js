import React, { useContext, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import "./Task.css"
import { useHistory } from "react-router-dom"

export const TaskList = () => {
    const { tasks, getTasksByUserId, removeTask, completeTask } = useContext(TaskContext)

    const history = useHistory()
    const userId = localStorage.getItem("nutty_customer")
    
    useEffect(() => {
		    getTasksByUserId(userId)	
    }, [tasks])

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
                        return (
                            <section className="task" key={task.id}>
                                <TaskCard task={task} />
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
                    })
                }
            </div>
        </>
    )
}