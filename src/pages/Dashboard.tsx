import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

interface Flag {
  id: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [flags, setFlags] = useState<Record<string, string>>({});

  const fetchFlags = async () => {
    try {
      const response = await fetch('http://localhost:4000/flags');
      const data: Flag[] = await response.json();
      const flagsObject = data.reduce((acc: Record<string, string>, flag: Flag) => {
        acc[flag.id] = flag.status;
        return acc;
      }, {});
      setFlags(flagsObject);
    } catch (error) {
      console.error('Erreur lors du fetch des drapeaux :', error);
    }
  };

  useEffect(() => {
    fetchFlags();
    const interval = setInterval(fetchFlags, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box style={{ padding: '20px' }}>
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
    </Box>
  );
};

export default Dashboard;