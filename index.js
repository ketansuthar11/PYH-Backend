const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const AdminRouter = require('./Routes/AdminRouter');
const PlantsRouter = require('./Routes/PlantsRouter');
const CartRouter = require('./Routes/CartRouter');
const PlaceOrderRouter = require('./Routes/PlaceOrderRouter');
require('dotenv').config();
const connectDB = require("./Models/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://prithviyadavhorticulture.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/admin', AdminRouter);
app.use('/plants', PlantsRouter);
app.use('/cart', CartRouter);
app.use('/', PlaceOrderRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    plants: []
  });
});

app.listen(PORT, () => {
  console.log(`on port ${PORT}`);
});
