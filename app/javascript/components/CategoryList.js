import React, { useEffect, useState } from "react";
import { Link } from '@reach/router';


function CategoryList() {

  // The state variable categories is declared as an array of data objects.
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const requestCategories = async () => {
      const response = await fetch("/api/categories");
      const { data } = await response.json();
      setCategories(data);
    };
    requestCategories();
  }, []);

  // below is add space between the add category link and category list
  const add_link_style = {
    margin: '5px 5px'
  }

  // By using the map function, each category name can be obtained from the array,
  // and displayed using jsx tags. In each row, links to read, update,
  // and delete is created. At the top of the table of categories,
  // a link to the AddCategory component is added

if (categories!==undefined){
  const category_list = categories.map(category =>
    <tr>
    <td key={category.id}>{category.attributes.category}</td>
    <td><Link to={category.id}>Show</Link></td>
    <td><Link to={category.id+'/edit'}>Edit</Link></td>
    <td><Link to={category.id+'/delete'}>Delete</Link></td>
    </tr>
  );
  return (
    <div>
    <h2 className='title' >Welcome to your Task Manager</h2>
    <h1>Listing Categories</h1>
    <Link to="/add" >Add Category</Link>
    <Link to='/alltasks' style={add_link_style}>All tasks</Link>
    <table>
    <tbody>
    <tr>
    <th>Category</th>
    <th></th>
    </tr>
  {category_list}
  </tbody>
</table>
</div>
);
} else {
  return (
    <div>
    <h2 className='title' >Welcome to my Task Manager</h2>
    <h1>Listing Categories</h1>
    <Link to="/add" style={add_link_style}>Add Category</Link>
    <table>
    <tbody>
    <tr>
    <th>Category</th>
    <th></th>
    </tr>
    <tr>
  <td>No categories yet</td>
  </tr>
  </tbody>
</table>
</div>);
}
};

export default CategoryList;
