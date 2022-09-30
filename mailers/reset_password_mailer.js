const nodeMailer = require("../config/nodemailer");

module.exports.resetPassword = function(accessToken){

    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken} , "/reset_password/reset_password_mailer.ejs");

    nodeMailer.transporter.sendMail({
        from: 'ramanrana88940@outlook.com', // sender address
        to: accessToken.user.email, // list of receivers
        subject: "NodeJsAuth : Reset Password", // Subject line
        html: htmlString // html body
      } , function(error , info){
          if(error){console.log("Error in sending mail",error);return;}
          console.log("Message Sent" , info);
          return;
      });
}