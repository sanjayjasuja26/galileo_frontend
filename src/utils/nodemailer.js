import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 546,
    secure: false,
    auth: {
        user: process.env.REACT_APP_NODEMAILER_EMAIL,
        pass: process.env.REACT_APP_NODEMAILER_PASSWORD
    }
})

export const sendMail = async (email) => {
    await transporter.sendMail({
        from: process.env.REACT_APP_NODEMAILER_EMAIL,
        to: email,
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: "<b>Hello world?</b>", 
    });
}