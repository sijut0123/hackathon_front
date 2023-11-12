import React, { useState } from 'react';
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css"

const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInWithEmailandPassword = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: { user: any; }) => {
      // Signed in 
      alert("ログインユーザー: " + userName);
      navigate("/home");
      }).catch((err: any) => {
        alert(err);
  });
  }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
  }
  
  const movetosignup = () => {
    navigate("/signup");
  };
  
  
  return (
    <div className="formContainer">
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <h1>ログイン</h1>
        <hr className='hr2'/>
        <div className='uiForm'>
          <div className='formField'>
          <label>Name: </label>
            <input
              type="string"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div className='formField'>
            <label>Email: </label>
            <input
              type="string"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className='formField'>
            <label>Password: </label>
            <input
              type="string"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="loginButton">
            <button onClick={signInWithEmailandPassword} className="submitButton">
              メール・パスワードでログイン
            </button>
            <button onClick={movetosignup} className="clearButton" >
              新規ユーザー作成
            </button>
          </div>
      </div>
      </form>
    </div>

  );
};
export default LoginForm;
