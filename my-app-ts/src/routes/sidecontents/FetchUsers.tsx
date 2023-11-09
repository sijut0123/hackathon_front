import { User } from "./persistentDrawerMainContent";

const FetchUsers = async (setUserData: (userData: User[]) => void) => {
  let urlParamStr = window.location.pathname;
  urlParamStr = urlParamStr.substring(1);

  console.log(`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?curriculum=${urlParamStr}`);

  try{
    const getResponse = await fetch(`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?curriculum=${urlParamStr}`, {
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

export default FetchUsers;