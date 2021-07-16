import React, { useEffect, useContext, useState } from 'react'
import './Tasks.css'


export const TaskItem = ({ task }) => (
    <section className="task">
        <h3 className="task__name">{task.name}</h3>
        <div className="task__submittingUser">Submitted by: {task.user?.name}</div>
        <label for="checkbox">Mark as complete</label>
        <input type="checkbox" id="checkbox" unchecked />
        {/* <button onClick={removeTask}>Remove Task</button> */}
    </section>
)