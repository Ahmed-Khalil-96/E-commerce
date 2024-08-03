import mongoose from "mongoose";

const connection = async()=>{
    return await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected to DB");
    }).catch((err)=>{
        console.log(err);
    })
}

export default connection 