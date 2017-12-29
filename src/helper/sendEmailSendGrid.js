let api_key = require('../../emailConfig')['sendgrid'].apiKey;

let sg = require('sendgrid')(api_key);

let sendEmailSendGrid = function(subject, receiver, emailInfo, res) {

  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: receiver
            }
          ],
          subject: subject
        }
      ],
      from: {
        email: 'postmaster@mg.tripvalet.me',
        name: 'Lee'
      },
      content: [
        {
          type: 'text/plain',
          value: emailInfo
        }
      ]
    }
  });

  sg.API(request)
    .then((response) => {
      res.status(200).send();
    })
    .catch((error) => {
      console.log(error.response.statusCode);
      res.status(500).send();
    });

}

module.exports = sendEmailSendGrid;