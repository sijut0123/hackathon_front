export const FetchDelete = async (id : any) => {
    console.log(id);
    try {
        const response = await fetch (`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?id=${id}`, {
            method: "DELETE"
        })

        if (response.status === 200) {
            console.log("DELETE request success")
        } else {
            console.log("DELETE request fail")
        }
    } catch(err) {
        console.error(err)
    };
};