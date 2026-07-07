import "./App.css";
import { useState } from "react";

function App() {
  //Array of sidebar items
  const sidebarItems = ["Home", "Goals", "Tasks", "diary", "settings"];

  //State to track the active sidebar item
  const [activeIndex, setActiveIndex] = useState(0);

  //array of object of tasks (useState,able to change state of vairable)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finsih React tutorial", completed: true },
    { id: 2, title: "Go for a run", completed: false },
    { id: 3, title: "Write diary entry", complteted: false },
  ]);

  //State to track the selected task
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  //Find the selected task based on the selectedTaskId
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  //toggleComplete function to toggle the completed status of a task
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  //Add New Task 
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = () => {
    if (newTaskTitle.trim() === "")return;
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    };

    //Delete Task
    const deleteTask =(taskId) =>{setTasks(tasks.filter((task) => task.id !== taskId));};
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={
              index === activeIndex ? "sidebar-icon active" : "sidebar-icon"
            }
            onClick={() => setActiveIndex(index)}
          >
            {item[0].toUpperCase()}
          </div>
        ))}
      </div>

      <div className="list-panel">
        
        <div className="add-task-bar">
          <input type= "text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
          <button onClick={addTask}>Add Task</button>
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
            onClick={() => setSelectedTaskId(task.id)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            {/* e.stopPropagation() is used to prevent the click event from bubbling up to the parent div, which would trigger the onClick event that sets the selected task. This allows the delete button to work without selecting the task. */}
            <button onClick={(e) => {e.stopPropagation(); deleteTask(task.id);}}>X</button>
          </div>
        ))}
      </div>

      <div className="main-content">
        {selectedTask ? (
          <h2>{selectedTask.title}</h2>
        ) : (
          <p>Select a task to view details</p>
        )}
      </div>
    </div>
  );
}

export default App;
