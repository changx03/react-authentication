import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

function LoginForm({
  onSubmit, onChange, errors, user, successMessage
}) {
  return (
    <Card className="container">
      <form action="/" onSubmit={onSubmit}>
        <h2 className="card-heading">Login</h2>
        {errors.summary && <p className="error-message">{errors.summary}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="field-line">
          <TextField
            floatingLabelText="Email"
            name="email"
            type="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
          />
        </div>
        <div className="field-line">
          <TextField
            floatingLabelText="Password"
            name="password"
            type="password"
            onChange={onChange}
            errorText={errors.password}
            value={user.password}
          />
        </div>
        <div className="button-line">
          <RaisedButton type="submit" label="Log in" primary />
        </div>
        <CardText>
          <p>
            Don&apos;t have an account? <Link to="/signup">Create one</Link>.
          </p>
        </CardText>
      </form>
    </Card>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
