import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <PetsIcon sx={{ color: '#4CAF50', mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
            PawGrammers
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Welcome, {user.userName}
            </Typography>
            
            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<DashboardIcon />}
                onClick={() => navigate('/admin/dashboard')}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45a049' }
                }}
              >
                Dashboard
              </Button>
            )}
            
            <Button
              variant="outlined"
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{
                borderColor: '#4CAF50',
                color: '#4CAF50',
                '&:hover': { borderColor: '#45a049', backgroundColor: 'rgba(76, 175, 80, 0.04)' }
              }}
            >
              Dashboard
            </Button>
            
            <Button
              variant="text"
              onClick={handleLogout}
              sx={{ color: '#666' }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: '#4CAF50',
                color: '#4CAF50',
                '&:hover': { borderColor: '#45a049', backgroundColor: 'rgba(76, 175, 80, 0.04)' }
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: '#4CAF50',
                '&:hover': { backgroundColor: '#45a049' }
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
