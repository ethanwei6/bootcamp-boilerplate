import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
  Avatar
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  price: number;
  description: string;
  location: string;
  personality: string[];
  characteristics: string[];
  url?: string;
}

interface ApplicationForm {
  name: string;
  address: string;
  housingType: string;
  email: string;
  phoneNumber: string;
  hasOtherPets: boolean;
  otherPetsDescription: string;
  yearlyIncome: number;
  vetName: string;
  vetLocation: string;
}

const steps = ['Pet Information', 'Personal Information', 'Living Situation', 'Veterinary Information', 'Review & Submit'];

const AdoptionApplication: React.FC = () => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    address: '',
    housingType: '',
    email: '',
    phoneNumber: '',
    hasOtherPets: false,
    otherPetsDescription: '',
    yearlyIncome: 0,
    vetName: '',
    vetLocation: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const { petId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Mock pet data - replace with actual API call
    const mockPet: Pet = {
      _id: petId || '1',
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'Male',
      price: 150,
      description: 'A friendly and energetic dog who loves to play fetch.',
      location: 'San Francisco, CA',
      personality: ['Friendly', 'Energetic', 'Loyal'],
      characteristics: ['Good with kids', 'House trained', 'Vaccinated'],
      url: 'https://imageserver.petsbest.com/marketing/blog/toy-poodle.jpg'
    };
    
    setPet(mockPet);
  }, [petId, user, navigate]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field: keyof ApplicationForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.housingType) errors.housingType = 'Housing type is required';
    if (formData.yearlyIncome <= 0) errors.yearlyIncome = 'Please enter a valid income';
    if (!formData.vetName.trim()) errors.vetName = 'Veterinarian name is required';
    if (!formData.vetLocation.trim()) errors.vetLocation = 'Veterinarian location is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError('Please fill in all required fields correctly.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      console.log('Submitting application:', {
        petId: pet?._id,
        petName: pet?.name,
        applicant: formData,
        submittedAt: new Date().toISOString()
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock API call
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              🐾 Pet Information
            </Typography>
            {pet && (
              <Card sx={{ 
                mb: 3, 
                borderRadius: '20px',
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '3px solid transparent',
                backgroundClip: 'padding-box'
              }}>
                <Box sx={{ display: 'flex', p: 3 }}>
                  {pet.url ? (
                    <Avatar 
                      src={pet.url}
                      alt={pet.name}
                      sx={{ 
                        width: 150, 
                        height: 150, 
                        mr: 3,
                        borderRadius: '20px'
                      }}
                    />
                  ) : (
                    <Avatar 
                      sx={{ 
                        width: 150, 
                        height: 150, 
                        mr: 3,
                        borderRadius: '20px',
                        background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
                        fontSize: '3rem'
                      }}
                    >
                      🐾
                    </Avatar>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {pet.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                      {pet.breed} • {pet.age} years old • {pet.gender}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        📍
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {pet.location}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {pet.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Personality Traits:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {pet.personality.map((trait, index) => (
                          <Chip 
                            key={index} 
                            label={trait} 
                            size="small" 
                            sx={{ 
                              background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Characteristics:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {pet.characteristics.map((char, index) => (
                          <Chip 
                            key={index} 
                            label={char} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              borderColor: '#4CAF50',
                              color: '#4CAF50',
                              fontWeight: 'bold'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    <Paper sx={{ 
                      p: 2, 
                      background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
                      color: 'white',
                      borderRadius: '15px',
                      textAlign: 'center'
                    }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Adoption Fee: ${pet.price}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Card>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              👤 Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Yearly Income"
                  type="number"
                  value={formData.yearlyIncome}
                  onChange={handleInputChange('yearlyIncome')}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              🏠 Living Situation
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Type of Housing</InputLabel>
                  <Select
                    value={formData.housingType}
                    label="Type of Housing"
                    onChange={handleInputChange('housingType')}
                  >
                    <MenuItem value="house">House</MenuItem>
                    <MenuItem value="apartment">Apartment</MenuItem>
                    <MenuItem value="condo">Condo</MenuItem>
                    <MenuItem value="townhouse">Townhouse</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.hasOtherPets}
                      onChange={handleInputChange('hasOtherPets')}
                    />
                  }
                  label="Do you have other pets?"
                />
              </Grid>
              {formData.hasOtherPets && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Describe your other pets"
                    multiline
                    rows={3}
                    value={formData.otherPetsDescription}
                    onChange={handleInputChange('otherPetsDescription')}
                    placeholder="Please describe the types, ages, and temperaments of your other pets"
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              🏥 Veterinary Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Veterinarian Name"
                  value={formData.vetName}
                  onChange={handleInputChange('vetName')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Veterinarian Location"
                  value={formData.vetLocation}
                  onChange={handleInputChange('vetLocation')}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              📋 Review Your Application
            </Typography>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Pet:</strong> {pet?.name} ({pet?.breed})
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Name:</strong> {formData.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Email:</strong> {formData.email}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Phone:</strong> {formData.phoneNumber}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Address:</strong> {formData.address}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Housing Type:</strong> {formData.housingType}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Yearly Income:</strong> ${formData.yearlyIncome.toLocaleString()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Has Other Pets:</strong> {formData.hasOtherPets ? 'Yes' : 'No'}
              </Typography>
              {formData.hasOtherPets && (
                <Typography variant="body2" gutterBottom>
                  <strong>Other Pets:</strong> {formData.otherPetsDescription}
                </Typography>
              )}
              <Typography variant="body2" gutterBottom>
                <strong>Veterinarian:</strong> {formData.vetName} - {formData.vetLocation}
              </Typography>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 8, flex: 1, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Application submitted successfully! You will be notified of the status within 2-3 business days.
          </Alert>
          <Button variant="contained" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/browse')}
            sx={{ mr: 2 }}
          >
            Back to Browse
          </Button>
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          mb: 4
        }}>
          🐾 Pet Adoption Application
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{
                '& .MuiStepLabel-label': {
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }
              }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card sx={{ 
          p: 4, 
          mb: 3,
          borderRadius: '20px',
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '3px solid transparent',
          backgroundClip: 'padding-box'
        }}>
          {renderStepContent(activeStep)}
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              borderRadius: '25px',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            ← Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #388E3C, #1976D2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : '🚀 Submit Application'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #388E3C, #1976D2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Next →
            </Button>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default AdoptionApplication;

