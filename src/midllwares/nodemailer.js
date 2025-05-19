import { transporter, htmlgeneretor, email, emailkey } from "../utils/componentes/emails/email_componentes.js";

async function sendVerifikatsiy(user, url, refreshurl) {

    const mailOptions = {
        from: email,
        to: user,
        subject: process.env.USER,
        html: htmlgeneretor(url, refreshurl)
    };

    await transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log("Else ")
        }
    })

}
export default sendVerifikatsiy