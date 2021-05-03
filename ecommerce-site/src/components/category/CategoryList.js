import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import {Spin} from 'antd';
import '../../style/style.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      
      <div className="col btn btn-lg btn-block m-3  view-btn">
        <Link to={`/category/${c.slug}`} key={c._id} className="category-text" target="_blank">
        {c.name}
        </Link>
       
      </div>
     
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4> 
          <Spin tip="Loading...">
                         
          </Spin></h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
