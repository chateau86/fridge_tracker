# fridge_tracker
Track expiration of stuff in your fridge.

Deployment instruction:
1. Following instruction on [this guide by Keith Weaver](https://medium.com/@Keithweaver_/setting-up-mern-stack-on-aws-ec2-6dc599be4737), except substituting this repository in place of the recommended boilerplate repository. 

2. After ```npm install```, do not forget to perform ```npm rebuild node-sass``` as the installation script have been observed to install this package improperly.

3. After cloning the repository, go to ```fridge_tracker\server\routes``` and copy ```secret.config``` to ```secret.js``` and insert the API key from [Postmail](https://postmail.invotes.com/) to enable E-mail capability and [Twilio](https://www.twilio.com) credentials for SMS capability. 
