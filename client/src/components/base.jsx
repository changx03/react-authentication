import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../modules/Auth';

function Base({ children }) {
  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <NavLink to="/">React App</NavLink>
        </div>
        {Auth.isUserAuthenticated() ? (
          <div className="top-bar-right">
            <Link to="/logout">Log out</Link>
          </div>
        ) : (
          <div className="top-bar-right">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
