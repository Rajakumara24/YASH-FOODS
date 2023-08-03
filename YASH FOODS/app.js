const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = 3000; // Change this to your desired port number
const mongoUrl = 'mongodb://localhost:27017'; // Change this if your MongoDB URL is different
const dbName = 'yash_foods'; // Change this to your preferred database name

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
let db;
mongodb.MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB successfully');
  db = client.db(dbName);
});

// Routes
app.post('/submit-order', (req, res) => {
  const { customerName, foodItem, phoneNumber, quantity, address } = req.body;

  // Basic validation (you can add more robust validation as needed)
  if (!customerName || !foodItem || !phoneNumber || !quantity || !address) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const order = {
    customerName,
    foodItem,
    phoneNumber,
    quantity,
    address,
    timestamp: new Date(),
  };

  // Save the order to MongoDB
  db.collection('orders').insertOne(order, (err) => {
    if (err) {
      console.error('Error inserting order:', err);
      return res.status(500).json({ error: 'Failed to save the order.' });
    }
    return res.status(200).json({ message: 'Order saved successfully.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
