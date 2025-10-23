import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPets, createPet, updatePet, deletePet } from '../ExampleApi';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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
  euthanized: boolean;
  url?: string;
}

interface User {
  id: string;
  userName: string;
  petsOwned: Pet[];
  applications: Application[];
}

interface Application {
  id: string;
  pet: Pet;
  user: User;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  formData: any;
}

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [pets, setPets] = useState<Pet[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [petDialogOpen, setPetDialogOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [petForm, setPetForm] = useState<Partial<Pet>>({});
  
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    loadPets();
    
    // Mock data for users and applications - replace with actual API calls when available
    const mockUsers: User[] = [
      {
        id: '1',
        userName: 'john_doe',
        petsOwned: [],
        applications: []
      },
      {
        id: '2',
        userName: 'jane_smith',
        petsOwned: [],
        applications: []
      }
    ];

    const mockApplications: Application[] = [
      {
        id: '1',
        pet: {
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
          euthanized: false,
          url: 'https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2Fda89d930fc320dd912a2a25487b9ca86b37fcdd6-800x600.jpg&w=1080&q=80'
        },
        user: mockUsers[1],
        status: 'pending',
        submittedAt: '2024-01-15',
        formData: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phoneNumber: '555-0123'
        }
      }
    ];

    setUsers(mockUsers);
    setApplications(mockApplications);
  }, [isAdmin, navigate]);

  const loadPets = async () => {
    try {
      const petsData = await getPets();
      if (petsData) {
        // Transform the API data to match our Pet interface
        const transformedPets: Pet[] = petsData.map((pet: any) => ({
          _id: pet._id,
          name: pet.name,
          breed: pet.breed,
          age: pet.age,
          gender: pet.gender || 'Unknown',
          price: pet.price || 0,
          description: pet.description || '',
          location: pet.location || '',
          personality: pet.personality || [],
          characteristics: pet.characteristics || [],
          euthanized: pet.euthanized || false,
          url: pet.url
        }));
        setPets(transformedPets);
      }
    } catch (error) {
      console.error('Failed to load pets:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreatePet = () => {
    setEditingPet(null);
    setPetForm({});
    setPetDialogOpen(true);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setPetForm(pet);
    setPetDialogOpen(true);
  };

  const handleDeletePet = async (petId: string) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await deletePet(petId);
        // Reload pets to get the updated list
        await loadPets();
      } catch (error) {
        console.error('Failed to delete pet:', error);
        // You could add error handling here, like showing a snackbar
      }
    }
  };

  const handleEuthanizePet = async (petId: string) => {
    if (window.confirm('Are you sure you want to mark this pet as euthanized?')) {
      try {
        await updatePet(petId, { euthanized: true });
        setPets(prev => prev.map(pet => 
          pet._id === petId ? { ...pet, euthanized: true } : pet
        ));
      } catch (error) {
        console.error('Failed to euthanize pet:', error);
      }
    }
  };

  const handleSavePet = async () => {
    try {
      if (editingPet) {
        // Update existing pet
        await updatePet(editingPet._id, petForm);
        setPets(prev => prev.map(pet => 
          pet._id === editingPet._id ? { ...pet, ...petForm } : pet
        ));
      } else {
        // Create new pet
        const response = await createPet(petForm);
        if (response.status === 200 || response.status === 201) {
          // Reload pets to get the updated list with the new pet
          await loadPets();
        }
      }
      setPetDialogOpen(false);
    } catch (error) {
      console.error('Failed to save pet:', error);
      // You could add error handling here, like showing a snackbar
    }
  };

  const handleApplicationAction = async (applicationId: string, action: 'approve' | 'reject') => {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;

    if (action === 'approve') {
      // Move pet to user's owned pets
      setUsers(prev => prev.map(user => 
        user.id === application.user.id 
          ? { ...user, petsOwned: [...user.petsOwned, application.pet] }
          : user
      ));
      
      // Remove pet from available pets
      setPets(prev => prev.filter(pet => pet._id !== application.pet._id));
    }

    // Remove application
    setApplications(prev => prev.filter(app => app.id !== applicationId));
  };

  const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {pet.name}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => handleEditPet(pet)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => handleDeletePet(pet._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {pet.breed} • {pet.age} years old • {pet.gender}
        </Typography>
        
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
          <Box>
            {pet.euthanized && (
              <Chip label="Euthanized" color="error" size="small" />
            )}
            <Button
              size="small"
              color="error"
              onClick={() => handleEuthanizePet(pet._id)}
              disabled={pet.euthanized}
            >
              Euthanize
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`Pets (${pets.length})`} />
            <Tab label={`Users (${users.length})`} />
            <Tab label={`Applications (${applications.length})`} />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">
                Pet Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreatePet}
                sx={{ backgroundColor: '#4CAF50' }}
              >
                Add New Pet
              </Button>
            </Box>

            <Grid container spacing={3}>
              {pets.map((pet) => (
                <Grid item xs={12} sm={6} md={4} key={pet._id}>
                  <PetCard pet={pet} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              User Management
            </Typography>
            <Grid container spacing={3}>
              {users.map((user) => (
                <Grid item xs={12} md={6} key={user.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {user.userName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Pets Owned: {user.petsOwned.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Applications: {user.applications.length}
                      </Typography>
                      
                      {user.petsOwned.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Owned Pets:
                          </Typography>
                          {user.petsOwned.map((pet) => (
                            <Chip key={pet._id} label={pet.name} size="small" sx={{ mr: 1, mb: 1 }} />
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Application Management
            </Typography>
            {applications.length === 0 ? (
              <Alert severity="info">
                No pending applications at this time.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {applications.map((application) => (
                  <Grid item xs={12} md={6} key={application.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Application for {application.pet.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Applicant: {application.user.userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Pet: {application.pet.breed} • {application.pet.age} years old
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                        </Typography>
                        
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<CheckIcon />}
                            onClick={() => handleApplicationAction(application.id, 'approve')}
                            size="small"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<CloseIcon />}
                            onClick={() => handleApplicationAction(application.id, 'reject')}
                            size="small"
                          >
                            Reject
                          </Button>
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

      {/* Pet Dialog */}
      <Dialog open={petDialogOpen} onClose={() => setPetDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPet ? 'Edit Pet' : 'Add New Pet'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={petForm.name || ''}
                onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Breed"
                value={petForm.breed || ''}
                onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={petForm.age || ''}
                onChange={(e) => setPetForm({ ...petForm, age: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={petForm.gender || ''}
                  label="Gender"
                  onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Unknown">Unknown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={petForm.price || ''}
                onChange={(e) => setPetForm({ ...petForm, price: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={petForm.description || ''}
                onChange={(e) => setPetForm({ ...petForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={petForm.location || ''}
                onChange={(e) => setPetForm({ ...petForm, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={petForm.url || ''}
                onChange={(e) => setPetForm({ ...petForm, url: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Personality (comma-separated)"
                value={petForm.personality ? petForm.personality.join(', ') : ''}
                onChange={(e) => setPetForm({ 
                  ...petForm, 
                  personality: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                })}
                placeholder="Friendly, Energetic, Loyal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Characteristics (comma-separated)"
                value={petForm.characteristics ? petForm.characteristics.join(', ') : ''}
                onChange={(e) => setPetForm({ 
                  ...petForm, 
                  characteristics: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                })}
                placeholder="Good with kids, House trained, Vaccinated"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPetDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSavePet} variant="contained">
            {editingPet ? 'Update' : 'Add'} Pet
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default AdminDashboard;

