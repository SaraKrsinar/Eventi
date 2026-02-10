import './TaskItem.css'

const TaskItem = ({ task, onComplete, isLoading }) => {
  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-left">
        <button
          onClick={() => !task.isCompleted && onComplete(task.id)}
          disabled={task.isCompleted || isLoading}
          className="task-checkbox"
        >
          {task.isCompleted && '✓'}
          {isLoading && !task.isCompleted && <span className="spinner" />}
        </button>

        <span className="task-title">{task.title}</span>
      </div>

      <span className={`task-status ${task.isCompleted ? 'done' : 'pending'}`}>
        {task.isCompleted ? 'Completed' : 'Pending'}
      </span>
    </div>
  )
}

export default TaskItem
