import { useEffect, useState } from "react";
import { User } from "./sidecontents/persistentDrawerMainContent";

function Contents() {
    const [users, setUsers] = useState<User[]>([]);
    const FetchUsers = async (setUserData: (userData: User[]) => void) => {
        let urlParamStr = window.location.pathname;
        urlParamStr = urlParamStr.substring(10);
      
        try{
          const getResponse = await fetch(`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?curriculum=${urlParamStr}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (getResponse.status === 200) {
            // GETリクエストの結果を処理
            const users = await getResponse.json() as User[];
            setUserData(users);
            // userDataを適切に処理するコードをここに追加
          } else {
            // GETリクエストが失敗した場合の処理
            console.error("GET request failed");
          };
        } catch (err) {
          console.error("@FetchUSer", err)
        };
      };
    useEffect(() => {
        FetchUsers((user: User[]) => { setUsers(user) });
      },[]);
    return (
        <div>
            <h2>test</h2>
            {users.map((data, index) => (
                <div key={index}>
                    <h2>{data.title}</h2>
                    <h2>test</h2>
                </div>
            ))}
        </div>
    );
  };
  
  export default Contents;