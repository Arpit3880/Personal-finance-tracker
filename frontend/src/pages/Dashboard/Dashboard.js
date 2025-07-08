import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getTransactionStats } from '../../features/transactions/transactionSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactionStats());
  }, [dispatch]);

  if (isLoading || !stats) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Format data for charts
  const monthlyData = stats.monthly.map((item) => ({
    name: new Date(item._id.year, item._id.month - 1).toLocaleString('default', {
      month: 'short',
    }),
    Income: item._id.type === 'income' ? item.total : 0,
    Expense: item._id.type === 'expense' ? item.total : 0,
  }));

  const categoryData = stats.categories.map((item) => ({
    name: item._id.category,
    amount: item.total,
    type: item._id.type,
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Income
            </Typography>
            <Typography component="p" variant="h4">
              ₹
              {stats.overall
                .find((item) => item._id === 'income')
                ?.total.toFixed(2) || '0.00'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="error" gutterBottom>
              Total Expenses
            </Typography>
            <Typography component="p" variant="h4">
              ₹
              {stats.overall
                .find((item) => item._id === 'expense')
                ?.total.toFixed(2) || '0.00'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Balance
            </Typography>
            <Typography component="p" variant="h4">
              ₹
              {(
                (stats.overall.find((item) => item._id === 'income')?.total || 0) -
                (stats.overall.find((item) => item._id === 'expense')?.total || 0)
              ).toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        {/* Monthly Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Monthly Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#4caf50" />
                <Bar dataKey="Expense" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Income by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={categoryData.filter((item) => item.type === 'income')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Expenses by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={categoryData.filter((item) => item.type === 'expense')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 