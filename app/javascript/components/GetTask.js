import React,{ useEffect, useState } from "react";
// pass a task id and return the task name
function GetTask(taskId){
  const [task, setTask] = useState('');
  const url = "/api/tasks/"+taskId;
  useEffect(() => {
    const requestTask = async () => {
      const response = await fetch(url);
      const { data } = await response.json();
      const att = await data.attributes;
      const tas = await att.task;
      setTask(tas);
    };
    requestTask();
  }, []);

    return task;

}

export default GetTask;
