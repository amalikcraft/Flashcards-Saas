
'use client'

import { useState, useEffect } from 'react'
import { Paper, Container, TextField, Button, Typography, Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, AppBar, Toolbar, Switch, FormControlLabel } from '@mui/material'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { writeBatch, doc, collection, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'
import { styled } from '@mui/material/styles'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const AnimatedButton = styled(Button)({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
})

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
})

const FlashcardContainer = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  width: '100%',
  paddingTop: '56.25%',
  position: 'relative',
  cursor: 'pointer',
}))

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
}))

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
}))

const FlashcardBack = styled(FlashcardSide)({
  transform: 'rotateY(180deg)',
})

const FlipContainer = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  width: '100%',
  height: '400px',
}))

const Flipper = styled(Box)(({ flipped }) => ({
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  position: 'relative',
  width: '100%',
  height: '100%',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}))

const FlipSide = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
})

const FlipBack = styled(FlipSide)({
  transform: 'rotateY(180deg)',
})

const CircularButton = styled(Button)(({ theme }) => ({
  minWidth: '40px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  padding: 0,
  margin: theme.spacing(0, 1),
}))

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isManualMode, setIsManualMode] = useState(false)
  const [manualFlashcards, setManualFlashcards] = useState([{ front: '', back: '' }])
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push('/sign-in')
      } else {
        setLoading(false)
      }
    }
  }, [isLoaded, isSignedIn, router])

  const handleSubmit = async () => {
    setIsGenerating(true)
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then(data => {
        setFlashcards(data)
        setIsGenerating(false)
      })
      .catch(error => {
        console.error('Error generating flashcards:', error)
        setIsGenerating(false)
      })
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const addFlashcard = () => {
    setManualFlashcards([...manualFlashcards, { front: '', back: '' }])
  }

  const removeFlashcard = (index) => {
    const newFlashcards = manualFlashcards.filter((_, i) => i !== index)
    setManualFlashcards(newFlashcards)
  }

  const updateFlashcard = (index, field, value) => {
    const newFlashcards = [...manualFlashcards]
    newFlashcards[index][field] = value
    setManualFlashcards(newFlashcards)
  }

  const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    const batch = writeBatch(db)
    const userDocRef = doc(collection(db, 'users'), user.id)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || []
      if (collections.find((f) => f.name === name)) {
        alert('Flashcard collection with the same name already exists.')
        return
      } else {
        collections.push({ name })
        batch.set(userDocRef, { flashcards: collections }, { merge: true })
      }
    } else {
      batch.set(userDocRef, { flashcardSets: [{ name }] })
    }

    const colRef = collection(userDocRef, name)
    const cardsToSave = isManualMode ? manualFlashcards : flashcards
    cardsToSave.forEach((flashcard) => {
      const cardDocRef = doc(colRef)
      batch.set(cardDocRef, flashcard)
    })

    await batch.commit()
    handleClose()
    router.push('/Dashboard')
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading Environment...</Typography>
      </Box>
    )
  }

  return (
    <>
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


      <Container maxWidth="md" sx={{ mt: 15, mb: 8, minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          {isManualMode ? "Create Flashcards Manually" : "Generate Flashcards with AI"}
        </Typography>

        <FormControlLabel
          control={<Switch checked={isManualMode} onChange={() => setIsManualMode(!isManualMode)} />}
          label={isManualMode ? "Switch to AI Generation" : "Switch to Manual Creation"}
          sx={{ mb: 2 }}
        />

        <Paper elevation={3} sx={{ p: 4, mb: 2, flexGrow: 1 }}>
          {isManualMode ? (
            <>
              {manualFlashcards.map((flashcard, index) => (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} key={index}>
                  <TextField
                    label="Question"
                    value={flashcard.front}
                    onChange={(e) => updateFlashcard(index, 'front', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Answer"
                    value={flashcard.back}
                    onChange={(e) => updateFlashcard(index, 'back', e.target.value)}
                    fullWidth
                    sx={{ mx: 2 }}
                  />
                  <CircularButton variant="outlined" onClick={() => removeFlashcard(index)}>-</CircularButton>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularButton variant="outlined" onClick={addFlashcard}>+</CircularButton>
              </Box>
            </>
          ) : (
            <>
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="What do you want to study?"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{ mb: 3 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <AnimatedButton 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmit}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </AnimatedButton>
              </Box>
              {isGenerating && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress />
                </Box>
              )}
            </>
          )}
        </Paper>

        {((isManualMode && manualFlashcards.length > 0) || (!isManualMode && flashcards.length > 0)) && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" align="center" sx={{ mb: 4 }}>
              Preview Flashcards
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {(isManualMode ? manualFlashcards : flashcards).map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <FlashcardContainer onClick={() => handleCardClick(index)}>
                    <FlashcardContent flipped={flipped[index]}>
                      <FlashcardSide>
                        <Typography variant="body1">{flashcard.front}</Typography>
                      </FlashcardSide>
                      <FlashcardBack>
                        <Typography variant="body1">{flashcard.back}</Typography>
                      </FlashcardBack>
                    </FlashcardContent>
                  </FlashcardContainer>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <AnimatedButton variant="contained" color="primary" onClick={handleOpen}>
                Save
              </AnimatedButton>
            </Box>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Flashcard Deck</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcard deck.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Flashcard Deck Name"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={saveFlashcards}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>

      <footer style={{
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100vw',
        boxSizing: 'border-box',
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

    </>
  );
}
