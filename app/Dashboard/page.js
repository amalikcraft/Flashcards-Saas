'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Typography, Container, Grid, Card, CardActionArea, CardContent, AppBar, Toolbar, Box, Button, CircularProgress } from '@mui/material'
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'
import { styled } from '@mui/material/styles'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

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

// Styled Card with hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: `2px solid ${theme.palette.grey[700]}`, // Increased border weight
  borderRadius: '8px', // Rectangular shape
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Increased shadow
  '&:hover': {
    transform: 'scale(1.05)', // Enlarge on hover
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.4)', // More shadow on hover
  },
}));

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(true) // Initially loading
  const router = useRouter()

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
      setLoading(false) // Set loading to false once data is fetched
    }

    if (isLoaded) {
      if (!isSignedIn) {
        router.push('/sign-in')
      } else {
        getFlashcards()
      }
    }
  }, [isLoaded, isSignedIn, user, router])

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Flashcard Decks...
        </Typography>
      </Container>
    )
  }

  const handleCardClick = (name) => {
    router.push(`/flashcard?id=${name}`) // Updated route
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Nav Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
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

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 12, mb: 10, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 6 }}>
          My Flashcard Decks
        </Typography>
        <Grid container spacing={3}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h6">{flashcard.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          py: 3,
          px: 2,
          mt: 'auto',
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
  )
}