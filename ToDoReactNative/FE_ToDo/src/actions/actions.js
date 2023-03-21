import { fetchTasks, createTask, apiUpdateTask, apiDeleteTask } from '../api/taskApi';

export const fetchTasksAction = () => async (dispatch) => {
  try {
    const response = await fetchTasks();
    dispatch({ type: 'tasks/fetchTasksSuccess', payload: response.data });
  } catch (error) {
    dispatch({ type: 'tasks/fetchTasksFailure', payload: error.message });
  }
};

export const addTask = (name) => async (dispatch) => {
  try {
    const response = await createTask({ name, completed: false });
    dispatch({ type: 'tasks/addTaskSuccess', payload: response.data });
  } catch (error) {
    dispatch({ type: 'tasks/addTaskFailure', payload: error.message });
  }
};

export const updateTask = (id, name, completed) => async (dispatch) => {
  try {
    const response = await apiUpdateTask(id, { name, completed });
    dispatch({ type: 'tasks/updateTaskSuccess', payload: response.data });
  } catch (error) {
    dispatch({ type: 'tasks/updateTaskFailure', payload: error.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await apiDeleteTask(id);
    dispatch({ type: 'tasks/deleteTaskSuccess', payload: { id } });
  } catch (error) {
    dispatch({ type: 'tasks/deleteTaskFailure', payload: error.message });
  }
};
