import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Find Your Perfect Match",
      description: "Browse through carefully assessed pets looking for their forever homes",
      icon: "🐾"
    },
    {
      title: "Easy Adoption Process",
      description: "Simple application process with quick approval from our team",
      icon: "📋"
    },
    {
      title: "Expert Care",
      description: "All pets receive proper medical care and behavioral assessment",
      icon: "🏥"
    }
  ];

  const stats = [
    { number: "500+", label: "Pets Adopted" },
    { number: "200+", label: "Happy Families" },
    { number: "15+", label: "Cities Covered" }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <Header />
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
        color: 'white',
        py: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Playful Background Shapes */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' }
          }
        }}>
          🐕
        </Box>
        
        <Box sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #4ECDC4, #44A08D)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          animation: 'float 3s ease-in-out infinite 1s'
        }}>
          🐱
        </Box>

        <Box sx={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #FFD93D, #FFA726)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          animation: 'float 3s ease-in-out infinite 2s'
        }}>
          🐰
        </Box>

        <Box sx={{
          position: 'absolute',
          bottom: '25%',
          right: '20%',
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #AB47BC, #E1BEE7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          animation: 'float 3s ease-in-out infinite 0.5s'
        }}>
          🐹
        </Box>

        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Find Your Perfect Companion
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 4, 
            opacity: 0.9,
            fontSize: { xs: '1.1rem', md: '1.5rem' }
          }}>
            Discover loving pets looking for their forever homes. Each pet has been carefully assessed and is ready to bring joy to your family!
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center', 
            alignItems: 'center',
            flexWrap: 'wrap',
            mt: 4
          }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)', 
                color: 'white',
                '&:hover': { 
                  background: 'linear-gradient(45deg, #FF5252, #FF7979)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)'
                },
                px: 5,
                py: 2,
                minWidth: '180px',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/browse')}
            >
              🐾 Browse Pets
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                borderWidth: '3px',
                '&:hover': { 
                  borderColor: 'white', 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)'
                },
                px: 5,
                py: 2,
                minWidth: '180px',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/login')}
            >
              🚀 Get Started
            </Button>
          </Box>
        </Container>
        
        {/* Wavy Separator */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 60,
          background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 60,
            background: '#f8f9fa',
            clipPath: 'polygon(0 100%, 0 0, 25% 30%, 50% 0, 75% 30%, 100% 0, 100% 100%)'
          }
        }} />
      </Box>

      {/* Features Section */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa',
        py: 8,
        position: 'relative'
      }}>
        {/* Background decorative shapes */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #FFD93D, #FFA726)',
          opacity: 0.1,
          animation: 'pulse 2s ease-in-out infinite'
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '8%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #4ECDC4, #44A08D)',
          opacity: 0.1,
          animation: 'pulse 2s ease-in-out infinite 1s'
        }} />

        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ 
            mb: 6,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Why Choose PawGrammers? ✨
          </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ width: '100%' }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ 
                height: '100%', 
                textAlign: 'center', 
                p: 3,
                borderRadius: '20px',
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '3px solid transparent',
                backgroundClip: 'padding-box',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}>
                <CardContent>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${index === 0 ? '#FF6B6B' : index === 1 ? '#4ECDC4' : '#FFD93D'}, ${index === 0 ? '#FF8E8E' : index === 1 ? '#44A08D' : '#FFA726'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    fontSize: '2.5rem',
                    animation: 'bounce 2s ease-in-out infinite',
                    '@keyframes bounce': {
                      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                      '40%': { transform: 'translateY(-10px)' },
                      '60%': { transform: 'translateY(-5px)' }
                    }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    mb: 2
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{
                    lineHeight: 1.6,
                    fontSize: '1rem'
                  }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'pulse 3s ease-in-out infinite'
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'pulse 3s ease-in-out infinite 1.5s'
        }} />

        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ 
            mb: 6,
            color: 'white',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold'
          }}>
            Our Amazing Impact! 🎉
          </Typography>
          <Grid container spacing={4} textAlign="center" justifyContent="center" alignItems="stretch" sx={{ width: '100%' }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  p: 4,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  },
                  transition: 'all 0.3s ease'
                }}>
                  <Typography variant="h3" component="div" sx={{ 
                    fontWeight: 'bold', 
                    color: 'white',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    mt: 1
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa',
        py: 8,
        position: 'relative'
      }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ 
            mb: 6,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            How It Works 🚀
          </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ width: '100%' }}>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box textAlign="center">
              <Box sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%', 
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>1</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>Browse & Search</Typography>
              <Typography variant="body1" color="text.secondary">
                Use our advanced search filters to find pets that match your lifestyle and preferences.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box textAlign="center">
              <Box sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%', 
                background: 'linear-gradient(45deg, #4ECDC4, #44A08D)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 8px 25px rgba(78, 205, 196, 0.3)',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>2</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>Apply to Adopt</Typography>
              <Typography variant="body1" color="text.secondary">
                Fill out our simple application form with your information and pet care experience.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box textAlign="center">
              <Box sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%', 
                background: 'linear-gradient(45deg, #FFD93D, #FFA726)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 8px 25px rgba(255, 217, 61, 0.3)',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>3</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>Welcome Home</Typography>
              <Typography variant="body1" color="text.secondary">
                Once approved, meet your new family member and bring them to their forever home!
              </Typography>
            </Box>
          </Grid>
        </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Playful background shapes */}
        <Box sx={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          animation: 'float 4s ease-in-out infinite'
        }} />
        
        <Box sx={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          animation: 'float 4s ease-in-out infinite 2s'
        }} />

        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          animation: 'float 4s ease-in-out infinite 1s'
        }} />

        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Ready to Find Your Perfect Pet? 🎯
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 4, 
            opacity: 0.9,
            fontSize: { xs: '1.1rem', md: '1.3rem' }
          }}>
            Join thousands of families who have found their perfect companions through PawGrammers! 💕
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)', 
                color: 'white',
                '&:hover': { 
                  background: 'linear-gradient(45deg, #FF5252, #FF7979)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 30px rgba(255, 107, 107, 0.4)'
                },
                px: 6,
                py: 2.5,
                minWidth: '250px',
                borderRadius: '30px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'none',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/login', { state: { showRegister: true } })}
            >
              🌟 Start Your Journey Today! 🌟
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
