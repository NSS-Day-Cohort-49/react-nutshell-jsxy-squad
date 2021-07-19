import React, { useEffect, useContext, useState } from 'react'
import { TaskContext } from './TaskProvider'
import { useHistory } from 'react-router-dom'
import './Tasks.css'

export const TaskItem = ({ task }) => {
    const {removeTask} = useContext(TaskContext)
    const history = useHistory()

    const handleRemoveTask = () => {
        removeTask(task.id)
        .then(() => {
            history.push("/tasks")
        })
    }

    return (
        <section className="task">
            <h3 className="task__name">{task.name}</h3>
            <div className="task__submittingUser">Submitted by: {task.user?.name}</div>
            <div className="task__completeBy">Est Completion Date: {task.completeBy}</div>
            <label for="checkbox">Mark as complete</label>
            <input type="checkbox" id="checkbox" unchecked />
            <button onClick={handleRemoveTask}>Remove Task</button>
        </section>
    )
}