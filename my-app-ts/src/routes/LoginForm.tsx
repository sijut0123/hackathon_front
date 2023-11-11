import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInWithEmailandPassword = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: { user: any; }) => {
      // Signed in 
      const user = userCredential.user;
      alert("新規ユーザー: " + user.displayName);
      navigate("/home");
      setUserName(user.displayName)
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
    <div>
      <button onClick={signInWithEmailandPassword}>
        メール・パスワードでログイン
      </button>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="string"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </form>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <label>Password: </label>
        <input
          type="string"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={movetosignup}>
        新規アカウント作成
      </button>
    </div>

  );
};
export default LoginForm;
