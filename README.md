# WebMon

## Constantly monitors your websites and sends an email when a site goes down.

## Installation Instructions

1. Clone this repo
   `git clone git@github.com:scotteratigan/webmon.git`

1. `npm install` to install node modules:
   axios (make get requests)<br/>
   dotenv (to obscure passwords)<br/>
   nodemailer (to send emails)<br/>
   moment (to format date string)<br/>

1. `cd webmon` to enter project directory

1. Create a new gmail account to send emails from<br/>
   _This account will be less secure, so be sure to use a dedicated account for this purpose._

1. Modify Security Settings of new Google account:

   - [Google Account Security Settings]('https://myaccount.google.com/security')
   - Click "Security" on left, then scroll down to "Less secure app access" and turn ON

1. `touch .env` to create the env file that stores user/pass in this format:<br/>
   GMAIL_USERNAME=YOURUSERNAME<br/>
   GMAIL_PASSWORD=YOURPASSWORD

1. Create config file config.json:
   'touch config.json'<br/>
   Data is in this format:<br/>
   {<br/>
   "pingFrequencySeconds": 600,<br/>
   "notifyEmail": "YOUREMAIL@gmail.com",<br/>
   "urlList": [<br/>
   "https://www.yourwebsite.com",<br/>
   "https://www.secondwebsitetomonitor.com"<br/>
   ]<br/>
   }<br/>
   _note: pingFrequencySeconds is how often the sites should be checked. 10 minutes / 600 is a good default_

1. Run the app:
   `node app`
