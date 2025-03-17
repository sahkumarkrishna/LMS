

// const transport = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587, // Use 587 for TLS
//   secure: false,
//   auth: {
//     user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
//     pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD,
//   },
 
// });


// export default transport; // Use ES6 export if your environment supports it



import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 587 for TLS
  secure: false,
  auth: {
    user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD,
  },
});

export default transport;
