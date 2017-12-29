let api_key = require('../../emailConfig')['sendgrid'].apiKey;

let sg = require('sendgrid')(api_key);

let sendEmailSendGrid = function(subject, receiver, emailInfo) {

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
        email: 'kohacktive@tripvalet.me',
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
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    })
    .catch((error) => {
      console.log(error.response.statusCode);
    });


}


module.exports = sendEmailSendGrid;