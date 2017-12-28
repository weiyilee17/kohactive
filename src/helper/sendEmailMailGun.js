var api_key = require('../../emailConfig')['mailgun'].privateKey;
var domain = 'mg.tripvalet.me';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var sendInviteEmail = function(subject, receiver, emailInfo) {
  
  var mailOptions = {
    from: 'Lee <postmaster@mg.tripvalet.me>',
    to: receiver,
    subject: subject,
    text: emailInfo
  };

  mailgun.messages().send(mailOptions, function(error, response) {
    if (error) {
      console.log('error happened sending mail for mailgun: ', error);
    } else {
      console.log('message sent ' + response);
    }
  });
};

module.exports = sendInviteEmail;