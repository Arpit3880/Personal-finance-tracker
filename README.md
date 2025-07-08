<<<<<<< HEAD
# Vittiya-Mate (Personal Finance Management Application)

## Setup Instructions

### Prerequisites
1. Node.js (v14 or higher)
2. MongoDB (Make sure it's installed and running)

### Installation Steps

1. Clone the repository
```bash
git clone <repository-url>
cd vittiya-mate
```

2. Create a `.env` file in the root directory with the following content:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/vittiya_mate
JWT_SECRET=your_jwt_secret_here123
JWT_EXPIRE=30d
```

3. Install dependencies for both backend and frontend:
```bash
npm install
```

4. Start the development servers:
```bash
npm run dev
```

The application will be accessible at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features
- User Authentication (Login/Register)
- Dashboard with financial overview
- Transaction management
- Income and expense tracking
- Category-wise analysis
- Charts and statistics
- Responsive design

## Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js
- Material-UI
- Redux Toolkit
- Chart.js

## Troubleshooting

If you encounter any issues:

1. Make sure MongoDB is running
2. Check if all environment variables are set correctly
3. Try reinstalling dependencies:
   ```bash
   rm -rf node_modules
   rm -rf frontend/node_modules
   npm install
   ```
4. Clear browser cache and reload

## Development

To run only the backend:
```bash
npm run server
```

To run only the frontend:
```bash
npm run client
``` 
=======
# Personal-finance-tracker
>>>>>>> 0065f7a8e4a397583234ab6d7753ce3821131f56
