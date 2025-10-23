import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  CircularProgress,
  Link,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage: React.FC = () => {
  const [registerForm, setRegisterForm] = useState({ 
    userName: '', 
    password: '', 
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!registerForm.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(registerForm.userName, registerForm.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Username might already exist.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [field]: e.target.value });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="sm" sx={{ py: 8, flex: 1 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{ mb: 3 }}>
            Create Your Account 🐾
          </Typography>
          
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Join PawGrammers and start your journey to find the perfect pet companion!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleRegisterSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                value={registerForm.firstName}
                onChange={handleInputChange('firstName')}
                margin="normal"
                required
                disabled={isLoading}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={registerForm.lastName}
                onChange={handleInputChange('lastName')}
                margin="normal"
                required
                disabled={isLoading}
              />
            </Box>

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={registerForm.email}
              onChange={handleInputChange('email')}
              margin="normal"
              required
              disabled={isLoading}
              helperText="We'll use this to send you adoption updates"
            />

            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              value={registerForm.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
              margin="normal"
              disabled={isLoading}
              placeholder="(555) 123-4567"
            />

            <TextField
              fullWidth
              label="Username"
              value={registerForm.userName}
              onChange={handleInputChange('userName')}
              margin="normal"
              required
              disabled={isLoading}
              helperText="Choose a unique username for your account"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={registerForm.password}
              onChange={handleInputChange('password')}
              margin="normal"
              required
              disabled={isLoading}
              helperText="Must be at least 6 characters long"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={registerForm.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              margin="normal"
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF5252, #FF7979)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)'
                },
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                transition: 'all 0.3s ease'
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : '🌟 Create Account 🌟'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
          </Divider>

          <Box textAlign="center">
            <Link
              component="button"
              variant="body1"
              onClick={() => navigate('/login')}
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign in to your account
            </Link>
          </Box>

          <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              <strong>What happens next?</strong><br />
              After creating your account, you'll be able to browse available pets, 
              submit adoption applications, and track your adoption journey!
            </Typography>
          </Box>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default RegisterPage;
