const FetchUsers = async () => {
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

      console.log(getResponse);

      if (getResponse.status === 200) {
        // GETリクエストの結果を処理
        const userData = await getResponse.json();
        userData(userData);
        // userDataを適切に処理するコードをここに追加
      } else {
        // GETリクエストが失敗した場合の処理
        console.error("GET request failed");
      }
    } catch (err) {
      console.error(err)
    }
  };

export default FetchUsers;