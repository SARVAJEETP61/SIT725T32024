const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://sarvajeet1005:p5r7y91dksu6gc8L@cluster0.zdd1f.mongodb.net/CoffeeDB?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let collection;

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db("CoffeeDB").collection("CoffeeCollection");
        console.log("Database connected and collection ready");
    } catch (ex) {
        console.error("Database connection error: ", ex);
    }
}

function getCollection() {
    return collection;
}

module.exports = { getCollection, runDBConnection };