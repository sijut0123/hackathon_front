import React from "react";
import { signOut } from "firebase/auth";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LogoutForm: React.FC = () => {
  const navigate = useNavigate();
    const signOutWithEmailAndPassword = () => {
        signOut(fireAuth).then(() => {
          alert("ログアウトしました");
          navigate("/");
        }).catch(err => {
          alert(err);
        });
      };

return (
    <div>
        <>
          <button onClick={signOutWithEmailAndPassword}>
              ログアウト
          </button>
        </>
    </div>
);
};

export default LogoutForm;