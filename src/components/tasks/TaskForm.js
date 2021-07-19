import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from './TaskProvider'
import { useHistory, useParams } from 'react-router-dom'
import './Tasks.css'

export const TaskForm = () => {
    const { addTask, getTaskById, updateTask } = useContext(TaskContext)

    const [task, setTask] = useState({
        name: "",
        completeBy: ""
    })
    const [isLoading, setIsLoading] = useState(true)
    const { taskId } = useParams()
    const history = useHistory()

    const handleInputChange = (evt) => {
        const newTask = { ...task }
        newTask[evt.target.id] = evt.target.value
        setTask(newTask)
    }

    const handleSaveTask = (evt) => {
        evt.preventDefault()

        if (task.name === "" || task.completeBy === "") {
            window.alert("Please fill out form completely")
        } else {
            setIsLoading(true)
            if(taskId) {
                updateTask({
                    id: task.id,
                    name: task.name,
                    completeBy: task.completeBy,
                    isComplete: task.isComplete,
                    userId: task.userId
                })
                .then(() => history.push(`/tasks`))
            } else {
                addTask({
                    name: task.name,
                    completeBy: task.completeBy,
                    isComplete: false,
                    userId: parseInt(sessionStorage.getItem("nutshell_user"))
                })
                    .then(() => history.push(`/tasks`))
            }
        }
    }

    useEffect(() => {
        if (taskId) {
            getTaskById(taskId)
            .then(task => {
                setTask(task)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="taskForm">
            <h2 className="taskFrom__title">{taskId ? <>Edit Task</> : <>New Task</>}</h2>
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
            <button className="btn btn-primary" onClick={handleSaveTask} disabled={isLoading}>
                {taskId ? <>Save Task</> : <>Add Task</>}
            </button>
        </form>
    )
}