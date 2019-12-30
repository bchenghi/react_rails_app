import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";
import { Formik, Field, Form } from "formik";


function EditCategory(props) {
  // Line 8 to 19 is to declare the state of 'category' as the name of
  // the category that is passed through the EditCategory function
  // as a prop
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
  // Line 23 to 48 is to edit the category attribute in the data. Used for
  // renaming the category. If successful, it will redirect to the index
  // page.
  const handleEdit = attributes => {
    const editCategory = async () => {
      // We get the CSRF token generated by Rails to send it
      // as a header in the request to create a new post.
      // This is needed because with this token, Rails is going to
      // recognize the request as a valid request
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const newbody = {"data":{"id":props.categoriesId,"type":"categories",
      attributes
      }};
      const response = await fetch("/api/categories/" + props.categoriesId, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify(newbody)
      });
      if (response.status === 200) {
        navigate("/");
      }
    };
    editCategory();
  };


  return (
    <div>
      <h2>Edit category: {category}</h2>
      <Formik
      initialValues={{
          category: ""
      }}
        onSubmit={handleEdit}>
        {() => (
          <Form>
            <Field type="text" name="category" />
            <button type="submit">Update</button>
          </Form>
        )}
      </Formik>
      <br/>
      <Link to='/'>Back</Link>
    </div>
  );
}

export default EditCategory;
