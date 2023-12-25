// import nodemailer from 'nodemailer';

// const sendEmail = async (options) => {
//     // create transporter object
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port:process.env.SMTP_PORT,
//         auth:{
//             user: process.env.SMTP_EMAIL,
//             pass: process.env.SMTP_PASSWORD
//         }
//     });

//     // send mail with defined transport object
//     const message = {
//         from: process.env.SMTP_EMAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     }

//     await transporter.sendMail(message);
// };

// export default sendEmail;

import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    // create transporter object
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const message = {
        from: `Shelby Shops <${process.env.SMTP_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: `
    <html>
        <head>
            <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
            color: #333;
            text-align: center;
            }
            p {
            color: #555;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>${options.subject}</h1>
            <p>${options.message}</p>
        </div>
        </body>
    </html>
    `,
    };

    // Add additional checks and configurations
    try {
        const info = await transporter.sendMail(message);
        console.log("Message sent: %s", options.email);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Error sending email");
    }
};

export default sendEmail;
