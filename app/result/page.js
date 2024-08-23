'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getStripe from '@/utils/get-stripe';
import { useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography, Container, AppBar, Toolbar, Button, Box as MUIBox } from '@mui/material';
import { styled } from '@mui/material/styles';
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
const StyledCard = styled(Box)(({ theme }) => ({
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

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <MUIBox sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Typography variant="h6" sx={{ flexGrow: 1, mr: 4, fontSize: '1.5rem', fontWeight: 'bold' }}>
                QuizzMe
              </Typography>
              <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
                <Button color="inherit" sx={{ mr: 2 }} href="/Dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" sx={{ mr: 2 }} href="/Create">
                  + Create
                </Button>
              </MUIBox>
            </MUIBox>
            <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
              <AnimatedButton color="inherit" href="/sign-in" sx={{ mr: 1 }}>
                Login
              </AnimatedButton>
              <AnimatedButton color="inherit" href="/sign-up">
                Sign Up
              </AnimatedButton>
            </MUIBox>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="100vw"
          sx={{
            flex: 1,
            textAlign: 'center',
            mt: 4,
          }}
        >
          <CircularProgress />
          <Typography variant="h6">Loading...</Typography>
        </Container>
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#1976d2',
            color: '#fff',
            py: 4,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="body1" gutterBottom>
              © 2024 QuizzMe. All rights reserved.
            </Typography>
            <MUIBox sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaFacebookF /></a>
              <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaTwitter /></a>
              <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaInstagram /></a>
            </MUIBox>
          </Container>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <MUIBox sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Typography variant="h6" sx={{ flexGrow: 1, mr: 4, fontSize: '1.5rem', fontWeight: 'bold' }}>
                QuizzMe
              </Typography>
              <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
                <Button color="inherit" sx={{ mr: 2 }} href="/Dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" sx={{ mr: 2 }} href="/Create">
                  + Create
                </Button>
              </MUIBox>
            </MUIBox>
            <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
              <AnimatedButton color="inherit" href="/sign-in" sx={{ mr: 1 }}>
                Login
              </AnimatedButton>
              <AnimatedButton color="inherit" href="/sign-up">
                Sign Up
              </AnimatedButton>
            </MUIBox>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="100vw"
          sx={{
            flex: 1,
            textAlign: 'center',
            mt: 4,
          }}
        >
          <CircularProgress />
          <Typography variant="h6">{error}</Typography>
        </Container>
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#1976d2',
            color: '#fff',
            py: 4,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="body1" gutterBottom>
              © 2024 QuizzMe. All rights reserved.
            </Typography>
            <MUIBox sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaFacebookF /></a>
              <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaTwitter /></a>
              <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaInstagram /></a>
            </MUIBox>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <MUIBox sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, mr: 4, fontSize: '1.5rem', fontWeight: 'bold' }}>
              QuizzMe
            </Typography>
            <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit" sx={{ mr: 2 }} href="/Dashboard">
                Dashboard
              </Button>
              <Button color="inherit" sx={{ mr: 2 }} href="/Create">
                + Create
              </Button>
            </MUIBox>
          </MUIBox>
          <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
            <AnimatedButton color="inherit" href="/sign-in" sx={{ mr: 1 }}>
              Login
            </AnimatedButton>
            <AnimatedButton color="inherit" href="/sign-up">
              Sign Up
            </AnimatedButton>
          </MUIBox>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="100vw"
        sx={{
          flex: 1,
          textAlign: 'center',
          mt: 4,
        }}
      >
        {session.payments_status === 'paid' ? (
          <>
            <Typography variant="h4">Thank you for purchasing</Typography>
            <Box sx={{ mt: 22 }}>
              <Typography variant="h6">Session ID: {session_id}</Typography>
              <Typography variant="body1">
                We have received your payment. You will receive an email with order details shortly.
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4">Payment Failed</Typography>
            <Box sx={{ mt: 22 }}>
              <Typography variant="body1">
                Your payment was not successful. Please try again.
              </Typography>
            </Box>
          </>
        )}
      </Container>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#1976d2',
          color: '#fff',
          py: 4,
          textAlign: 'center',
          mt: 'auto',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body1" gutterBottom>
            © 2024 QuizzMe. All rights reserved.
          </Typography>
          <MUIBox sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaFacebookF /></a>
            <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaTwitter /></a>
            <a href="#" style={{ color: '#fff', margin: '0 10px' }}><FaInstagram /></a>
          </MUIBox>
        </Container>
      </Box>
    </Box>
  );
};

export default ResultPage;
