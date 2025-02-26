import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Dashboard() {
  const [flags, setFlags] = useState({
    flag1: 'Libre',
    flag2: 'Libre',
  });

  const { lastMessage } = useWebSocket('ws://172.16.8.162:8080/flag-websocket');

  React.useEffect(() => {
    if (lastMessage !== null) {
      const message = JSON.parse(lastMessage.data);
      if (message.type === 'flag_update') {
        setFlags(prev => ({ ...prev, [message.flagId]: message.status }));
      }
    }
  }, [lastMessage]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard des Drapeaux
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(flags).map(([flagId, status]) => (
          <Grid item xs={12} sm={6} md={4} key={flagId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{flagId}</Typography>
                <Typography
                  variant="body1"
                  color={status === 'Capturé' ? 'error' : 'success'}
                >
                  {status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;