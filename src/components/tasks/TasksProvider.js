import React, { useState, createContext } from 'react'

export const TasksContext = createContext()

export const TasksProvider = (props) => {
    const [tasks, setTasks] = useState([])

    const getTasks = () => {
        return fetch(`http://localhost:8088/tasks`)
            .then(res => res.json())
            .then(setTasks)
    }

    const addTask = (taskObj) => {
        return fetch(`http://localhost:8088/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObj)
        })
            .then(getTasks)
    }

    const getTaskById = (id) => {
        return fetch(`http://localhost:8088/tasks/${id}`)
        .then(res => res.json())
    }

    const removeTask = (taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "DELETE"
        })
            .then(getTasks)
    }

    const updateTask = (task) => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(getTasks)
    }

    return (
        <TasksContext.Provider value={{
            tasks, getTasks, addTask, removeTask, updateTask
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}