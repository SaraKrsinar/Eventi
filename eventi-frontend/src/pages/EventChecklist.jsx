import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getEvent } from '../api/eventsApi'
import { getTasks, createTask, completeTask } from '../api/tasksApi'
import TaskItem from '../components/TaskItem'
import Loader from '../components/Loader'
import './EventChecklist.css'

const EventChecklist = () => {
    const { id } = useParams()

    const [event, setEvent] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [addingTask, setAddingTask] = useState(false)
    const [completingTaskId, setCompletingTaskId] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const [eventData, tasksData] = await Promise.all([
                getEvent(id),
                getTasks(id),
            ])
            setEvent(eventData)
            setTasks(tasksData)
            setLoading(false)
        }

        fetchData()
    }, [id])

    const handleAddTask = async (e) => {
        e.preventDefault()
        if (!newTaskTitle.trim()) return

        setAddingTask(true)
        const newTask = await createTask(id, { title: newTaskTitle })
        setTasks((prev) => [...prev, newTask])
        setNewTaskTitle('')
        setAddingTask(false)
    }

    const handleCompleteTask = async (taskId) => {
        setCompletingTaskId(taskId)
        const updatedTask = await completeTask(taskId)
        setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? updatedTask : t))
        )
        setCompletingTaskId(null)
    }

    if (loading) {
        return (
            <div className="event-checklist flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    const pendingTasks = tasks.filter((t) => !t.isCompleted)
    const completedTasks = tasks.filter((t) => t.isCompleted)

    return (
        <div className="event-checklist">
            <div className="event-container">

                <Link to={`/event/${id}`} className="back-link">
                    ← Back to event
                </Link>

                <header className="event-header">
                    <h1 className="event-title">{event.name}</h1>
                    <p className="event-subtitle">
                        Here’s what you need to prepare for this event
                    </p>
                </header>

                <section className="section">
                    <h2 className="section-title">
                        Things to do
                        <span className="section-count">
                            ({pendingTasks.length})
                        </span>
                    </h2>

                    {pendingTasks.length === 0 ? (
                        <p className="empty-text">You’re all caught up 🎉</p>
                    ) : (
                        <div className="task-list">
                            {pendingTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onComplete={handleCompleteTask}
                                    isLoading={completingTaskId === task.id}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <form onSubmit={handleAddTask} className="add-task-form">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Add a new task…"
                        className="add-task-input"
                    />
                    <button
                        disabled={addingTask || !newTaskTitle.trim()}
                        className="add-task-button"
                    >
                        Add
                    </button>
                </form>

                {completedTasks.length > 0 && (
                    <section>
                        <h2 className="section-title">
                            Completed ({completedTasks.length})
                        </h2>

                        <div className="completed-list">
                            {completedTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onComplete={handleCompleteTask}
                                    isLoading={false}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default EventChecklist
