const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/UserRoutes')

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credential: true
}))

app.use('/api', userRoutes);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));