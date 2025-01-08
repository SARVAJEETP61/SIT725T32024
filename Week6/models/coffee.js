import { getCollection } from '../dbConnection.js';

async function addCoffee(data) {
    const collection = getCollection();
    if (!collection) throw new Error("Collection not initialized");
    return await collection.insertOne(data);
}

async function getAllCoffee() {
    const collection = getCollection();
    if (!collection) throw new Error("Collection not initialized");
    return await collection.find({}).toArray();
}

export default { addCoffee, getAllCoffee };