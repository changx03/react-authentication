import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';
    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      },
      successMessage,
      redirectToReferrer: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // Success

        // Change the component-container state
        this.setState({
          errors: {}
        });

        Auth.authenticateUser(xhr.response.token);
        // this.context.router.replace('/');
        this.setState({
          redirectToReferrer: true
        });
      } else {
        // Failure

        // Change state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeUser(event) {
    const field = event.target.name;
    const { user } = this.state;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        successMessage={this.state.successMessage}
      />
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
