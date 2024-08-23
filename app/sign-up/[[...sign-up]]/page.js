'use client'; // This makes the entire component render on the client side

import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import { styled } from '@mui/material/styles';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
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
  textTransform: 'none', // Avoid automatic text transform
  background: 'none', // No background
  padding: 0, // Remove padding
  minWidth: 'auto', // Avoid default minWidth
  '&:hover': {
    textDecoration: 'none', // Ensure no underline on hover
    background: 'none', // No background change on hover
  },
});

export default function SignUpPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      {/* Nav Bar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
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

      {/* Sign Up */}
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          backgroundColor: '#f0f4f8', // Ensure background color consistency
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: 'center', my: 4 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <SignUp />
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#1976d2', // Match footer background with the AppBar
          color: '#fff',
          py: 3,
          px: 2,
          mt: 'auto',
          width: '100%', // Ensure footer takes full width
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 0.5rem' }}>
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 0.5rem' }}>
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 0.5rem' }}>
              <FaInstagram size={24} />
            </a>
          </Box>
          <Typography variant="body2" align="center">
            &copy; 2024 QuizzMe. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
