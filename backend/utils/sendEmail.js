const nodemailer = require('nodemailer')

const sendMail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        // secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })
    
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: subject,
        text: message,
    })
}

module.exports = sendMail
