
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManagerComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://your-api-endpoint.com/tasks');
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching tasks');
      console.error(err);
    }
    setIsLoading(false);
  };

  // Function to add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post('https://your-api-endpoint.com/tasks', { task });
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (err) {
      setError('An error occurred while adding a new task');
      console.error(err);
    }
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  // Effect hook to fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Rendering the component UI
  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManagerComponent;
