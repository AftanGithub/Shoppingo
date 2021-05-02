import React, {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import {useSelector} from 'react-redux';
import {Spin} from 'antd';

const ForgotPassword = ({history})=>{
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const {user} = useSelector((state)=>({...state}))

    useEffect(()=>{
        if(user && user.token) history.push('/');
    },[user,history]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp : true,
        };
        await auth.sendPasswordResetEmail(email,config).then(()=>{
            setEmail('')
            setLoading(false);
            toast.success('Check Your Email for Password Reset Link !');
        })
        .catch((error)=>
        {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
        })

    }
    return (<div className="container col-md-6 offset-md-3 p-5">
        <div className="card">
                    <div class="card-body">
                        
                    {loading? 
                        <center>
                        <Spin tip="Loading...">
                         
                        </Spin>
                        </center> 
                        :
                        <h4 className="card-title">Forgot Password</h4>
                    }
                        
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <input type="email" 
                                className="form-control" 
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Type Your Email"
                                autoFocus
                                value={email}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-raised" disabled={!email}>Submit</button>
                            </div>
                        </form>
                         
                    </div>
                    
                </div>
    </div> );   
};

export default ForgotPassword;
