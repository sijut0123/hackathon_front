import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

interface UserData {
    curriculum :string;
    category : string;
    title : string;
    body : string;
    datetime_column : string;
  }

const curriculums = [
  {value: 'oscommand', label: 'OSコマンド(とシェル)'},
  {value:'git', label:'Git'},
  {value:'github', label:'Github'}
];

function AddContents() {
    const [curriculum, setCurriculum] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [datetime_column, setDatetime_column] = useState<string>("");
    const [userData, setUserData] = useState<UserData[]>([]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
  
      try{
        const response = await fetch(
          "https://hackathon-backend-zjgwehekya-uc.a.run.app/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              curriculum,
              category,
              title,
              body,
              datetime_column,
            }),
          }
        );
        if (response.status === 200) {
          fetchUsers();
        } else {
          console.error("POST request failed")
        }

        setCurriculum("");
        setCategory("");
        setBody("");
        setTitle("");
        setDatetime_column("");
  
      } catch (err) {
        console.error(err)
      }
    };
  

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
  const movetohome = () => {
    navigate("/home");
  }

  // const handlechange = (e:any) => {
  //   setCurriculum(e.label)
  // }
return (
    <div className="App">
        <header className="App-header">
      </header>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
          <div className="block_1">
          <label>Curriculum: <input 
            type={"text"}
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <div className="block_1">
          <label>Category: <input 
            type={"text"}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <div className="block_1">
          <label>Title: <input 
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <div className="block_1">
          <label>Body: <input 
            type={"text"}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <div className="block_1">
          <label>Time: <input 
            type={"text"}
            value={datetime_column}
            onChange={(e) => setDatetime_column(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <button type={"submit"} className="block_1" onClick={movetohome} >POST</button>
        </form>
    </div>
);
};
export default AddContents;