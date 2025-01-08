import coffeeModel from '../models/coffee.js';

// Add a new coffee entry
export const addCoffee = async (req, res) => {
    try {
        const data = req.body;

        // Validate input data
        if (!data.name || !data.price || data.name.trim() === "" || data.price <= 0) {
            return res.status(400).json({ message: 'Missing coffee data: "name" and "type" are required' });
        }

        // Insert data into the database
        await coffeeModel.addCoffee(data);

        // Respond with success message
        return res.status(200).json({ message: 'Data added successfully' });
    } catch (err) {
        // Handle database or server errors
        console.error("Error adding coffee:", err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch all coffee entries
export const getAllCoffee = async (req, res) => {
    try {
        // Fetch data from the database
        const result = await coffeeModel.getAllCoffee();

        // Respond with the fetched data
        res.status(200).json({ 
            statusCode: 200, 
            data: result, 
            message: 'Coffees fetched successfully' 
        });
    } catch (err) {
        // Handle database or server errors
        console.error("Error fetching coffees:", err.message);
        res.status(500).json({ 
            statusCode: 500, 
            message: 'Internal Server Error', 
            error: err.message 
        });
    }
};

export default { addCoffee, getAllCoffee };