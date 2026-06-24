import './App.css';
import { useState } from 'react';

function App() {
  //Array of sidebar items
  const sidebarItems=['Home','Goals','Tasks','diary','settings'];
  //State to track the active sidebar item
  const [activeIndex, setActiveIndex] = useState(0);
  //array of object of tasks
  const tasks=[
  {id:1, title:'Finsih React tutorial'},
  {id:2, title:'Go for a run'},
  {id:3, title:'Write diary entry'}
  ]
  //State to track the selected task
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  //Find the selected task based on the selectedTaskId
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  return (
<div className="dashboard-container" >

<div className ="sidebar">
  {sidebarItems.map((item,index) => (
    <div key={index} 
    className={index === activeIndex ? 'sidebar-icon active' :'sidebar-icon'} 
    onClick={()=> setActiveIndex(index)}>
      {item[0].toUpperCase()}
      </div>
  ))}
</div>

<div className="list-panel">{tasks.map((task) => (
  <div 
   key={task.id} 
   className="task-card"
   onClick={() => setSelectedTaskId(task.id)}>
    {task.title}
  </div>
))}</div>

<div className="main-content">
  {selectedTask ?
  (<h2>{selectedTask.title}</h2>):(<p>Select a task to view details</p>)
  }</div>

</div>
  );
}


export default App;
