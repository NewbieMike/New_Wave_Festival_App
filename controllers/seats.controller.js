const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Seat.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body; //wyciągnięcie parametry do stałej name
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email }); //tworzy nowy dokument na bazie modelu Seat
    await newSeat.save(); //zapis do kolekcji 
    res.json({ message: 'OK' }); // jeżeli nie otrzyma błędu zwraca 
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email}});
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
    const Seat = await(Seat.findById(req.params.id));
    if(Seat) {
      await Seat.deleteOne({ _id: req.params.id});
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch {
    res.status(500).json({ message: err });
  }
};