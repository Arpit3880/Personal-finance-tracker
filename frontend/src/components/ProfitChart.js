import React from 'react';
import { Box, Typography, Paper, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%'
}));

const ProfitChart = () => {
  const data = {
    datasets: [{
      data: [14000, 9300, 6800],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Annual profits</Typography>
        <Select
          value="2023"
          size="small"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
        </Select>
      </Box>

      <Box sx={{ position: 'relative', height: 200 }}>
        <Doughnut data={data} options={options} />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" color="primary">$14K</Typography>
          <Typography variant="body2" color="text.secondary">Total</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Q1 2023</Typography>
          <Typography variant="body2" color="primary">$14,000</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Q2 2023</Typography>
          <Typography variant="body2" color="primary">$9,300</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">Q3 2023</Typography>
          <Typography variant="body2" color="primary">$6,800</Typography>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default ProfitChart; 