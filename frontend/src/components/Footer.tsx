import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const Footer: React.FC = () => {
  return (
    <Box sx={{ 
      backgroundColor: '#333', 
      color: 'white', 
      py: 4,
      mt: 'auto',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)'
    }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PetsIcon sx={{ color: '#4CAF50', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                PawGrammers
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
              Connecting loving families with pets in need of forever homes. 
              Every adoption creates a new beginning.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/browse" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8 }}>
                Browse Pets
              </Link>
              <Link href="/about" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8 }}>
                About Us
              </Link>
              <Link href="/contact" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8 }}>
                Contact
              </Link>
              <Link href="/faq" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8 }}>
                FAQ
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
              📧 info@pawgrammers.com
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
              📞 (555) 123-PAWS
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
              📍 San Francisco, CA
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid #555', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6, color: 'white' }}>
            © 2024 PawGrammers. All rights reserved. Made with ❤️ for pets and their families.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

