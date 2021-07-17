import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from './TaskProvider'
import { useHistory } from 'react-router-dom'
import './Tasks.css'

export const TaskForm = () => {
    const { addTask } = useContext(TaskContext)
    
    const [task, setTask] = useState({})
    const history = useHistory()

    const handleInputChange = (evt) => {
        const newTask = { ...task }
        newTask[evt.target.id] = evt.target.value
        setTask(newTask)
    }

    const handleSaveTask = (evt) => {
        evt.preventDefault()

        if( task.name === "" ) {
            window.alert("Please fill out form completely")
        } else {
            addTask ({
                name: task.name,
                completeBy: task.completeBy,
                isComplete: false,
                userId: parseInt(sessionStorage.getItem("nutshell_user"))
            })
            .then(() => history.push("/tasks"))
        }
    }

    return (
        <form className="taskForm">
            <h2 className="taskFrom__title">New Task</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Task name: </label>
                    <input type="text" required autoFocus className="form-control" placeholder="Task name" id="name" value={task.name} onChange={handleInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="completeBy">Est Completion Date: </label>
                    <input type="date" required autoFocus className="form-control" id="completeBy" value={task.completeBy} onChange={handleInputChange} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleSaveTask}>
                Save Task
            </button>
        </form>
    )
}