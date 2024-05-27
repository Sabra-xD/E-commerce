// import { signInWithGoogle } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectSignInSuccess, signInWithEmailAndPasswordController, signInWithGoogle } from "../../../rtk/user/userSlice";
import '../styles.scss';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Form/FormInput";
import Button from "../../Form/Button";
import PasswordInput from "../../Form/PasswordInput";

const Login = () => {

    const dispatch = useDispatch();
    const signInSucess = useSelector(selectSignInSuccess);
    const navigator = useNavigate();


    const signInError = useSelector(state=>state.user.signInError);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    useEffect(()=>{
        if(signInSucess){
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

    const handleSignInWithGoogle = async()=>{
        await dispatch(signInWithGoogle);
        navigator("/");
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
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
  
            <FormInput  label="Email" placeholder="Email" onChange={(e)=>{
                handleInputChange(e,true);
            }}/>
 
            <PasswordInput  label="Password" placeholder="Password"  onChange={(e)=>{
                handleInputChange(e,false);
            }}/>




            <Button  onClick={(e)=>{
                handleSubmit(e);
            }}>Login</Button>
            
            <hr/>
            
            <Button  onClick={handleSignInWithGoogle}>Sign In With Google</Button>


            <Link style={{ color: "black", marginTop:"10px"}} to="/reset-password">
            Forgot your password? <span style={{ color: "darkblue", textDecoration: "underline" }}>Reset</span>
            </Link>

            
            {
                ErrorMessage()
            }

        </form>
    );   
}

export default Login;
