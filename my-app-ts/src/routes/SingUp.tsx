import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"

const SignUp: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const createuser = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert(`新規ユーザー: ${userName} \n ログイン画面に戻ってログインしてください`);
        })
        .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
      }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }

    const movetologin = () => {
        navigate("/");
    };
    
    return (
      <div className="formContainer">
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
            <h1>新規作成</h1>
            <hr />
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
                <button type={"submit"} onClick={createuser} className="submitButton" >新規ユーザー作成</button>
                <button type={"submit"} onClick={movetologin} className="clearButton" >ログイン画面に戻る</button>
            </div>
          </ div>
        </form>
      </div>
    );
}

export default SignUp;