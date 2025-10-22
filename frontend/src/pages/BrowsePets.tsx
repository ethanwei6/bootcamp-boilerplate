import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField,
  Slider,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

const BrowsePets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState<number[]>([0, 15]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [searchBy, setSearchBy] = useState('name');
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockPets: Pet[] = [
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
      },
      {
        _id: '2',
        name: 'Luna',
        breed: 'Domestic Shorthair',
        age: 2,
        gender: 'Female',
        price: 100,
        description: 'A playful kitten with striking blue eyes.',
        location: 'Portland, OR',
        personality: ['Playful', 'Curious', 'Affectionate'],
        characteristics: ['Good with kids', 'Litter trained', 'Vaccinated'],
        url: 'https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2Fda89d930fc320dd912a2a25487b9ca86b37fcdd6-800x600.jpg&w=1080&q=80'
      },
      {
        _id: '3',
        name: 'Charlie',
        breed: 'Beagle',
        age: 4,
        gender: 'Male',
        price: 200,
        description: 'A gentle beagle who loves walks and treats.',
        location: 'Austin, TX',
        personality: ['Gentle', 'Playful', 'Curious'],
        characteristics: ['Good with kids', 'House trained'],
        url: 'https://media.licdn.com/dms/image/v2/D5603AQFZz25DIOZMNQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1713297372566?e=1762387200&v=beta&t=pNNu0dMJNOoUlVbWGQOTsEMuzwMWHJ7M9NJR0s73L74'
      }
    ];
    
    setPets(mockPets);
    setFilteredPets(mockPets);
  }, []);

  useEffect(() => {
    let filtered = pets;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(pet => {
        const searchLower = searchTerm.toLowerCase();
        if (searchBy === 'name') {
          return pet.name.toLowerCase().includes(searchLower);
        } else if (searchBy === 'breed') {
          return pet.breed.toLowerCase().includes(searchLower);
        } else if (searchBy === 'location') {
          return pet.location.toLowerCase().includes(searchLower);
        }
        return false;
      });
    }

    // Age filter
    filtered = filtered.filter(pet => pet.age >= ageRange[0] && pet.age <= ageRange[1]);

    // Price filter
    filtered = filtered.filter(pet => pet.price >= priceRange[0] && pet.price <= priceRange[1]);

    setFilteredPets(filtered);
  }, [pets, searchTerm, ageRange, priceRange, searchBy]);

  const handleAgeChange = (event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const toggleFavorite = (petId: string) => {
    setFavorites(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {pet.url && (
        <CardMedia
          component="img"
          height="220"
          image={pet.url}
          alt={pet.name}
        />
      )}
      
      <Button
        sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          minWidth: 'auto',
          p: 1,
          backgroundColor: 'rgba(255,255,255,0.8)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
        }}
        onClick={() => toggleFavorite(pet._id)}
      >
        {favorites.includes(pet._id) ? 
          <FavoriteIcon sx={{ color: '#e91e63' }} /> : 
          <FavoriteBorderIcon sx={{ color: '#666' }} />
        }
      </Button>

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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="h6" color="primary">
            ${pet.price}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/apply/${pet._id}`)}
            sx={{ 
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45a049' }
            }}
          >
            Apply to Adopt
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
          Find Your Perfect Companion
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
          Discover loving pets looking for their forever homes. Each pet has been carefully assessed and is ready to bring joy to your family!
        </Typography>

        {/* Search and Filter Section */}
        <Card sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Search By</InputLabel>
                <Select
                  value={searchBy}
                  label="Search By"
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="breed">Breed</MenuItem>
                  <MenuItem value="location">Location</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                size="small"
                label="Search Term"
                placeholder={`Search by ${searchBy}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>🔍</Typography>
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Age Range: {ageRange[0]} - {ageRange[1]} years
                </Typography>
                <Slider
                  value={ageRange}
                  onChange={handleAgeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={15}
                  step={1}
                />
              </Box>
              
              <Box>
                <Typography variant="body2" gutterBottom>
                  Adoption Fee: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500}
                  step={25}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* Results */}
        <Typography variant="h5" gutterBottom>
          Available Pets ({filteredPets.length})
        </Typography>

        {filteredPets.length === 0 ? (
          <Box textAlign="center" sx={{ py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No pets match your current filters. Try adjusting your search criteria.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredPets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <PetCard pet={pet} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default BrowsePets;

