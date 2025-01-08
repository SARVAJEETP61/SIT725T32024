import express from 'express';
import { addCoffee, getAllCoffee } from '../controllers/controller.js';

const router = express.Router();

router.post('/add-coffee', addCoffee);
router.get('/get-coffees', getAllCoffee);

export { router };