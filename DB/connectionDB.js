import mongoose from "mongoose";

const connection = async()=>{
    return await mongoose.connect(process.env.DB_URL_online).then(()=>{
        console.log(`Connected to DB on ${process.env.DB_URL_online}`);
    }).catch((err)=>{
        console.log(err);
    })
}

export default connection 