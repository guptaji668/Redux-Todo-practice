import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../redux/todoSlice';
import './todo.css';

const ToDoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
    parentId: null
  });
  const [editMode, setEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const buildTaskHierarchy = (tasks) => {
    const taskMap = {};
    tasks.forEach(task => (taskMap[task.id] = { ...task, childTasks: [] }));
    const rootTasks = [];
    tasks.forEach(task => {
      if (task.parentId) {
        taskMap[task.parentId].childTasks.push(taskMap[task.id]);
      } else {
        rootTasks.push(taskMap[task.id]);
      }
    });
    return rootTasks;
  };

  const nestedTasks = buildTaskHierarchy(tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateTask({ id: editingTaskId, ...taskData }));
      setEditMode(false);
      setEditingTaskId(null);
    } else {
      dispatch(addTask(taskData));
    }
    setTaskData({
      name: '',
      description: '',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      parentId: null
    });
  };

  const handleEdit = (task) => {
    setTaskData(task);
    setEditMode(true);
    setEditingTaskId(task.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const renderTasks = (tasks) =>
    tasks.map(task => (
      <div className="task-item" key={task.id}>
        <h4>{task.name}</h4>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Created At: {task.createdAt}</p>
        <div className="task-item-actions">
          <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
        {task.childTasks.length > 0 && (
          <div className="task-children">{renderTasks(task.childTasks)}</div>
        )}
      </div>
    ));

  return (
    <div className="todo-list-container">
      <h2 className="todo-list-title">To-Do List</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskData.name}
          onChange={(e) => setTaskData({...taskData,name:e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          required
        />
        <label>
          Status:
          <input
            type="radio"
            name="status"
            value="active"
            checked={taskData.status === 'active'}
            onChange={() => setTaskData({ ...taskData, status: 'active' })}
          /> Active
          <input
            type="radio"
            name="status"
            value="inactive"
            checked={taskData.status === 'inactive'}
            onChange={() => setTaskData({ ...taskData, status: 'inactive' })}
          /> Inactive
        </label>
        <input
          type="date"
          value={taskData.createdAt}
          onChange={(e) => setTaskData({ ...taskData, createdAt: e.target.value })}
          required
        />
        <select
          value={taskData.parentId || ''}
          onChange={(e) => setTaskData({ ...taskData, parentId: e.target.value || null })}
        >
          <option value="">No Parent</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
        <button type="submit">{editMode ? 'Update Task' : 'Add Task'}</button>
      </form>
      <div>{renderTasks(nestedTasks)}</div>
    </div>
  );
};

export default ToDoList;
