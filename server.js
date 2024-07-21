const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT
const mgURL = process.env.MONGODB_URL
mongoose.connect(mgURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    tls: true,
    tlsInsecure: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log("Error connecting to MongoDB: ", error));

// Middleware to parse JSON
app.use(express.json());

// Routing
const dbRoute = require("./routes/db-save");
const timeBasedApiRouter = require('./routes/time-based-api');
const dbSearchRouter = require('./routes/db-search');

app.use('/db-save', dbRoute);
app.use('/time-based-api', timeBasedApiRouter);
app.use('/db-search', dbSearchRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
