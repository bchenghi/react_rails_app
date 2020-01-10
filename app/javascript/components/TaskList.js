import React, { useEffect, useState } from "react";
import { Link } from '@reach/router';
import GetCategory from './GetCategory';

function TaskList() {


  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const requestTasks = async () => {
      const response = await fetch("/api/categories?include=tasks");
      const { data, included } = await response.json();
      setTasks(included);
    };
    requestTasks();
  }, []);


  // By using the map function, each task name can be obtained from the array,
  // and displayed using jsx tags. In each row, links to the task's category,
  // and delete is created. At the top of the table of categories,
  // a link to the AddCategory component is added


  var task_list = [].concat(tasks).sort((a,b) =>
  new Date(a.attributes.due).getTime()-new Date(b.attributes.due).getTime()).
  map(task => (new Date(task.attributes.due).getTime() <
  new Date().getTime()) ?
    <tr>
    <td>{task.attributes.task}</td>
    <td>{task.attributes.due}</td>
    <td><Link to={'/'+task.relationships.category.data.id}>Category</Link></td>
    <td><Link to={'/'+task.relationships.category.data.id+'/'+task.id+'/delete'}>Delete</Link></td>
    <td className="expired">Expired</td>
    </tr>
    :
    <tr>
    <td>{task.attributes.task}</td>
    <td>{task.attributes.due}</td>
    <td><Link to={'/'+task.relationships.category.data.id}>Category</Link></td>
    <td><Link to={'/'+task.relationships.category.data.id+'/'+task.id+'/delete'}>Delete</Link></td>
    </tr>
  );
  return (
    <div>
    <h1>Listing Tasks</h1>
    <table>
    <tbody>
    <tr>
    <th>Task</th>
    <th>Due Date</th>
    </tr>
  {task_list}
  </tbody>
</table>
<Link to='/'>Categories</Link>
</div>)



};

export default TaskList;
