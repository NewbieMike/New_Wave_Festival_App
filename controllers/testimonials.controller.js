const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Testimonial.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await Testimonial.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { author, text } = req.body; //wyciągnięcie parametry do stałej name
    const newTestimonial = new Testimonial({ author: author, text: text }); //tworzy nowy dokument na bazie modelu Testimonial
    await newTestimonial.save(); //zapis do kolekcji 
    res.json({ message: 'OK' }); // jeżeli nie otrzyma błędu zwraca 
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { author, text } = req.body;
  try {
    const dep = await Testimonial.findById(req.params.id);
    if(dep) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text}});
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
    const Testimonial = await(Testimonial.findById(req.params.id));
    if(Testimonial) {
      await Testimonial.deleteOne({ _id: req.params.id});
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch {
    res.status(500).json({ message: err });
  }
};