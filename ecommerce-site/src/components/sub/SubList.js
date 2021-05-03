import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import {Spin} from 'antd';
import '../../style/style.css';

const SubList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      getSubs().then((res) => {
        setSubs(res.data);
        setLoading(false);
      });
    }, []);

  const showSubs = () =>
  subs.map((s) => (
    
    <div className="col btn btn-lg btn-block m-3  view-btn">
        <Link to={`/sub/${s.slug}`} key={s._id} className="category-text" target="_blank">
        {s.name}
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
          showSubs()
        )}
      </div>
    </div>
  );
};

export default SubList;
