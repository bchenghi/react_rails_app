import React, { useEffect, useState } from "react";
// pass a categoryid and returns the name of the category
function GetCategory(categoryId) {
  const [category, setCategory] = useState('');
  const url = "/api/categories/"+categoryId;
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

  return category;
}

export default GetCategory;
