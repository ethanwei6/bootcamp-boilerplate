import './ExampleDashboard.css'
import pets from './examplepets.json' 
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { use, useState } from 'react'
import Slider from '@mui/material/Slider';

function ExampleDashboard() {
  const [search, setSearch] = useState("");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }


  const filteredPets = pets.filter((pet: any) => {
    pet.name.toLowerCase().includes(search.toLowerCase());
  });





  const petCards = pets.map((pet: any) => { //for local json file: change "data" to "pets" and uncomment the json import line 
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
            <Box sx={{height: 50, display: 'flex', alignItems: 'center', 
                justifyContent: 'space-around', flexDirection: 'column', flexWrap: 'wrap', backgroundColor: '#f3f4f6'}}>
            <Typography gutterBottom variant="h6" sx = {{display: 'flex', alignSelf: ''}}>
              {pet.name} {pet.age ? `, ${pet.age} yrs` : ''}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {pet.breed} {pet.gender}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {pet.location}
            </Typography>
            </Box>
          </CardContent>

          <CardContent>
            <Box sx={{height: 300, display: 'flex', alignItems: 'center', 
                justifyContent: 'space-around', flexDirection: 'column', backgroundColor: '#f3f4f6'}}>
            <h3 style={{textAlign: 'center', marginTop: '0px', fontSize: '20px'}} >Description</h3> 
            <Typography gutterBottom variant="h6" sx = {{textAlign: 'center', fontSize: '15px'}}>
              {pet.description} 
            </Typography>
            
           <h3 style={{textAlign: 'center', marginTop: '0px', fontSize: '20px'}}>Personality</h3> 
              
           <h3 style={{textAlign: 'center', marginTop: '0px', fontSize: '20x'}}>Characteristics</h3> 

            </Box>
          </CardContent>
        </Card>
      </div>
    )
  })
  
  


  return (
    <>
      <div>
        <h1 style={{textAlign: 'center', marginTop: '0px', fontSize: '60px'}}>Pawgrammers</h1>
        <h2 style={{textAlign: 'center', marginTop: '0px'}}>Find your perfect companion</h2>
        <h3 style={{textAlign: 'center', marginTop: '0px'}}>Discover loving pets looking for their forever homes. Each pet has been carefully assessed and is ready to bring joy to your family!</h3>
      </div>

      <div className='search-bar'>
        <TextField
          id="search-bar"
          variant="outlined"
          placeholder="Search for pets by name"
          size="small"
          fullWidth
          onChange = {onSearchChange}
        />
      </div>
      
      <div className='age-slider'>
        <Slider
          id="age-slider"
          size="small"
        />
      </div>
      
      
      <Container maxWidth="lg">
        <Box className="dashboard" sx={{py: 4}}>
          <div className="pet-grid">
            {petCards}
          </div>
        </Box>
      </Container>
    </>
  )
}

export default ExampleDashboard
