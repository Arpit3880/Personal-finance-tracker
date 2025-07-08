import React from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Share as ShareIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  background: '#000',
  color: '#fff',
  height: '100%'
}));

const AccountCard = () => {
  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">VISA</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Direct Debit</Typography>
          <IconButton size="small" sx={{ color: 'white' }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ mb: 1 }}>Linked to main account</Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>**** 2719</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'white',
            color: 'black',
            '&:hover': {
              bgcolor: 'grey.100'
            }
          }}
        >
          Receive
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'grey.300'
            }
          }}
        >
          Send
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="grey.400">Monthly regular fee</Typography>
          <Typography variant="h6">$25.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="error">Edit</Typography>
          <Typography variant="body2" color="error">cards limitation</Typography>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default AccountCard; 