const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io')
const mongoose = require('mongoose');
const helmet = require('helmet');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(express.static(path.join(__dirname, '/client/build')));

// connects our backend code with the database
mongoose.connect('mongodb+srv://admin1:admin1@cluster0.r6g8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({
    message: 'Not found...',
    status: 404
  });
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server/*, { cors: { origin: '*' } }*/);

io.on('connection', socket => {
  console.log('New socket - its id: ', socket.id);
})