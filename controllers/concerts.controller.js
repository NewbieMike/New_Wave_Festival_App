const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');
exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const tickets = await Seat.find();
    console.log(concerts);
    const allConcerts = [];
    for(let concert of concerts){
      const findTickets = tickets.filter(concertElement => concertElement.day === concert.day);
      const freeTickets = 50 - findTickets.length;
      const data = {concert: concert, freeTickets: freeTickets};
      allConcerts.push(data);
    }
    res.json(allConcerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Concert.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const sanitizePerformer = sanitize(req.body.performer);
    const sanitizeGenre = sanitize(req.body.genre);
    const sanitizeImage = sanitize(req.body.image);
    const sanitizeDay = sanitize(req.body.day);
    const sanitizePrice = sanitize(req.body.price);
     //wyciągnięcie parametry do stałej name
    const newConcert = new Concert({ performer: sanitizePerformer, genre: sanitizeGenre, price: sanitizePrice, day: sanitizeDay, image: sanitizeImage }); //tworzy nowy dokument na bazie modelu concert
    await newConcert.save(); //zapis do kolekcji 
    res.json({ message: 'OK' }); // jeżeli nie otrzyma błędu zwraca 
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image}});
      res.json({ message: 'OK' + dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const concert = await(Concert.findById(req.params.id));
    if(concert) {
      await Concert.deleteOne({ _id: req.params.id});
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch {
    res.status(500).json({ message: err });
  }
};