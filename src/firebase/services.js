import firebase, { db } from "./config"
import { serverTimestamp } from "firebase/firestore";

const addDocument = (collection, data) => {

    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
 
    if(collection) {
        db.collection(collection).add({
            ...data,
            createdAt: serverTimestamp(),
            TimeAdd: dateTime,
        })
    }
    return data
}

export default addDocument