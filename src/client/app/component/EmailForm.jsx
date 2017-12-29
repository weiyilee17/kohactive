import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class EmailForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      receiver: '',
      emailInfo: '',
      serverMessage: ''
    }
    this.textChange = this.textChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  textChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendEmail(e) {
    // preventing the screen from refreshing
    e.preventDefault();

    this.setState({
      serverMessage: 'Processing...'
    });

    // First sends mail via mailgun
    axios.get('/sendEmailMG', {
      params: {
        subject: this.state.subject,
        receiver: this.state.receiver,
        emailInfo: this.state.emailInfo
      }
    })
      .then((response) => {
        this.setState({
          serverMessage: 'Email successfully sent!'
        });
      })
      .catch((err) => {

        // If mailgun fails, send via sendgrid
        axios.get('/sendEmailSG', {
          params: {
            subject: this.state.subject,
            receiver: this.state.receiver,
            emailInfo: this.state.emailInfo
          }
        })
          .then((response) =>{
            this.setState({
              serverMessage: 'Email successfully sent!'
            });
          })
          .catch((err) => {
            this.setState({
              serverMessage: 'Oops! We have some problem with our server, please try again later!'
            });
          });

      });

  }


  render() {
    return(
      <div>
        <p>Please type in necessary information!</p>

        <form onSubmit={this.sendEmail}>
          <label>
            Subject: <input type='text' name='subject'
                      value={this.state.subject} placeholder='Enter the subject' onChange={this.textChange}></input>
          </label>
          <br />

          <label>
            Receiver: <input type='text' name='receiver'
                      value={this.state.receiver} placeholder='Enter the email address you are sending to' onChange={this.textChange}></input>
          </label>
          <br />

          <label>
            Email text: 
            <br />
            <textarea name='emailInfo'
                      value={this.state.emailInfo} placeholder='Enter the text' onChange={this.textChange} />
          </label>
          <br />

          <input type='submit' value='Send email !' />
          <br />
        </form>

        <div> {this.state.serverMessage} </div>

      </div>
    );
  }

}

export default EmailForm;