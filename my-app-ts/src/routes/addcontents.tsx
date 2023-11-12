import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import store from "../store";
import "./home.css"

interface UserData {
    curriculum : string;
    category : string;
    title : string;
    body : string;
    datetime_column : string;
  }

const curriculums = [
  {value: 'oscommand', label: 'OSコマンド(とシェル)'},
  {value:'git', label:'Git'},
  {value:'github', label:'Github'},
  {value:'html&css', label:'HTML & CSS'},
  {value:'javascript', label:'JavaScript'},
  {value:'react', label:'React'},
  {value:'typescript', label:'React x Typescript'},
  {value:'sql', label:'SQL'},
  {value:'docker', label:'Docker'},
  {value:'go', label:'Go'},
  {value:'http server', label:'HTTP Server(Go)'},
  {value:'rdbms', label:'RDBMS(MySQL)への接続(Go)'},
  {value:'unittest', label:'Unit Test(Go)'},
  {value:'frontend & backend', label:'フロントエンドとバックエンドの接続'},
  {value:'ci', label:'CI(Continuous Integration)'},
  {value:'cd', label:'CD(Continuous Delivery/Deployment)'},
  {value:'authentication', label:'認証'},
  {value:'others', label:'その他'}
];

const categories = [
  {value:'document', label:'技術書'},
  {value:'blog', label:'技術ブログ'},
  {value:'movie', label:'技術系動画'}
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
          console.log("POST request success");
        } else {
          console.error("POST request failed");
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
  };

  const handlechangecurriculum = (e:any) => {
    setCurriculum(e.label);
    const time = (store.getState().year + '年' + store.getState().month + '月' + store.getState().day + '日' + store.getState().hour + ':' + store.getState().minute);
    setDatetime_column(time)
  };

  const handlechangecategory = (e:any) => {
    setCategory(e.label);
  };

return (
  <section>
    <div className="item">
    <button onClick={movetohome}>戻る</button>
    <h1 className="flex_test-item">新規追加</h1>
    </div>
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <div>
        <Select
          className="selectbutton"
          options={curriculums}
          defaultValue={{label:'Select...', value:'default'}}
          onChange={handlechangecurriculum}
        />
        </div>
        <div>
        <Select
          className="selectbutton"
          options={categories}
          defaultValue={{label:'Select...', value:'default'}}
          onChange={handlechangecategory}
        />
        </div>
        <div className="cp_iptxt">
        <input 
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ef"
        />
        <label>Title</label>
        <span className="focus_line"></span>
        </div>
        <div className="cp_iptxt">
        <label>内容を入力してください（動画を投稿する場合はURLを貼ってください）</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textbox-002"
        />
        </div>
        <button type={"submit"} className="postbutton" >POST</button>
      </form>
    </div>
  </section>
);
};
export default AddContents;