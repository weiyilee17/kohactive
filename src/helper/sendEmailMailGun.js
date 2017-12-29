let api_key = require('../../emailConfig')['mailgun'].privateKey;
let domain = 'mg.tripvalet.me';
let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

let sendInviteEmail = function(subject, receiver, emailInfo) {
  
  let mailOptions = {
    from: 'Lee <postmaster@mg.tripvalet.me>',
    to: receiver,
    subject: subject,
    text: emailInfo
  };

  mailgun.messages().send(mailOptions, function(error, response) {
    if (error) {
      console.log('Error happened sending mail for mailgun: ', error);
    } else {
      console.log('Message sent from mailgun! ' + response);
    }
  });
};

module.exports = sendInviteEmail;