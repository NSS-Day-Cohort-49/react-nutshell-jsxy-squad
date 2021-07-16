import React, { useContext, useEffect } from 'react'
import { TaskContext } from './TaskProvider'
import { TaskItem } from './TaskItem'
import './Tasks.css'

export const TaskList = () => {
    const { tasks, getTasks } = useContext(TaskContext)

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className="tasks">
            <h2>Tasks</h2>
            {
                tasks.map(task => {
                    return <TaskItem key={task.id} task={task} />
                })
            }
        </div>
    )
}