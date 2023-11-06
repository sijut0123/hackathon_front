import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

interface UserData {
    category : string;
    title : string;
    body : string;
    url : string;
  }

const options = [
  { value: "document", label: "技術書" },
  { value: "blog", label: "技術ブログ" },
  { value: "movie", label: "技術系動画" },
];

function AddContents() {
    const [category, setCategory] = useState(options[0]);
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [url, setUrl] = useState<string>("");
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
              category,
              title,
              body,
              url,
            }),
          }
        );
        if (response.status === 200) {
          fetchUsers();
        } else {
          console.error("POST request failed")
        }
  
        setCategory(options[0]);
        setBody("");
        setTitle("");
        setUrl("");
  
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

return (
    <div className="App">
        <header className="App-header">
      </header>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
          <div className="block_1">
            <label>Category: <Select
              options={options}
              defaultValue={category}
              onChange={(e: any) => setCategory(e.target.value)}
            />
            </label>
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
          <label>URL: <input 
            type={"text"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <button type={"submit"} className="block_1" onClick={movetohome} >POST</button>
        </form>
    </div>
);
};
export default AddContents;