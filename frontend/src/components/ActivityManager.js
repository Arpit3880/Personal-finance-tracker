import React from 'react';
import { Box, Typography, Paper, IconButton, Button } from '@mui/material';
import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%'
}));

const ActivityManager = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [30, 45, 25, 60, 35, 40, 50],
        backgroundColor: '#f44336',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Activity manager</Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box sx={{ 
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        p: 1,
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <SearchIcon color="action" />
        <input
          style={{
            border: 'none',
            background: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '14px'
          }}
          placeholder="Search in activities..."
        />
      </Box>

      <Box sx={{ height: 200, mb: 3 }}>
        <Bar data={data} options={options} />
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>Business plans</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
          >
            Bank loans
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
          >
            Accounting
          </Button>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default ActivityManager; 