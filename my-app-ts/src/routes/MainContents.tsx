import { useEffect, useState } from "react";
import { User } from "./sidecontents/persistentDrawerMainContent";
import "./home.css"

function MainContents() {
    const [users, setUsers] = useState<User[]>([]);
    const FetchUsers = async (setUserData: (userData: User[]) => void) => {
        let urlParamStr = window.location.pathname;
        urlParamStr = urlParamStr.substring(10);
      
        try{
          const getResponse = await fetch(`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?id=${urlParamStr}`, {
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
            {users.map((data, index) => (
                <div key={index}>
                    <div className="box29">
                        <div className="box-title">{data.title}</div>
                        <div className="box8">
                            <p>カリキュラム： {data.curriculum}</p>
                        </div>
                        <div className="box8">
                            <p>カテゴリー： {data.category}</p>
                        </div>
                        <div className="box8">
                            <p>更新日時： {data.datetime_column}</p>
                        </div>
                        <div className="box74">
                            <div className="box-title">内容</div>
                            <p>{data.body}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
  };
  
  export default MainContents;