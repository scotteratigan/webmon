const config = require("./config.json");
const { urlList, pingFrequencySeconds, notifyEmail } = config;
const pingFrequencyMS = pingFrequencySeconds * 1000;

const axios = require("axios");
// const util = require("util");
const nodemailer = require("nodemailer");
const moment = require("moment");
require("dotenv").config();

// launch it immediately:
pingLoop();
// then keep repeating it:
setInterval(pingLoop, pingFrequencyMS);

async function pingLoop() {
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i];
    try {
      console.log("Grabbing:", url);
      const response = await axiosGetURL(url);
      if (response.status !== 200) {
        emailAboutFailedPageLoad(url);
      }
      // console.log(util.inspect(response));
      console.log("-------------");
    } catch (err) {
      emailAboutFailedPageLoad(url);
    }
  }
}

function axiosGetURL(requestURL) {
  return new Promise(async (resolve, reject) => {
    let response;
    try {
      response = await axios(requestURL);
      return resolve(response);
    } catch (err) {
      console.error("Page failed to load, error is:", err.errno);
      return reject(response);
    }
  });
}

function emailAboutFailedPageLoad(url) {
  console.log("Shooting off email here...");
  const momentTime = moment();
  const email = {
    subject: `Site down: ${url}`,
    body: `Website failed to load: ${url} at ${momentTime.format("h:mm:ss a")}`,
    recipient: notifyEmail
  };
  sendMailFromGmail(email);
}

function sendMailFromGmail(email) {
  //expects email.body, email.subject
  // const buff = new Buffer(env.ENCRYPTED_PASSWORD, "base64");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
      // pass: buff.toString("ascii")
    }
  });
  const sendTo = [email.recipient];
  const mailOptions = {
    from: process.env.GMAIL_USERNAME,
    replyTo: process.env.GMAIL_USERNAME + "@gmail.com",
    to: sendTo,
    subject: email.subject,
    text: email.body
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
