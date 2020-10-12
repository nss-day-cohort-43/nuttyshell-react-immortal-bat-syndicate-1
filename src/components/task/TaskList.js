import React, { useContext, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import { useHistory } from "react-router-dom"

export const TaskList = () => {
    const { tasks, getTasksByUserId } = useContext(TaskContext)

    const history = useHistory()
    
    useEffect(() => {
            getTasksByUserId(localStorage.getItem("nutty_customer"))
    }, [])

    //Prevents completed task from showing up on the DOM
    const incompleteTasks = tasks.filter(task => task.completed === false)

    return (	
        <>
            <h2>Tasks</h2>
            <button type="button" onClick={() => {
                //takes user to task form
                history.push("/tasks/create")
            }}>New Task</button>
            <div className="tasks">
                {
                    incompleteTasks.map(task => {
                        //creates card for each task
                        return <TaskCard key={task.id} task={task} />
                    })
                }
            </div>
        </>
    )
}