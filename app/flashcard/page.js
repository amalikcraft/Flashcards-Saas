'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useSearchParams } from 'next/navigation'
import { Container, Button, Typography, Box, Grid, AppBar, Toolbar } from '@mui/material'
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

const FlashcardContainer = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  width: '100%',
  paddingTop: '56.25%', // 16:9 aspect ratio
  position: 'relative',
  cursor: 'pointer',
}));

const FlashcardContent = styled(Box)(({ flipped }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s, box-shadow 0.3s ease',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    transform: flipped ? 'rotateY(180deg) scale(1.05)' : 'rotateY(0deg) scale(1.05)',
  },
}));

const FlashcardSide = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,
}));

const FlashcardBack = styled(FlashcardSide)({
  transform: 'rotateY(180deg)',
});

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [setName, setSetName] = useState("")
  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return
      setSetName(search)
      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      const docs = await getDocs(colRef)
      const flashcards = []
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() })
      })
      setFlashcards(flashcards)
    }
    if (isLoaded && isSignedIn) {
      getFlashcard()
    }
  }, [isLoaded, isSignedIn, user, search])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Nav Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', width: '100vw' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <QuizzMeButton href="/" onClick={() => window.location.href = '/'}>
              QuizzMe
            </QuizzMeButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
              <Button color="inherit" sx={{ mr: 2 }} href="/Dashboard">Dashboard</Button>
              <Button color="inherit" sx={{ mr: 2 }} href="/Create">+ Create</Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SignedOut>
              <AnimatedButton color="inherit" href="/sign-in" sx={{ mr: 1 }}>Login</AnimatedButton>
              <AnimatedButton color="inherit" href="/sign-up">Sign Up</AnimatedButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 10, mb:10, px: { xs: 2, sm: 4, md: 6 }, flexGrow: 1 }}>
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          {flashcards.length > 0 && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Flashcard Deck: {setName}
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <FlashcardContainer onClick={() => handleCardClick(index)}>
                      <FlashcardContent flipped={flipped[index]}>
                        <FlashcardSide>
                          <Typography variant="h5" component="div">{flashcard.front}</Typography>
                        </FlashcardSide>
                        <FlashcardBack>
                          <Typography variant="h5" component="div">{flashcard.back}</Typography>
                        </FlashcardBack>
                      </FlashcardContent>
                    </FlashcardContainer>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
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
