import React, { useState } from "react";
import { resetPassword } from "../../../rtk/user/userSlice";
import "../styles.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetEmailSent, setresetEmailSent] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setEmailError(""); 
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Please enter your email."); 
    } else {
     await resetPassword(email).then(()=>{
        setresetEmailSent(true);
      }).catch((err)=>{
        setEmailError(err.code);
      });
      //Preferably show a timer and route to homePage.
    }
  };


  const checkYourEmail = () =>{
    return(
        <p className="">Reset email has been sent sucessfully. Please check your inbox</p>

    );
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>


    {
    resetEmailSent ? (
        <>
        {checkYourEmail()}

        </>
    ) : (
        <>
        <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={handleInputChange}
        />
            {emailError && <p className="error-message">{emailError}</p>}
            <button className="form-button">Reset</button>
            <hr />
        </>
    )
}

    </form>
  );
};

export default ResetPassword;
