import React, { useContext, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import { useHistory } from "react-router-dom"
import { Button, Icon } from "semantic-ui-react"

export const TaskList = () => {
    const { tasks, getTasksByUserId } = useContext(TaskContext)

    const history = useHistory()

    useEffect(() => {
        getTasksByUserId(localStorage.getItem("nutty_user"))
    }, [])

    //Prevents completed task from showing up on the DOM
    const incompleteTasks = tasks.filter(task => task.completed === false)

    return (
        <>
            <div className="taskContainer">
                <h2>Tasks</h2>
                <Button icon primary animated type="button" onClick={() => {
                    //takes user to task form
                    history.push("/tasks/create")
                }}>
                    <Button.Content visible>New Task</Button.Content>
                    <Button.Content hidden>
                        <Icon name='plus circle' />
                    </Button.Content>
                </Button>
                <div className="tasks">
                    {
                        incompleteTasks.map(task => {
                            //creates card for each task
                            return <TaskCard key={task.id} task={task} />
                        })
                    }
                </div>
            </div>
        </>
    )
}