import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';


function ShowCategory(props) {

  // declare category's state as the category of prop passed into the
  // ShowCategory function.
  const [category, setCategory] = useState('');
  const url = "/api/categories/"+props.categoriesId;
  useEffect(() => {
    const requestCategory = async () => {
      const response = await fetch(url);
      const { data } = await response.json();
      const att = await data.attributes;
      const cat = await att.category;
      setCategory(cat);
    };
    requestCategory();
  }, []);

  // declare tasks' state as array of tasks.
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const requestTask = async () => {
      const response = await fetch(url+'?include=tasks');
      const obj = await response.json();
      const inc = await obj.included;
      setTasks(inc);
    };
    requestTask();
  }, []);

  // if tasks array is undefined(it is empty), will show the user 'No tasks yet',
  // otherwise, will list the tasks and respective due dates.
  if (tasks!==undefined) {

    const task_list = tasks.map(task =>
      <tr>
      <td>{task.attributes.task}</td>
      <td>{task.attributes.due}</td>

      <td><Link to={task.id+'/delete'}>Delete</Link></td>
      </tr>
    )
    return (
      <div>
      <h1>{category}</h1>
      <Link to={'/'+props.categoriesId+'/addtask'}>Add Task</Link><br/>
      <table>
      <tbody>
      <tr>
      <th>Task</th>
      <th>Due Date</th>
      </tr>
      {task_list}
      </tbody>
      </table>
      <br/><Link to='/'>Back</Link>
      </div>

    );
  } else {
    return (
      <div>
      <h1>{category}</h1>
      <Link to={'/'+props.categoriesId+'/addtask'}>Add Task</Link><br/>
      <h2>No tasks yet</h2>
      <Link to='/'>Back</Link>
      </div>

    );
  }
  // const task_list = tasks.map(task =>
  //   <tr>
  //   <td>{task.attributes.task}</td>
  //   <td>{task.attributes.due}</td>
  //
  //   <td><Link to={'tasks/'+task.id+'/delete'}>Delete</Link></td>
  //   </tr>
  // )
  // return (
  //   <div>
  //   <h1>{category}</h1>
  //   <Link to={'/'+props.categoriesId+'/addtask'}>Add Task</Link><br/>
  //   <table>
  //   <tbody>
  //   <tr>
  //   <th>Task</th>
  //   <th>Due Date</th>
  //   </tr>
  //   {task_list}
  //   </tbody>
  //   </table>
  //   <br/><Link to='/'>Back</Link>
  //   </div>
  //
  // );

}
export default ShowCategory;
