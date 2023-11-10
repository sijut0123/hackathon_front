import { useState } from "react";
import store from "../store";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const curriculums = [
    {label: 'OSコマンド(とシェル)', value: 'oscommand'},
    {label:'Git', value:'git'},
    {label:'Github', value:'github'},
    {label:'HTML & CSS', value:'html&css'},
    {label:'JavaScript', value:'javascript'},
    {label:'React', value:'react', },
    {label:'React x Tyepscript', value:'typescript'},
    {label:'SQL', value:'sql', },
    {label:'Docker', value:'docker',},
    {label:'Go', value:'go', },
    {label:'HTTP Server(Go)', value:'http server'},
    {label:'RDBMS(MySQL)への接続(Go)', value:'rdbms'},
    {label:'Unit Test(Go)', value:'unittest', },
    {label:'フロントエンドとバックエンドの接続', value:'frontend & backend'},
    {label:'CI(Continuous Integration', value:'ci'},
    {label:'CD(Continuous Delivery/Deployment)', value:'cd'},
    {label:'認証', value:'authentication', }
  ];
  
  const categories = [
    { label:'技術書', value:'document'},
    { label:'技術ブログ', value:'blog',},
    { label:'技術系動画', value:'movie',}
  ];

export const FetchPut = async () => {
    const [curriculum, setCurriculum] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [datetime_column, setDatetime_column] = useState<string>("");
    let id = window.location.pathname;
    id = id.substring(1);
    try {
        const response = await fetch (`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                curriculum,
                category,
                title,
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
        setTitle("");
        setDatetime_column("");
    } catch(err) {
        console.log(err)
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
        <div className="App">
            <header className="App-header">
          </header>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={FetchPut}>
              <div className="block_1">
              <Select
                options={curriculums}
                defaultValue={{label:'Select...', value:'default'}}
                onChange={handlechangecurriculum}
              />
              </div>
              <div className="block_1">
              <Select
                options={categories}
                defaultValue={{label:'Select...', value:'default'}}
                onChange={handlechangecategory}
              />
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
              <button type={"submit"} className="block_1">POST</button>
            </form>
              <button type={"submit"} className="block_1" onClick={movetohome}>戻る</button>
        </div>
    );
};