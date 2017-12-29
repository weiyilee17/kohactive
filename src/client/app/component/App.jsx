import React from 'react';
import ReactDOM from 'react-dom';

import EmailForm from './EmailForm.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <EmailForm />
      </div>
    );
  }

}

export default App;