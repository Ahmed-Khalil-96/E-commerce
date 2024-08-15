import { createTransport } from "nodemailer";
import dotenv from "dotenv"
dotenv.config({path:path.resolve("config/.env")})
import path from "path"
const transporter = createTransport({
service:"gmail",
  auth: {
    user:process.env.gmail,
    pass:process.env.password
  },
});


const sendEmail = async (to, subject, html,attachments=[])=> {

  const info = await transporter.sendMail({
    from: `${process.env.username} <${process.env.gmail}>`, 
    to: to ? to :"",
    subject: subject? subject:"",
    html: html? html:"",
    attachments
  });
if(info.accepted.length){
    return true
}
    return false

}
export default sendEmail

