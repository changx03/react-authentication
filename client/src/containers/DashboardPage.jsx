import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      username: ''
    };
  }

  render() {
    return <Dashboard secretData={this.state.secretData} username={this.state.username} />;
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          username: xhr.response.username
        });
      }
    });
    xhr.send();
  }
}

export default DashboardPage;
