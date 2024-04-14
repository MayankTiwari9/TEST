import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';

const VerifyPasswordChange = () => {
    const [isLoading, setIsLoading] = useState();
    const [userMail, setUserMail] = useState("");
    const navigate = useNavigate();

    const mailHandler = (event)=>{
        setUserMail(event.target.value);
    };
    const passwordChangeHandler= async () =>{
        setIsLoading(true);
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBN1Y4fgRQH6KhdNjrr4aXpDQ5BVtVvBbY",
            {
                method: "Post",
                body: JSON.stringify({
                    requestType:"PASSWORD_RESET",
                    email: userMail,
                }),
            }
         );
         if(!response.ok){
            let errorMsg = await response.json();
            throw new Error(errorMsg)
         }
         const data = await response.json();
         setIsLoading(false);
         console.log(data);
         setTimeout(()=>{
            navigate('/auth');
         },10000);
        } catch(error){
            console.log(error);
        }
    };
  return (
    <div>
      <div className='container text-center mt-5'>
        <h3>Reset Password? Enter you registered Mail Id</h3>
        {isLoading && <p>Loading...</p>}
        <label style={{marginTop: "100PX"}}>Enter Your mail</label>
        <input type='email' style={{width: "500px"}} onChange={mailHandler}></input>
        <button onClick={passwordChangeHandler} style={{width:"100px"}}>Submit</button>
        <p style={{marginTop: "50px"}}>Note: You would recieve a password reset link in your mail id which you entered above. Open the link and change the password. </p>

      </div>
    </div>
  );
};

export default VerifyPasswordChange
