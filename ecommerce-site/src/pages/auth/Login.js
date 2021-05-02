import React, {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import {auth,googleAuth} from '../../firebase';
import {Button,Spin} from 'antd';
import { MailOutlined,GoogleOutlined} from '@ant-design/icons';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

const createOrUpdateUser = async (authtoken)=>{
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`,{},{
        headers:{
            authtoken,
        },
    });
};


const Login = ({history})=>
{
    const [email,setEmail] = useState("aftanahmadskills@gmail.com");
    const [password,setPassword] = useState("aftan@123");
    const [loading,setLoading] = useState(false);
    const {user} = useSelector((state)=>({...state}));

 
    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
          return;
        } else {
          if (user && user.token) history.push("/");
        }
      }, [user, history]);
    
      let dispatch = useDispatch();
    
      const roleBasedRedirect = (res) => {
        // check if intended
        let intended = history.location.state;
        if (intended) {
          history.push(intended.from);
        } else {
          if (res.data.role === "admin") {
            history.push("/admin/dashboard");
          } else {
            history.push("/user/history");
          }
        }
      };
    
    const handleSubmit = async (e)=>{
       e.preventDefault();
       setLoading(true);
        try{
            const result = await auth.signInWithEmailAndPassword(email,password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token).then((res)=>{
                // redux store
            dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                  name:res.data.name,
                  email:res.data.email,
                  token:idTokenResult.token,
                  role:res.data.role,
                  _id:res.data._id,
                },
              });
              roleBasedRedirect(res);
            }).catch();
            

           
            // history.push('/');


        }catch(error)
        {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
        }
    };

    const googleLogin = ()=>{
        auth.signInWithPopup(googleAuth).then(async (result)=>{
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token).then((res)=>{
                // redux store
            dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                  name:res.data.name,
                  email:res.data.email,
                  token:idTokenResult.token,
                  role:res.data.role,
                  _id:res.data._id,
                },
              });

              roleBasedRedirect(res);
            }).catch();
            
            //   history.push('/');
        })

    };
    const loginForm = ()=>(
    <form onSubmit={handleSubmit}> 
        <div className="form-group">
            <input type="email" className="form-control p-2" placeholder="Enter Your Email"  autoFocus
                value={email}
                onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
        </div>

        <div className="form-group">
            <input type="password" className="form-control p-2" placeholder="Enter Your Password" 
                value={password}
                onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
        </div>
        <Button icon={<MailOutlined/>}
         shape="round"
          disabled = {!email|| password.length < 8}
          type="primary"
          size="large"
          block
          className="mb-3"
          
          onClick={handleSubmit}
          >
            Login with Email/Password
        </Button>        
    </form>
    );
    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div class="card-body">
                        
                    {loading? 
                            <center>
                            <Spin tip="Loading...">
                             
                            </Spin>
                            </center> 
                            
                          
                        :
                        <h4 className="card-title">Login</h4>
                    }
                        {loginForm()}

                        <Button icon={<GoogleOutlined/>}
                            shape="round"
                            type="danger"
                            size="large"
                            block
                            className="mb-3"
                            
                            onClick={googleLogin}
                            >
                             Login with Google
                        </Button> 
                    </div>
                    <div className="card-footer text-center">
                        <Link to="/forgot/password" className="text-danger ">Forgot Password ?</Link>
                    </div>
                </div>
                    
                </div>
            </div>
           
        </div>
    )
}

export default Login;