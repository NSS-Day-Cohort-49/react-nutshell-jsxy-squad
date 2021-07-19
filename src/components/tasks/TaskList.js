import React, { useContext, useEffect } from 'react'
import { TaskContext } from './TaskProvider'
import { TaskItem } from './TaskItem'
import './Tasks.css'
import { useHistory } from 'react-router-dom'

export const TaskList = () => {
    const { tasks, getTasks } = useContext(TaskContext)
    const history = useHistory()

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <h2>Tasks</h2>
            <button onClick={() => { history.push("/tasks/create") }}>
                Add Task
            </button>
            <div className="tasks">
                {
                    tasks.map(task => {
                        if (task.isComplete === false) {
                        return <TaskItem key={task.id} task={task} />
                    }})
                }
            </div>
        </>
    )
}