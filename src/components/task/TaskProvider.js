import React, { useState, createContext } from "react"

//Creates task context 
export const TaskContext = createContext()

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])

    //Gets all tasks
    const getTasks = () => {
        return fetch("http://localhost:8088/tasks")
            .then(res => res.json())
            .then(setTasks)
    }

    //Adds tasks to database
    const addTask = task => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(getTasks)
    }

    //Gets tasks for the current user
    const getTasksByUserId = id => {
        return fetch(`http://localhost:8088/tasks?userId=${id}`)
            .then(res => res.json())
            .then(setTasks)
    }

    //Removes task from database
    const removeTask = id => {
        return fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE"
        }).then(() => getTasksByUserId(localStorage.getItem("nutty_customer")))
    }

    //Changes task to complete in database
    const completeTask = task => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(() => getTasksByUserId(localStorage.getItem("nutty_customer")))
    }

    return (
        //Sends out provider functions so they can be called outside the component tree
        <TaskContext.Provider value={{
            tasks, getTasks, addTask, getTasksByUserId, removeTask, completeTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}