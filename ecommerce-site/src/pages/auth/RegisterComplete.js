import React, {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios';

const createOrUpdateUser = async (authtoken)=>{
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`,{},{
        headers:{
            authtoken,
        },
    });
};

const RegisterComplete = ({history})=>
{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState('');
    const {user} = useSelector((state)=>({...state}))
    let dispatch = useDispatch();
    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'));
    },[user]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!email || !password)
        {
            toast.error("Email and Password is required");
            return;
        }

        if(password.length < 8)
        {
            toast.error("Password must be at least 8 characters long !");
            return;
        }

        try{

            const result = await auth.signInWithEmailLink(email,window.location.href);
            if(result.user.emailVerified)
            {
                //removing from local storage
                window.localStorage.removeItem('emailForRegistration');
                //get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = user.getIdTokenResult();

                //redux store
                console.log("user", user, "idTokenResult", idTokenResult);
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
                }).catch((err)=>console.log(err));
                //redirect
                history.push('/');
            }
        }catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
        
    };
    const createForm = ()=>
    <form onSubmit={handleSubmit}> 
        <input type="email" className="form-control p-2" disabled 
         value={email}
       />
        <br/>
        <input type="password" className="form-control p-2" autoFocus placeholder="Choose Your Password"
         value={password}

         onChange = {e=>{setPassword(e.target.value)}}
       />
        <button type="submit" className="btn btn-outline-primary mt-3">Complete Registration</button>
    </form>
        
    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div class="card-body">
                        
                        <h4 className="card-title">Register</h4>
                        {createForm()}
                    </div>
                </div>
                    
                </div>
            </div>
           
        </div>
    )
}

export default RegisterComplete;