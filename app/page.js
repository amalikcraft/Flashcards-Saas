'use client';

import Image from 'next/image';
import getStripe from '@/utils/get-stripe.js';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

// Custom styled button with animations
const AnimatedButton = styled(Button)({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
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

// Card Styles
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: '1px solid',
  borderColor: 'grey.300',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  },
}));

export default function Home() {
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
    <Container
      maxWidth="100vw"
      disableGutters
      sx={{
        backgroundColor: '#f0f4f8', // Set the background color for the entire page
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      <Head>
        <title>QuizzMe - Flashcards Made Simple</title>
        <meta name="description" content="Create flashcards from your text with ease." />
      </Head>

      {/* Sticky AppBar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, mr: 4, fontSize: '1.5rem', fontWeight: 'bold' }}>
              QuizzMe
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(to right, #1976d2, #2196f3)', // Gradient background
          color: '#fff',
          textAlign: 'center',
          py: 18, // Increase padding top and bottom
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)', // Overlay for better text readability
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' }, // Responsive font size
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Welcome to QuizzMe
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' }, // Responsive font size
              mb: 4,
            }}
          >
            The easiest way to create flashcards from your text.
          </Typography>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <AnimatedButton
              variant="contained"
              color="secondary"
              sx={{ py: 1.5, px: 3, fontSize: '1.1rem' }} // Adjust padding and font size
              href="/Get-Started"
            >
              Get Started
            </AnimatedButton>
            <AnimatedButton
              variant="contained"
              color="primary"
              sx={{ py: 1.5, px: 3, fontSize: '1.1rem' }} // Adjust padding and font size
              href="/Demo"
            >
              Try Demo
            </AnimatedButton>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          width: '100%',
          backgroundImage: 'url("/study.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center items
          backgroundColor: '#f0f4f8', // Fallback color in case image doesn't load
          minHeight: '100vh', // Ensure full height if needed
          p: 0, // Remove padding for the image
          m: 0, // Remove margin for the image
        }}
      >
        <Box
          sx={{
            p: 4, // Padding for the inner content
            m: 2, // Margin for the inner content
            width: '100%', // Adjust width as needed
          }}
        >
          <Grid container spacing={3} sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Grid item xs={12} md={4} sx={{ ml: { md: '5%' } }}> {/* Move boxes to the right */}
              <StyledCard elevation={6}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}> {/* Increase text size */}
                    Easy-to-Use
                  </Typography>
                  <Typography sx={{ fontSize: '1rem' }}> {/* Increase text size */}
                    Our user-friendly interface makes the process of creating flashcards seamless and efficient.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4} sx={{ ml: { md: '10%' } }}> {/* Move boxes to the right */}
              <StyledCard elevation={6}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}> {/* Increase text size */}
                    AI Powered
                  </Typography>
                  <Typography sx={{ fontSize: '1rem' }}> {/* Increase text size */}
                    Create flashcards instantly with our integrated OpenAI technology.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4} sx={{ ml: { md: '15%' } }}> {/* Move boxes to the right */}
              <StyledCard elevation={6}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}> {/* Increase text size */}
                    Study Anywhere
                  </Typography>
                  <Typography sx={{ fontSize: '1rem' }}> {/* Increase text size */}
                    Study on the go with flashcards available on all your devices.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Pricing Section */}
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: '#f0f4f8',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 0, // Increased padding top to create more space below 
          py: 15,
          px: 2,
        }}
      >
        <Head>
          <title>Pricing - QuizzMe</title>
          <meta name="description" content="Check out our pricing plans and choose the best one for you." />
        </Head>

        <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
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
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          &copy; 2024 QuizzMe. All rights reserved.
        </p>
      </footer>
    </Container>
  );
}
