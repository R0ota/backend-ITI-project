
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
});
    


async function sendEmail(email,link) {
    const info = await transporter.sendMail({
            from:process.env.EMAIL_USER , // sender address
            to: email, // list of receivers
            subject:"Password reset link from Tabi" , // Subject line
            text: link, // plain text body
            html: `<a>${link}</a>`, // html body
          });
        
            console.log("Message sent: %s", info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
module.exports=sendEmail