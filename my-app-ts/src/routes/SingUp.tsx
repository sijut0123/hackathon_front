import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const createuser = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        })
        .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
      }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }
    
    return (
      <div>
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
          <button type={"submit"} onClick={createuser} >新規ユーザー作成</button>
        </form>
      </div>

    );
}

export default SignUp;