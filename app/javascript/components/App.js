import React from "react";
import { Router } from "@reach/router";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import ShowCategory from "./ShowCategory";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";

// :categoriesId is the id of a category, while :taskId is the id
// of a task, passed through the functions
// as props, which will be used in the functions

function App() {
  return (
    <Router>
      <CategoryList path="/" />
      <AddCategory path="/add" />
      <ShowCategory path="/:categoriesId"/>
      <DeleteCategory path="/:categoriesId/delete"/>
      <EditCategory path="/:categoriesId/edit"/>
      <AddTask path="/:categoriesId/addtask"/>
      <DeleteTask path="/:categoriesId/:taskId/delete"/>
    </Router>
  );
}

export default App;
