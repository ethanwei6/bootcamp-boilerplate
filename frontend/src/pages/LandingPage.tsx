import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Find Your Perfect Companion
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Discover loving pets looking for their forever homes. Each pet has been carefully assessed and is ready to bring joy to your family!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                backgroundColor: 'white', 
                color: '#4CAF50',
                '&:hover': { backgroundColor: '#f5f5f5' },
                px: 4,
                py: 1.5
              }}
              onClick={() => navigate('/browse')}
            >
              Browse Pets
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
                px: 4,
                py: 1.5
              }}
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Why Choose PawGrammers?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                  {stat.number}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                backgroundColor: '#4CAF50', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>1</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>Browse & Search</Typography>
              <Typography variant="body1" color="text.secondary">
                Use our advanced search filters to find pets that match your lifestyle and preferences.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                backgroundColor: '#2196F3', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>2</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>Apply to Adopt</Typography>
              <Typography variant="body1" color="text.secondary">
                Fill out our simple application form with your information and pet care experience.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                backgroundColor: '#4CAF50', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
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

      {/* CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
        color: 'white',
        py: 6,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Find Your Perfect Pet?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of families who have found their perfect companions through PawGrammers.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: 'white', 
              color: '#4CAF50',
              '&:hover': { backgroundColor: '#f5f5f5' },
              px: 6,
              py: 2
            }}
            onClick={() => navigate('/register')}
          >
            Start Your Journey Today
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
