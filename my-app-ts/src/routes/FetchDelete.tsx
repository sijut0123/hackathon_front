import { useEffect, useState } from "react";
type UserData = {
    id : string;
    curriculum : string;
    category : string;
    title : string;
    body : string;
    datetime_column : string;
  }

export const FetchDelete = async (id : string) => {
    const [userData, setUserData] = useState<UserData[]>([]);
    const fetchUsers = async () => {
        try{
          const getResponse = await fetch("https://hackathon-backend-zjgwehekya-uc.a.run.app/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (getResponse.status === 200) {
            // GETリクエストの結果を処理
            const userData = await getResponse.json();
            setUserData(userData);
            // userDataを適切に処理するコードをここに追加
          } else {
            // GETリクエストが失敗した場合の処理
            console.error("GET request failed");
          }
        } catch (err) {
          console.error(err)
        }
      };
    
    try {
        const response = await fetch (`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?id=${id}`, {
            method: "DELETE"
        })

        if (response.status === 200) {
            console.log("DELETE request success")
        } else {
            console.log("DELETE request fail")
        }
    } catch(err) {
        console.error(err)
    };

    useEffect(() => {
        fetchUsers();
      },[]);
};