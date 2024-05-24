// import { signInWithGoogle } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, selectSignUpSuccess} from "../../../rtk/user/userSlice";
import '../styles.scss';
import { signInWithGoogle } from "../../../rtk/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Form/FormInput";
import Button from "../../Form/Button";

const Register = () => {
    const dispatch = useDispatch();
    const signUpError = useSelector(state=>state.user.signUpError);
    const signUpSucess = useSelector(selectSignUpSuccess);
    const navigator = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] = useState('');
    const [name, setName] = useState('');

    useEffect(()=>{
        if(signUpSucess){
            navigator('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[signUpSucess]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleConfirmPass = (event)=>{
        setConfirmPass(event.target.value);
    }

    const handleInputChange = (event,isEmail) =>{
        if(isEmail){
            setEmail(event.target.value);
        }else{
            setPassword(event.target.value);
        }
    }

    const handleSignInWithGoogle = ()=>{
        dispatch(signInWithGoogle);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(createAccount(email,password,confirmPass,name)).then(
            (res)=>{
                navigator('/');
                //ToDO: Navigate to HomePage
            }
        );
    }

    const ErrorMessage = () =>{
        return(
          
          signUpError==='' ? null: (
            <h5>Error: {signUpError}</h5>
          )
        )
    }
   
    return(
        <form className="form-container" onSubmit={(e)=>{
            handleSubmit(e)
        }}>
            <FormInput placeholder="Name" onChange={(e)=>{
                handleNameChange(e);
            }}/>

            <FormInput placeholder="Email" onChange={(e)=>{
                handleInputChange(e,true);
            }}/>

            <FormInput placeholder="Password" onChange={(e)=>{
                handleInputChange(e,false);
            }}/>

            <FormInput placeholder="Confirm password" onChange={handleConfirmPass}/>

            <Button onClick={(e)=>{
                handleSubmit(e);
            }}>Sign Up</Button>

            <hr/>

            <Button onClick={handleSignInWithGoogle}>Sign Up With Google</Button>

            {
                ErrorMessage()
            }
        </form>
    );   
}

export default Register;
