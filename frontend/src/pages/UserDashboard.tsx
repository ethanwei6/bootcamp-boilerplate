import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Grid,
  Chip,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

interface Application {
  id: string;
  pet: Pet;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const UserDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [ownedPets, setOwnedPets] = useState<Pet[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with actual API calls
    setOwnedPets([
      {
        _id: '1',
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
      }
    ]);

    setApplications([
      {
        id: '1',
        pet: {
          _id: '2',
          name: 'Charlie',
          breed: 'Beagle',
          age: 4,
          gender: 'Male',
          price: 200,
          description: 'A gentle beagle who loves walks and treats.',
          location: 'Austin, TX',
          personality: ['Gentle', 'Playful', 'Curious'],
          characteristics: ['Good with kids', 'House trained'],
          url: 'https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2Fda89d930fc320dd912a2a25487b9ca86b37fcdd6-800x600.jpg&w=1080&q=80'
        },
        status: 'pending',
        submittedAt: '2024-01-15'
      },
      {
        id: '2',
        pet: {
          _id: '3',
          name: 'Storm',
          breed: 'Husky',
          age: 2,
          gender: 'Female',
          price: 300,
          description: 'A beautiful husky with striking blue eyes.',
          location: 'Seattle, WA',
          personality: ['Independent', 'Playful', 'Intelligent'],
          characteristics: ['Good with kids', 'House trained', 'Vaccinated'],
          url: 'https://media.licdn.com/dms/image/v2/D5603AQFZz25DIOZMNQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1713297372566?e=1762387200&v=beta&t=pNNu0dMJNOoUlVbWGQOTsEMuzwMWHJ7M9NJR0s73L74'
        },
        status: 'approved',
        submittedAt: '2024-01-10'
      }
    ]);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  const PetCard: React.FC<{ pet: Pet; showAdoptButton?: boolean }> = ({ pet, showAdoptButton = false }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {pet.url && (
        <CardMedia
          component="img"
          height="200"
          image={pet.url}
          alt={pet.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {pet.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip label={`${pet.age} years`} size="small" color="primary" />
          <Typography variant="body2" color="text.secondary">
            {pet.breed} • {pet.gender}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          📍 {pet.location}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {pet.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Personality:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {pet.personality.map((trait, index) => (
              <Chip key={index} label={trait} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Characteristics:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {pet.characteristics.map((char, index) => (
              <Chip key={index} label={char} size="small" color="secondary" />
            ))}
          </Box>
        </Box>

        {showAdoptButton && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(`/apply/${pet._id}`)}
            sx={{ mt: 'auto' }}
          >
            Apply to Adopt
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
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
          My Dashboard
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`My Pets (${ownedPets.length})`} />
            <Tab label={`My Applications (${applications.length})`} />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              My Pets ({ownedPets.length})
            </Typography>
            {ownedPets.length === 0 ? (
              <Alert severity="info">
                You haven't adopted any pets yet. Browse our available pets to find your perfect companion!
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {ownedPets.map((pet) => (
                  <Grid item xs={12} sm={6} md={4} key={pet._id}>
                    <PetCard pet={pet} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              My Applications ({applications.length})
            </Typography>
            {applications.length === 0 ? (
              <Alert severity="info">
                You haven't submitted any applications yet. Browse our available pets to start your adoption journey!
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {applications.map((application) => (
                  <Grid item xs={12} sm={6} md={4} key={application.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {application.pet.url && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={application.pet.url}
                          alt={application.pet.name}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {application.pet.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Chip label={`${application.pet.age} years`} size="small" color="primary" />
                          <Typography variant="body2" color="text.secondary">
                            {application.pet.breed} • {application.pet.gender}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          📍 {application.pet.location}
                        </Typography>
                        
                        <Box sx={{ mt: 'auto' }}>
                          <Chip 
                            label={application.status.toUpperCase()} 
                            color={getStatusColor(application.status) as any}
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="caption" display="block">
                            Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default UserDashboard;

