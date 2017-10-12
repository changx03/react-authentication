import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

function NotFoundPage() {
  return (
    <Card className="container">
      <CardTitle title="Whoops 404!" subtitle="The URL was not found on this server." />
    </Card>
  );
}

export default NotFoundPage;
