import { useState } from "react";
import store from "../store";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const curriculums = [
    {label:'OSコマンド(とシェル)', value: 'oscommand'},
    {label:'Git', value:'git'},
    {label:'Github', value:'github'},
    {label:'HTML & CSS', value:'html&css'},
    {label:'JavaScript', value:'javascript'},
    {label:'React', value:'react', },
    {label:'React x Typescript', value:'typescript'},
    {label:'SQL', value:'sql', },
    {label:'Docker', value:'docker',},
    {label:'Go', value:'go', },
    {label:'HTTP Server(Go)', value:'http server'},
    {label:'RDBMS(MySQL)への接続(Go)', value:'rdbms'},
    {label:'Unit Test(Go)', value:'unittest', },
    {label:'フロントエンドとバックエンドの接続', value:'frontend & backend'},
    {label:'CI(Continuous Integration', value:'ci'},
    {label:'CD(Continuous Delivery/Deployment)', value:'cd'},
    {label:'認証', value:'authentication', },
    {label:'その他', value:'others'}
  ];
  
  const categories = [
    { label:'技術書', value:'document'},
    { label:'技術ブログ', value:'blog',},
    { label:'技術系動画', value:'movie',}
  ];

function FetchPut() {
  const [curriculum, setCurriculum] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [datetime_column, setDatetime_column] = useState<string>("");
  let id = window.location.pathname;
  id = id.substring(6);
  console.log(id);
  const fetchput = async () => {
  try {
      const response = await fetch (`https://hackathon-backend-zjgwehekya-uc.a.run.app/user`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id,
              curriculum,
              category,
              title,
              url,
              body,
              datetime_column,
            }),
      })

      if (response.status === 200) {
          console.log("PUT request success")
      } else {
          console.log("PUT request fail")
      }
      setCurriculum("");
      setCategory("");
      setBody("");
      setUrl("");
      setTitle("");
      setDatetime_column("");
  } catch(err) {
      console.log(err)
  };
  };

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
        <button type={"submit"} onClick={movetohome}>戻る</button>
        <h1 className="flex_test-item">更新</h1>
      </div>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={fetchput}>
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
        <input 
          type={"text"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="ef"
        />
        <label>URL</label>
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
      </section>
  );
}

export default FetchPut;