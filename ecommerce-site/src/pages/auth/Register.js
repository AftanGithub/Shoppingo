import React, {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import {useSelector} from 'react-redux';



const Register = ({history})=>
{
    const [email,setEmail] = useState("");
    const {user} = useSelector((state)=>({...state}));

    useEffect(()=>{
        if(user && user.token) history.push('/');
    },[user,history]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const config = {
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp : true
        }

        await auth.sendSignInLinkToEmail(email,config);
        toast.success(`Registration Link is sent to ${email} successfully. Click the link in Your Mail to follow`);
        //saving email locally in the users computer
        window.localStorage.setItem('emailForRegistration',email);
        setEmail("");
    };
    const createForm = ()=>
    <form onSubmit={handleSubmit}> 
        <input type="email" className="form-control p-2" placeholder="Enter Your Email"  autoFocus
         value={email}
         onChange={(e)=>{
            setEmail(e.target.value);
        }}/>
        <button type="submit" className="btn btn-outline-primary mt-3">Register</button>
    </form>
        
    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div class="card-body">
                        
                       <h4>Register</h4>
                        {createForm()}
                    </div>
                </div>
                    
                </div>
            </div>
           
        </div>
    )
}

export default Register;