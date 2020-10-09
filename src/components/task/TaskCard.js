import React, { useContext, useState, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"

export const TaskCard = ({ task }) => (
    <>
        <h3 className="task__name">{task.task}</h3>
        <p>{task.date}</p>
    </>
)
