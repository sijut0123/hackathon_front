import { useEffect, useState } from "react";
import FetchUsers from "./FetchUsers";

export type User = {
    id :string
    curriculum : string;
    category : string;
    title : string;
    body : string;
    datetime_column : string;
  }

export const FetchDelete = async () => {
    const [users, setUsers] = useState<User[]>([]);
    let urlParamStr = window.location.pathname;
    urlParamStr = urlParamStr.substring(1);

    try {
        const response = await fetch (`https://hackathon-backend-zjgwehekya-uc.a.run.app/user?id=${urlParamStr}`, {
            method: "DELETE"
        })

        if (response.status === 200) {
            console.log("DELETE request success")
            useEffect(() => {
                FetchUsers((user: User[]) => { setUsers(user) });
              },[]);
        } else {
            console.log("DELETE request fail")
        }
    } catch(err) {
        console.error(err)
    }
};