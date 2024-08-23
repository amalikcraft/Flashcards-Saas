'use client';

import { Container, Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import { AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import getStripe from '@/utils/get-stripe.js';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

// Custom styled button with animations
const AnimatedButton = styled(Button)({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
});

// Button styled to look like the Typography component
const QuizzMeButton = styled(Button)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'white',
  textTransform: 'none',
  background: 'none',
  padding: 0,
  minWidth: 'auto',
  '&:hover': {
    textDecoration: 'none',
    background: 'none',
  },
});

// Section Title
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '2.5rem',
  color: theme.palette.primary.main,
}));

export default function Pricing() {
  const handleSubscription = async (plan) => {
    const response = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }

    const { id } = await response.json();
    const stripe = await getStripe();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId: id });

    if (error) {
      console.error('Stripe Checkout error:', error);
    }
  };

  return (
    <>
      {/* Nav Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', width: '100%', top: 0, left: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <QuizzMeButton href="/" onClick={() => window.location.href = '/'}>
              QuizzMe
            </QuizzMeButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
              <Button color="inherit" sx={{ mr: 2 }} href="/Dashboard">
                Dashboard
              </Button>
              <Button color="inherit" sx={{ mr: 2 }} href="/Create">
                + Create
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SignedOut>
              <AnimatedButton color="inherit" href="/sign-in" sx={{ mr: 1 }}>
                Login
              </AnimatedButton>
              <AnimatedButton color="inherit" href="/sign-up">
                Sign Up
              </AnimatedButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: '#f0f4f8',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 2, // Increased padding top to create more space below the fixed navbar
          py: 20,
          px: 2,
        }}
      >
        <Head>
          <title>Pricing - QuizzMe</title>
          <meta name="description" content="Check out our pricing plans and choose the best one for you." />
        </Head>

        <Typography variant="h2" component="h1" sx={{ mb: 8 }}>
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
                <AnimatedButton variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleSubscription('free')}>
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
                <AnimatedButton
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleSubscription('standard')}
                >
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
                <AnimatedButton
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleSubscription('premium')}
                >
                  Choose Premium
                </AnimatedButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <footer style={{
        backgroundColor: '#1976d2', // Blue background
        color: '#fff',
        padding: '2rem', // More vertical spacing
        textAlign: 'center',
        position: 'relative',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100vw', // Full viewport width
        boxSizing: 'border-box', // Includes padding in width calculation
      }}>

        <div style={{ marginBottom: '1rem' }}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 0.5rem' }}>
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 0.5rem' }}>
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 0.5rem' }}>
            <FaInstagram size={24} />
          </a>
        </div>

        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} QuizzMe. All rights reserved.
        </Typography>

      </footer>
    </>
  );
}
