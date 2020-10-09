import React, { useState, createContext } from "react"

export const TaskContext = createContext()

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])

    const getTasks = () => {
        return fetch("http://localhost:8088/tasks")
            .then(res => res.json())
            .then(setTasks)
    }

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

    const getTasksByUserId = id => {
        return fetch(`http://localhost:8088/tasks?userId=${id}`)
            .then(res => res.json())
            .then(setTasks)
    }

    const removeTask = id => {
        return fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE"
        }).then(() => getTasksByUserId(localStorage.getItem("nutty_customer")))
    }

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
        <TaskContext.Provider value={{
            tasks, getTasks, addTask, getTasksByUserId, removeTask, completeTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}