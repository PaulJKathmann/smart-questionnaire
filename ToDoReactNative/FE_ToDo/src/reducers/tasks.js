const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'tasks/fetchTasksRequest':
      return {
        ...state,
        status: 'loading',
      };
    case 'tasks/fetchTasksSuccess':
      return { ...state, tasks: action.payload, status: 'success', error: null };
    case 'tasks/fetchTasksFailure':
      return { ...state, status: 'failure', error: action.payload };
    case 'tasks/addTaskSuccess':
      return { ...state, tasks: [...state.tasks, action.payload], status: 'success', error: null };
    case 'tasks/addTaskFailure':
      return { ...state, status: 'failure', error: action.payload };
    case 'tasks/updateTaskSuccess':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        status: 'success',
        error: null,
      };
    case 'tasks/updateTaskFailure':
      return { ...state, loading: false, error: action.payload };
    case 'tasks/deleteTaskSuccess':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        status: 'success',
        error: null,
      };
    case 'tasks/deleteTaskFailure':
      return { ...state, status: 'success', error: action.payload };
    default:
      return state;
  }
};

export default tasksReducer;