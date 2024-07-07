require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const useMapController = require('./middleware/useMapController');

const app = express();

// middleware
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5174']
}));
app.use(cookieParser());
app.use(express.json());

app.use(useMapController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});