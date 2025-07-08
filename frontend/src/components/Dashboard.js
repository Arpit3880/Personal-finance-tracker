import React from 'react';
import { Box, Typography, Grid, IconButton, Avatar, InputBase } from '@mui/material';
import { Menu as MenuIcon, Add as AddIcon, Search as SearchIcon, Mic as MicIcon } from '@mui/icons-material';
import AccountCard from './AccountCard';
import ProfitChart from './ProfitChart';
import ActivityManager from './ActivityManager';
import StockChart from './StockChart';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" fontWeight="bold">Financial Dashboard</Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <AddIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src="/avatar.jpg" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">Dwayne Tatum</Typography>
              <Typography variant="caption" color="textSecondary">CEO Assistant</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Date and Search Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              border: '1px solid #eee',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h4" fontWeight="bold">19</Typography>
              <Typography variant="caption">December</Typography>
            </Box>
            <Box sx={{ 
              bgcolor: '#f44336',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer'
            }}>
              <Typography>Show my Tasks</Typography>
              <AddIcon />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4">Hey, Need help?👋</Typography>
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              p: 1
            }}>
              <SearchIcon color="action" />
              <InputBase
                fullWidth
                placeholder="Just ask me anything!"
                sx={{ ml: 1 }}
              />
              <MicIcon color="action" />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <AccountCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            p: 3, 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            height: '100%'
          }}>
            <Typography variant="h6" gutterBottom>Total Income</Typography>
            <Typography variant="h4" color="primary">$23,194.80</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            p: 3, 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            height: '100%'
          }}>
            <Typography variant="h6" gutterBottom>System Lock</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>109 hours, 23 minutes</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {Array(10).fill(0).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: i < 7 ? '#f44336' : '#eee'
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ProfitChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <ActivityManager />
        </Grid>
        <Grid item xs={12} md={4}>
          <StockChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 