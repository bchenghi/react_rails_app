import React, { useEffect, useState } from 'react';
// pass a categoryid and returns tasks belonging to the category
function GetTasks(categoryId){
  const url = "/api/categories/"+categoryId+'?include=tasks';
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const requestTask = async () => {
      const response = await fetch(url);
      const obj = await response.json();
      const inc = await obj.included;
      setTasks(inc);
    };
    requestTask();
  }, []);

  return tasks;
}

export default GetTasks;
