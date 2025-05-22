import e from "express";
import { transporter, htmlgeneretor, email, emailkey } from "../../utils/componentes/emails/email_componentes.js";

async function sendVerifikatsiy(user, url, refreshurl) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: emailkey
        }
    })
    
    const mailOptions = {
        from: email,
        to: user,
        subject: process.env.USER,
        html: htmlgeneretor(url, refreshurl)
    };

    await transporter.sendMail(mailOptions)

}
export default sendVerifikatsiy