import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Spin} from 'antd';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count,history]);

  return (

    <div className="container">
        <div className="row">
            <div className="col p-5 text-center">
                <Spin></Spin>
                <br/>
                <p>Redirecting you in {count} seconds</p>
            </div>
        </div>
    </div>
    
  );
};

export default LoadingToRedirect;
