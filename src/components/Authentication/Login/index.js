// import { signInWithGoogle } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectSignInSuccess, signInWithEmailAndPasswordController, signInWithGoogle } from "../../../rtk/user/userSlice";
import '../styles.scss';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Form/FormInput";
import Button from "../../Form/Button";

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

    const handleSignInWithGoogle = ()=>{
        console.log("Dispatched");
        dispatch(signInWithGoogle);

        // ToDO: Naviagte to home page once done.
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
            <FormInput  label="Password" placeholder="Password" onChange={(e)=>{
                handleInputChange(e,false);
            }}/>

            <Button  onClick={(e)=>{
                handleSubmit(e);
            }}>Login</Button>
            
            <hr/>
            
            <Button  onClick={handleSignInWithGoogle}>Sign In With Google</Button>


            <Link className="link-top" to="/reset-password">Forgot your password? Reset</Link>

            
            {
                ErrorMessage()
            }

        </form>
    );   
}

export default Login;
