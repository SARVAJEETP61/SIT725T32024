let coffeeModel = require('../models/coffee');

const addCoffee = async (req, res) => {
    try {
        let data = req.body;
        let result = await coffeeModel.addCoffee(data);
        res.status(201).json({ statusCode: 201, data: result, message: 'success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Database error', error: err });
    }
};

const getAllCoffee = async (req, res) => {
    try {
        let result = await coffeeModel.getAllCoffee();
        res.status(200).json({ statusCode: 200, data: result, message: 'success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Database error', error: err });
    }
};

module.exports = { addCoffee, getAllCoffee };