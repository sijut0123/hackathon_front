export const FetchDelete = async () => {
    let urlParamStr = window.location.pathname;
    urlParamStr = urlParamStr.substring(1);

    try {
        const response = await fetch (`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?id=${urlParamStr}`, {
            method: "DELETE"
        })

        if (response.status === 200) {
            console.log("DELETE request success")
        } else {
            console.log("DELETE request fail")
        }
    } catch(err) {
        console.error(err)
    }
};