import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class EmailForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      receiver: '',
      emailInfo: ''
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
    console.log('this.state', this.state);

    axios.get('/sendEmail', {
      params: {
        subject: this.state.subject,
        receiver: this.state.receiver,
        emailInfo: this.state.emailInfo
      }
    })
      .then((code) => {
        console.log('code', code);
      })
      .catch((err) => {
        console.log('error sending email', err);
      });


  }


  render() {
    return(
      <div>
        <p>email form</p>

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

        <input type='submit' value='Send email!' />

      </form>

      </div>
    );
  }

}

export default EmailForm;