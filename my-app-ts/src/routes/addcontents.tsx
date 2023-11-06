import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
    category : string;
    title : string;
    body : string;
    url : string;
  }

function AddContents() {
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [userData, setUserData] = useState<UserData[]>([]);

const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const navigate = useNavigate();

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
        navigate("/home")
      } else {
        console.error("POST request failed")
      }

      setCategory("");
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

return (
    <div className="App">
      <header className="App-header">
      </header>
        <form style={{ display: "flex", flexDirection: "column" }} >
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
          <label>URL: <input 
            type={"text"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <button type={"submit"} className="block_1" onClick={handleSubmit}>POST</button>
        </form>
    </div>
);
};
export default AddContents;