import {useEffect, useState} from "react";

const MCNavigation = () => {
    const [time, setTime] = useState("")

    useEffect(() => {
        setInterval(() => {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours().toString().padStart(2, '0');
        let minute = d.getMinutes().toString().padStart(2, '0');
        setTime(year + '年' + month + '月' + day + '日' + hour + ':' + minute);
        });

    },[])


    return (
        <p>{time}</p> 
    );
}
 
export default MCNavigation;