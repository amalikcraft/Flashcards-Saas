'use client';

import { Container, Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Head from 'next/head';

const AnimatedButton = styled(Button)({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
});

export default function Pricing() {
  return (
    <Container
      maxWidth="xl" // Ensure the background color extends fully
      sx={{
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        px: 2, // Ensure background color extends fully
      }}
    >
      <Head>
        <title>Pricing - QuizzMe</title>
        <meta name="description" content="Check out our pricing plans and choose the best one for you." />
      </Head>

      <Typography variant="h2" component="h1" sx={{ mb: 8 }}> {/* Increased space below title */}
        Choose Your Study Plan
      </Typography>

      <Grid container spacing={4} sx={{ maxWidth: '1200px' }}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              p: 3,
              borderRadius: '16px',
              border: '1px solid',
              borderColor: 'grey.300',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Free
              </Typography>
              <Typography variant="h6" gutterBottom>
                $0 / month
              </Typography>
              <Typography>Access to basic flashcard features and limited storage.</Typography>
              <AnimatedButton variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Free
              </AnimatedButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={5}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              p: 3,
              borderRadius: '16px',
              border: '2px solid',
              borderColor: '#1976d2',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Standard
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / month
              </Typography>
              <Typography>Access to AI-powered flashcards with limited storage.</Typography>
              <AnimatedButton variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Standard
              </AnimatedButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              p: 3,
              borderRadius: '16px',
              border: '1px solid',
              borderColor: 'grey.300',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Premium
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography>Access to AI-powered flashcards and unlimited storage.</Typography>
              <AnimatedButton variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Premium
              </AnimatedButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
