import { useEffect, useState } from "react";
import { User } from "./sidecontents/persistentDrawerMainContent";

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
                    <article>
                        <h1>Title: {data.title}</h1>
                        <table>
                            <tr>
                                <th>カリキュラム：</th>
                                <td>{data.curriculum}</td>
                            </tr>
                            <tr>
                                <th>カテゴリー：</th>
                                <td>{data.category}</td>
                            </tr>
                            <tr>
                                <th>更新日時：</th>
                                <td>{data.datetime_column}</td>
                            </tr>
                        </table>
                        <p>{data.body}</p>
                    </article>
                </div>
            ))}
        </div>
    );
  };
  
  export default MainContents;