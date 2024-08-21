'use client'

import Image from "next/image";
import getStripe from '@/utils/get-stripe.js'
import { SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import { Container, AppBar, Toolbar, Typography, Button,Box,Grid } from '@mui/material';

import Head from 'next/head';

export default function Home() {


  const handleSubmit = async()=>{
    const checkoutSession = await fetch ('/api/checkout_session',{
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()
    
    if(checkoutSession.statusCode ===500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }

  }
  return (
    <Container maxWidth = "100vw">
      <Head>
        <title>Flashcard Saas</title>
        <meta name = "description" content = "Create flashcard from your test" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>

        {/* Get Started */}

        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
          Get Started
        </Button>

        {/* Learn More */}

        <Button variant="outlined" color="primary" sx={{mt: 2}}>
          Learn More
        </Button>
      </Box>

      {/* Features */}

      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              Effortlessly create flashcards by simply typing or pasting your text. Our intuitive interface ensures a smooth experience, turning your content into study-ready flashcards in seconds.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              Powered by advanced AI, our flashcards adapt to your learning style, highlighting key concepts and optimizing your study sessions for maximum retention.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              Study on the go with flashcards available on all your devices. Whether you’re at home or on the move, your flashcards are always within reach, ensuring you never miss a learning opportunity.
            </Typography>
          </Grid>
        </Grid>
      </Box>


      {/* Pricing */}


      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4"gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            
            <Box sx = {{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Free</Typography>
              <Typography variant="h6" gutterBottom>$0 / month</Typography>             
              <Typography>
                Access to Basic flascards features and LIMITED storage.
              </Typography>
              <Button variant = "contained" color = "primary" sx = {{mt:2}}>
                Choose Free
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
          <Box sx = {{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Standard</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>             
              <Typography>
                Access to AI-Powered Flascards with LIMITED storage.
              </Typography>
              <Button variant = "contained" color = "primary" sx = {{mt:2}}>
                Choose Standard
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
          <Box sx = {{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Premium</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>             
              <Typography>
                Access to AI-Powered Flascards and UNLIMITED storage.
              </Typography>
              <Button variant = "contained" color = "primary" sx = {{mt:2}} onClick = {handleSubmit}>
                Choose Premium
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Container>


  );
}
