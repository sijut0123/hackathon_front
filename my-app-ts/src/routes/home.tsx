import './home.css';
import { useState } from "react";
import { useEffect } from "react";
import PersistentDrawerLeft from "./sidecontents/PersistentDrawerLeft";
import { Sidemenu } from "./sidecontents/sidemenu";
import PersistentDrawerMainContent from "./sidecontents/persistentDrawerMainContent";

type UserData = {
  id : string;
  curriculum : string;
  category : string;
  title : string;
  body : string;
  datetime_column : string;
}

function Home() {
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

  useEffect(() => {
    fetchUsers();
  },[]);
  return (
    <div className="App">
      <PersistentDrawerLeft
        sidemenu={<Sidemenu/>}
        mainContent={<PersistentDrawerMainContent/>}
      />
    </div>
  );
}

  export default Home;