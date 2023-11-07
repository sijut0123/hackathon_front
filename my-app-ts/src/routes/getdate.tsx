import React, {useEffect, useState} from "react";

const MCNavigation = () => {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        setInterval(() => {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let dayofweek = d.getDay();

        setDate(year + '年' + month + '月' + day + '日');

        let hour = d.getHours().toString().padStart(2, '0');
        let minute = d.getMinutes().toString().padStart(2, '0');
        setTime(hour + ':' + minute);
        });

    },[])


    return (
        `${date} ${time}`      
    );
}
 
export default MCNavigation;