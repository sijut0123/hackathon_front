import './home.css';
import { useState } from "react";
import { useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';
import LogoutForm from "./LogoutForm";
import PersistentDrawerLeft from "./sidecontents/PersistentDrawerLeft";
import { Sidemenu } from "./sidecontents/sidemenu";
import PersistentDrawerMainContent from "./sidecontents/persistentDrawerMainContent";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()
  const movetoaddcontents = () => {
    navigate("/addcontents");
  }

  return (
    <div className="App">
      <PersistentDrawerLeft
        sidemenu={<Sidemenu/>}
        mainContent={<PersistentDrawerMainContent/>}
      />
      <header className="App-header">
        <div>
          <>
          <button onClick={movetoaddcontents}>
              新規追加
          </button>
          </>
        </div>
        <LogoutForm />
      </header>
    </div>
  );
}

  export default Home;