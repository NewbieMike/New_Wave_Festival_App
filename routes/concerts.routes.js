const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/random', ConcertsController.getRandom);

router.get('/concerts/:id', ConcertsController.getOne);

router.post('/concerts/', ConcertsController.create);

router.put('/concerts/:id', ConcertsController.changeOne);

router.delete('/concerts/:id', ConcertsController.deleteOne);

module.exports = router;