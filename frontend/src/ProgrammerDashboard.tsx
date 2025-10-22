import './ExampleDashboard.css'
import pets from './examplepets.json' 
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState } from 'react'
import Slider from '@mui/material/Slider';
import Header from './components/Header';
import Footer from './components/Footer';

function ExampleDashboard() {
  const petList = pets as any[];

  const [search, setSearch] = useState("");


  const ages = petList.map(p => (p.age ?? 0));
  const minAge = ages.length ? Math.min(...ages) : 0;
  const maxAge = ages.length ? Math.max(...ages) : 15;
  const [ageRange, setAgeRange] = useState<number[]>([minAge, maxAge]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }


  const onAgeChange = (_: Event | React.SyntheticEvent, value: number | number[]) => {
    if (Array.isArray(value)) setAgeRange(value);
  }

const filteredPets = petList.filter(pet => {
  const q = (search || "").trim().toLowerCase();

  const name = pet.name ? String(pet.name).toLowerCase() : "";
  const age = (pet.age !== undefined && pet.age !== null) ? pet.age : 0;

  const inAgeRange = age >= ageRange[0] && age <= ageRange[1];

  if (!q) return inAgeRange;
  return name.includes(q) && inAgeRange;
});


  console.log(filteredPets);


  const petCards = filteredPets.map((pet: any) => { //for local json file: change "data" to "pets" and uncomment the json import line 
    return (
      
      <div key={pet._id} className="pet-grid-item">
        <Card className="pet-card" sx={{height: '100%', position: 'relative'}}>
          {pet.url ? (
            <CardMedia sx={{height: 220}} image={pet.url} />
          ) : (
            <Box sx={{ height: 220, display: 'flex', alignItems: 'center', 
                justifyContent: 'center', backgroundColor: '#f3f4f6'}}>
              <Typography variant="subtitle1" color="text.secondary">
                No pet picture 
              </Typography>
            </Box>
          )} 
          <CardContent>
            <Box sx={{display: 'flex', 
                justifyContent: 'flex-start', flexGrow: 1, flexDirection: 'column', flexWrap: 'wrap', borderBottom: 1}}>
              <Typography gutterBottom variant="body1" sx = {{display: 'flex', justifyContent: 'space-between', margin: 1}}>
              <span>{pet.name} </span>
              <span style = {{border: 1, borderRadius: 7, backgroundColor: '#efeff1ff'}}>{pet.age ? ` ${pet.age} years` : ''}</span>
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {pet.breed + ' -'} {pet.gender}
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {pet.location}
              </Typography>
            </Box>
          </CardContent>

          <CardContent>
            <Box sx={{ display: 'flex', 
                justifyContent: 'flex-start', flexDirection: 'column', }}>
             <Typography gutterBottom variant="body1" sx = {{margin: 1}}>Description</Typography> 
            <Typography gutterBottom variant="body2" sx = {{textAlign: 'center', fontSize: '15px', margin: 1}}>
              {pet.description} 
            </Typography>
            
            <Typography gutterBottom variant="body1" sx = {{margin: 1}}>Personality</Typography> 
            <Typography gutterBottom variant="body2" sx = {{display: 'flex', textAlign: 'center', fontSize: '15px', margin: 1, justifyContent: "space-evenly", flexWrap: "wrap"}}>
              {pet.personality.map((x:string, i:number) => <span key = {i} style = {{border: 1, borderRadius: 7, backgroundColor: '#f8f8f8ff', padding: 4}}>{x}</span>)} 
            </Typography>

            <Typography gutterBottom variant="body1" sx = {{margin: 1}}>Characteristics</Typography> 
            <Typography gutterBottom variant="body2" sx = {{display: 'flex', textAlign: 'center', fontSize: '15px', margin: 1, justifyContent: "space-evenly", flexWrap: "wrap"}}>
              {pet.characteristics.map((x:string, i:number) => <span key = {i} style = {{border: 1, borderRadius: 7, backgroundColor: '#efeff1ff', padding: 4}}>{x}</span>)} 
            </Typography>
            </Box>
          </CardContent>


          <CardContent>
            <Box sx={{ display: 'flex', 
                justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
            <Box sx={{ display: 'flex', 
                justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
            <Typography gutterBottom variant="body2" sx = {{textAlign: 'center', fontSize: '15px'}}>
              {pet.price} 
            </Typography>

            <Typography gutterBottom variant="body1" sx = {{margin: 1}}>Adoption Fee</Typography>
            </Box>

            <Button variant="text" color="primary" size="small" sx = {{border: 1, borderRaidus: 5, backgroundColor: '#000000ff', color: '#ffffffff'}}>
            Learn More
            </Button>
            
            </Box>
          </CardContent>
        </Card>
      </div>
    )
  })
  
  

    
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Box sx={{ flex: 1 }}>
        <Box sx={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
          color: 'white',
          py: 6,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Playful Background Shapes */}
          <Box sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            animation: 'float 3s ease-in-out infinite'
          }} />
          
          <Box sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            animation: 'float 3s ease-in-out infinite 1.5s'
          }} />

          <Box sx={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            animation: 'float 3s ease-in-out infinite 2s'
          }} />

          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2
            }}>
              🐾 PawGrammers 🐾
            </Typography>
            <Typography variant="h4" sx={{ 
              mb: 2,
              opacity: 0.9,
              fontSize: { xs: '1.3rem', md: '1.8rem' }
            }}>
              Find your perfect companion
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 4,
              opacity: 0.8,
              fontSize: { xs: '1rem', md: '1.2rem' },
              maxWidth: '800px',
              mx: 'auto'
            }}>
              Discover loving pets looking for their forever homes. Each pet has been carefully assessed and is ready to bring joy to your family! ✨
            </Typography>
          </Container>
        </Box>

      <div className='search-bar' style={{ maxWidth: 900, margin: '12px auto' }}>
        <TextField
          id="search-bar"
          variant="outlined"
          placeholder="Search for pets by name"
          size="small"
          fullWidth
          value={search}
          onChange={onSearchChange}
        />
      </div>
      
      <div className='age-slider' style={{ maxWidth: 900, margin: '8px auto', padding: '0 8px' }}>
        <div style={{ fontSize: 12, marginBottom: 6 }}>Filter by age (years)</div>
        <Slider
          id="age-slider"
          size="small"
          value={ageRange}
          onChange={onAgeChange}
          min={minAge}
          max={maxAge}
          valueLabelDisplay="auto"
        />
      </div>
      
      
        <Container maxWidth="lg">
          <Box className="dashboard" sx={{py: 4}}>
            <div className="pet-grid">
              {petCards}
            </div>
          </Box>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  )
}

export default ExampleDashboard