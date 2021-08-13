const express = require('express');
const router = express.Router();

const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getOne);

router.post('/testimonials/', TestimonialsController.create);

router.put('/testimonials/:id', TestimonialsController.changeOne);

router.delete('/testimonials/:id', TestimonialsController.deleteOne);

module.exports = router;