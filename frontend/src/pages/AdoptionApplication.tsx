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
  StepLabel
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
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock API call
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
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
            <Typography variant="h6" gutterBottom>
              Pet Information
            </Typography>
            {pet && (
              <Card sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', p: 2 }}>
                  {pet.url && (
                    <Box sx={{ width: 150, height: 150, mr: 2 }}>
                      <img 
                        src={pet.url} 
                        alt={pet.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                      />
                    </Box>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{pet.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.breed} • {pet.age} years old • {pet.gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      📍 {pet.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {pet.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      Adoption Fee: ${pet.price}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
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
            <Typography variant="h6" gutterBottom>
              Living Situation
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
            <Typography variant="h6" gutterBottom>
              Veterinary Information
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
            <Typography variant="h6" gutterBottom>
              Review Your Application
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

        <Typography variant="h4" component="h1" gutterBottom>
          Adoption Application
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card sx={{ p: 3, mb: 3 }}>
          {renderStepContent(activeStep)}
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Submit Application'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default AdoptionApplication;

