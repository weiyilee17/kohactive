let express = require('express');
let axios = require('axios');

let app = express();
let port = process.env.PORT || 3000;

let sendEmailMailgun = require('../helper/sendEmailMailGun.js');
let sendEmailSendGrid = require('../helper/sendEmailSendGrid.js');

app.use(express.static(__dirname + '/../client/'));

app.get('/sendemail', (req, res) =>{
  console.log('req.query', req.query);

  sendEmailSendGrid(req.query.subject, req.query.receiver, req.query.emailInfo);


  // sendEmailMailgun(req.query.subject, req.query.receiver, req.query.emailInfo);
})





app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});