import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import GetCategory from './GetCategory';
import GetTasks from './GetTasks';

// The ShowCategory component displays the tasks associated to the category
// which will sorted according to their due dates. The earliest due date
// at the top to the latest at the bottom. If the task is expired, 'expired'
// will be displayed. Links to delete the tasks are also added.

function ShowCategory(props) {

  const add_link_style = {
    margin: '5px 5px'
  }

  let category = GetCategory(props.categoriesId);
  let tasks = GetTasks(props.categoriesId);

  // if tasks array is undefined(it is empty), will show the user 'No tasks yet',
  // otherwise, will list the tasks and respective due dates, sorted with
  // earliest date at the top. If the due date of the task is over the current
  // date, it will display 'expired' for the task
  if (tasks!==undefined) {
    var task_list = [].concat(tasks).sort((a,b) =>
    new Date(a.attributes.due).getTime()-new Date(b.attributes.due).getTime()).
    map(task => (new Date(task.attributes.due).getTime() <
  new Date().getTime()) ?
      <tr>
      <td>{task.attributes.task}</td>
      <td>{task.attributes.due}</td>
      <td><Link to={task.id+'/delete'}>Delete</Link></td>
      <td className="expired">Expired</td>
      </tr>
      :
      <tr>
      <td>{task.attributes.task}</td>
      <td>{task.attributes.due}</td>
      <td><Link to={task.id+'/delete'}>Delete</Link></td>
      </tr>
    );
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
      <br/><Link to='/'>Categories</Link>
      <Link to='/alltasks' style={add_link_style}>All Tasks</Link>
      </div>

    );
  } else {
    return (
      <div>
      <h1>{category}</h1>
      <Link to={'/'+props.categoriesId+'/addtask'}>Add Task</Link><br/>
      <h2>No tasks yet</h2>
      <Link to='/'>Categories</Link>
      <Link to='/alltasks' style={add_link_style}>All Tasks</Link>
      </div>

    );
  }


}
export default ShowCategory;
