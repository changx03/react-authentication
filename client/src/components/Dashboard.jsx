import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

function Dashboard({ secretData, username }) {
  const title = username ? `Welcome back, ${username}!` : 'Dashboard';
  return (
    <Card className="container">
      <CardTitle
        title={title}
        subtitle="You should get access to this page only after authentication."
      />
      {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
    </Card>
  );
}

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
  username: PropTypes.string
};

export default Dashboard;
