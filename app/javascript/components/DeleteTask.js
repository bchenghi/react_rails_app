import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";
import GetTask from './GetTask';

function DeleteTask(props) {
  // The state of 'task' is declared as the category that is passed
  // through the function as a prop.
  let task = GetTask(props.taskId);
  let url = "/api/tasks/"+props.taskId;
  // handleDelete function will delete the given task. If
  // successful, will be redirected to the the ShowCategory page
  const handleDelete = values => {
    const deleteTask = async () => {
      // We get the CSRF token generated by Rails to send it
      // as a header in the request to create a new post.
      // This is needed because with this token, Rails is going to
      // recognize the request as a valid request
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },

      });
      if (response.status === 204) {
        navigate("/"+props.categoriesId);
      }
    };
    deleteTask();
  };

  const add_link_style = {
    margin: '5px 5px'
  }

  return (
    <div>
      <h2>Delete task: {task}?</h2>
      <button onClick={handleDelete}>Confirm</button><br/><br/>
      <Link to={'/'+props.categoriesId} >Category</Link>
      <Link to='/alltasks' style={add_link_style}>All Tasks</Link>
    </div>
  );
}

export default DeleteTask;
