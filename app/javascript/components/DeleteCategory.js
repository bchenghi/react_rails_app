import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";

function DeleteCategory(props) {
  // The state of 'category' is declared as the category that is passed
  // through the function as a prop.
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
  // handleDelete function will delete the given category. If
  // successful, will be redirected to the index page
  const handleDelete = values => {
    const deleteCategory = async () => {
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
        navigate("/");
      }
    };
    deleteCategory();
  };


  return (
    <div>
      <h2>Delete category: {category}?</h2>
      <button onClick={handleDelete}>Confirm</button><br/><br/>
      <Link to='/'>Back</Link>
    </div>
  );
}

export default DeleteCategory;
