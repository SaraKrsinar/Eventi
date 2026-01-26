import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEvent } from '../api/eventsApi';
import { getTasks, createTask, completeTask } from '../api/tasksApi';
import TaskItem from '../components/TaskItem';
import Loader from '../components/Loader';

const TasksPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addingTask, setAddingTask] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, tasksData] = await Promise.all([
          getEvent(id),
          getTasks(id)
        ]);
        setEvent(eventData);
        setTasks(tasksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setAddingTask(true);
    try {
      const newTask = await createTask(id, { title: newTaskTitle });
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
    } catch (err) {
      setError(err.message);
    } finally {
      setAddingTask(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    setCompletingTaskId(taskId);
    try {
      const updatedTask = await completeTask(taskId);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError(err.message);
    } finally {
      setCompletingTaskId(null);
    }
  };

  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-white">
        <Loader />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-pink-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Tasks</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          to={`/event/${id}`}
          className="inline-flex items-center text-gray-500 hover:text-pink-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Event
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden mb-8">
          <div className="h-2 bg-linear-to-r from-pink-400 to-pink-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{event.name}</h1>
                <p className="text-gray-500">Manage your event tasks</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold bg-linear-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                  {Math.round(progress)}%
                </p>
                <p className="text-sm text-gray-500">Complete</p>
              </div>
            </div>

            <div className="h-3 bg-pink-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{completedTasks} of {totalTasks} tasks completed</span>
              <span>{totalTasks - completedTasks} remaining</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Custom Task</h2>
            <form onSubmit={handleAddTask} className="flex gap-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                className="flex-1 px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
              />
              <button
                type="submit"
                disabled={addingTask || !newTaskTitle.trim()}
                className="px-6 py-3 bg-linear-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {addingTask ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
          <div className="p-6 border-b border-pink-100">
            <h2 className="text-lg font-semibold text-gray-800">All Tasks</h2>
          </div>
          <div className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500">No tasks yet. Add your first task above!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.filter(t => !t.isCompleted).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse"></span>
                      Pending ({tasks.filter(t => !t.isCompleted).length})
                    </h3>
                    <div className="space-y-3">
                      {tasks.filter(t => !t.isCompleted).map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onComplete={handleCompleteTask}
                          isLoading={completingTaskId === task.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {tasks.filter(t => t.isCompleted).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Completed ({tasks.filter(t => t.isCompleted).length})
                    </h3>
                    <div className="space-y-3">
                      {tasks.filter(t => t.isCompleted).map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onComplete={handleCompleteTask}
                          isLoading={completingTaskId === task.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
