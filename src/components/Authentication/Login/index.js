// import { signInWithGoogle } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import {selectSignInSuccess, signInWithEmailAndPasswordController, signInWithGoogle } from "../../../rtk/user/userSlice";
import '../styles.scss';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

    const dispatch = useDispatch();
    const signInSucess = useSelector(selectSignInSuccess);
    const navigator = useNavigate();

    const signInError = useSelector(state=>state.user.signInError);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    useEffect(()=>{
        if(signInSucess){
            console.log("Navigating to HomePage");
            navigator('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[signInSucess])


    const handleInputChange = (event,isEmail) =>{
        if(isEmail){
            setEmail(event.target.value);
        }else{
            setPassword(event.target.value);
        }
    }

    const handleSignInWithGoogle = ()=>{
        console.log("Dispatched");
        dispatch(signInWithGoogle);

        // ToDO: Naviagte to home page once done.
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("The final email value is: ", email);
        console.log("The final password value is: ",password);
         dispatch(signInWithEmailAndPasswordController({email,password}));
    }

    const ErrorMessage = () =>{
        return(
          
          signInError==='' ? null: (
    
            <h5>Error: {signInError}</h5>

          )
          
        )
      }

    return(

            <form className="form-container" onSubmit={(e)=>{
                handleSubmit(e)
            }}>
      
                <input className="input"  placeholder="Email" onChange={(e)=>{
                    handleInputChange(e,true);
                }}/>
                <input className="input" placeholder="Password" onChange={(e)=>{
                    handleInputChange(e,false);
                }}/>

                <button className="form-button" onClick={(e)=>{
                    handleSubmit(e);
                }}>Login</button>
                
                <hr/>
                
                <button className="form-button" onClick={handleSignInWithGoogle}>Sign In With Google</button>


                <Link className="link-top" to="/reset-password">Forgot your password? Reset</Link>

                
                {
                    ErrorMessage()
                }

            </form>
         
    );   
}


export default Login;