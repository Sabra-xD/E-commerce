// import { signInWithGoogle } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import { createAccount} from "../../../rtk/user/userSlice";
import '../styles.scss';
import { signInWithGoogle } from "../../../firebase/utils";
import { useState } from "react";
// import {useNavigate } from "react-router-dom";


const Register = () => {
    // const navigator = useNavigate();
    const dispatch = useDispatch();
    const signUpError = useSelector(state=>state.user.signUpError);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass,setConfirmPass] = useState('');
    const [name, setName] = useState('');

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
        console.log("Dispatched");
        dispatch(signInWithGoogle);
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Email: ",email);
        console.log("Password: ",password);
        console.log("Confirm Pass: ",confirmPass);
        console.log("Name: ",name);
        dispatch(createAccount(email,password,confirmPass,name)).then(
            (res)=>{
                console.log("Response before navigating: ",res);
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
                
                <input className="input"  placeholder="Name" onChange={(e)=>{
                    handleNameChange(e);
                }}/>

                <input className="input"  placeholder="Email" onChange={(e)=>{
                    handleInputChange(e,true);
                }}/>

                <input className="input" placeholder="Password" onChange={(e)=>{
                    handleInputChange(e,false);
                }}/>

                <input className="input" placeholder="Confirm password" onChange={handleConfirmPass}/>

                <button className="form-button" onClick={(e)=>{
                    //Sign Up Via Email logic.
                    handleSubmit(e);

                }}>Sign Up</button>

                <hr className="divider"/>


                <button className="form-button" onClick={handleSignInWithGoogle
                    //Sign up via google logic.
                }>Sign Up With Google</button>


                {
                         ErrorMessage()

                }
            </form>
         
    );   
}


export default Register;