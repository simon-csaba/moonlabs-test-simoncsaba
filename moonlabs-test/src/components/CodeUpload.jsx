import {DateSelect} from "./DateSelect";
import { useState } from "react";
import {Register} from "./Register";
import Popup from 'reactjs-popup';
import axios from "axios";

export const CodeUpload = () => { 
    const now = new Date();
    const [currentSelectedDate, setCurrentSelectedDate] = useState({date: now.getFullYear() + "-0" + (now.getMonth()+1) + "-" + now.getDate()});
    const [formData, setFormData] = useState({});
    const [isRegistered, setIsRegistered] = useState(true);
    const [resultFeedback, setResultFeedback] = useState();

    const getFormattedDate = () => {
        return currentSelectedDate.date + " " + currentSelectedDate.hour + ":" + currentSelectedDate.minute;
    }

    const uploadCodeToServer = (payload) => {
        console.log(formData)
        axios.post("https:/ncp-dummy.staging.moonproject.io/api/simon-csaba/code/upload", payload).then((res) => {
            setIsRegistered(res.data.data.success);
            res.data.data.won ? setResultFeedback("Gratulálunk, nyertél!") : setResultFeedback("Sajnos most nem nyertél!");
            console.log(res);
        }).catch((err) => {
            if(err.response.data.errors[0].code === "email:not_found"){
                setIsRegistered(false);
            }
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email : e.target.email.value,
            code : e.target.code.value,
            purchase_time : getFormattedDate()
        }
        console.log(formData)

        setFormData(payload)
        uploadCodeToServer(payload);


    } 
 
    return  (
        <>
        <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
            <label className="mb-1" htmlFor="email">Email cím</label>
            <input className="border-solid border-2 border-gray-400 w-2/6 text-center" type="email" name="email" required></input>
            <label className="mb-1" htmlFor="code" >Kód</label>
            <input className="border-solid border-2 border-gray-400 w-1/6 text-center" name="code" pattern="^[A-Za-z0-9]{8}$" title="8 jegyű kód, angol abc betűit és számokat tartalmazhat"required></input>
            <label className="text-lg ">Vásárlás dátuma</label>
            <DateSelect currentSelectedDate={currentSelectedDate} setCurrentSelectedDate={setCurrentSelectedDate} now={now}></DateSelect>
            <button className="bg-gray-100 border-solid border-2 border-gray-300 rounded mt-3 w-1/6 p-1" type="submit">Kódfeltöltés</button>
        </form>
        {resultFeedback && <span className="flex flex-col items-center">{resultFeedback}</span>}
        <Popup contentStyle={{width: '50%'}} open={!isRegistered} closeOnDocumentClick={false}>
            <Register formData={formData} uploadCodeToServer={uploadCodeToServer}></Register>
        </Popup>
    </>
        
    );
};