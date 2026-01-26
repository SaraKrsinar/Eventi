const TaskItem = ({ task, onComplete, isLoading }) => {
  return (
    <div 
      className={`group flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-200 ${
        task.isCompleted 
          ? 'border-green-200 bg-green-50/50' 
          : 'border-pink-100 hover:border-pink-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={() => !task.isCompleted && onComplete(task.id)}
          disabled={task.isCompleted || isLoading}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.isCompleted
              ? 'bg-green-500 border-green-500'
              : 'border-pink-300 hover:border-pink-500 hover:bg-pink-50'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {task.isCompleted && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isLoading && !task.isCompleted && (
            <div className="w-3 h-3 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>

        <span className={`font-medium transition-all duration-200 ${
          task.isCompleted 
            ? 'text-gray-400 line-through' 
            : 'text-gray-700 group-hover:text-pink-600'
        }`}>
          {task.title}
        </span>
      </div>

      <div className="flex items-center">
        {task.isCompleted ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-600">
            <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse"></span>
            Pending
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
