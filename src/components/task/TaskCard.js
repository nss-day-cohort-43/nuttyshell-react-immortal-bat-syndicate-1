import React, { useContext } from "react"
import { TaskContext } from "./TaskProvider"
import { useHistory } from "react-router-dom"
import { Button, Icon, Input, Label } from "semantic-ui-react"

//Sets up a card for a task
export const TaskCard = ({ task }) => {
    const { removeTask, completeTask } = useContext(TaskContext)
    const history = useHistory()

    return (
        <section className="task">
            <h3 className="task__name">{task.task}</h3>
            <p>{new Date(task.date).toLocaleDateString("en-US")}</p>
            <Label htmlFor="complete">Completed? </Label>
            <Input type="checkbox" onClick={() => {
                //sets the task to complete and updates it in the database
                task.completed = true
                completeTask(task)
            }} /><br />
            <Button icon onClick={() => {
                //Takes user to form to edit task
                history.push(`/tasks/edit/${task.id}`)
            }}><Icon name="edit" /></Button>
            <Button icon negative type="button" onClick={() => {
                //deletes task from the database
                removeTask(task.id)
            }}><Icon name="trash" /></Button>
        </section>  
    )
}