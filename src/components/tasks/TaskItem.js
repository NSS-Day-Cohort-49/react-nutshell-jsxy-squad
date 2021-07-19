import React, { useEffect, useContext, useState } from 'react'
import { TaskContext } from './TaskProvider'
import { useHistory } from 'react-router-dom'
import './Tasks.css'

export const TaskItem = ({ task }) => {
    const { removeTask, updateTask } = useContext(TaskContext)
    const history = useHistory()

    const handleRemoveTask = () => {
        removeTask(task.id)
            .then(() => {
                history.push("/tasks")
            })
    }

    const handleTaskCheck = () => {
        updateTask({
            id: task.id,
            name: task.name,
            completeBy: task.completeBy,
            isComplete: true,
            userId: task.userId
        })
            .then(() => history.push("/tasks"))
    }

    const handleEditTask = () => {
        history.push(`/tasks/edit/${task.id}`)
    }

    return (
        <section className="task">
            <div className="task__description">
                <h3 className="task__name">{task.name}</h3>
                <div className="task__submittingUser">Submitted by: {task.user?.name}</div>
                <div className="task__completeBy">Est Completion Date: {task.completeBy}</div>
            </div>
            <div className="task__buttons">
                <div className="task__checkboxes">
                    <label for="checkbox">Mark as complete </label>
                    <input type="checkbox" id="checkbox" unchecked onChange={handleTaskCheck}></input>
                </div>
                <button onClick={handleRemoveTask}>Remove Task</button>
                <button onClick={handleEditTask}>Edit Task</button>
            </div>
        </section>
    )
}