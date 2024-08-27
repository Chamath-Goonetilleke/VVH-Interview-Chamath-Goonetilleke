import mongoose from "mongoose";

export default function(){
    const db = process.env.DB_URL
    mongoose.connect(db).then(()=>{
        console.log("DB Connection Success")
    }).catch((err)=>{
        console.log("ERROR:",err)
    })
}