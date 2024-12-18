import express from 'express';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const url = "mongodb+srv://sarvajeet1005:p5r7y91dksu6gc8L@cluster0.zdd1f.mongodb.net/coffeenames?retryWrites=true&w=majority&appName=Cluster0";

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

app.post('/add-coffee', async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.price || data.name.trim() === "" || data.price <= 0) {
            return res.status(400).send("Missing coffee data");
        }

        await collection.insertOne(data);
        res.status(200).send("Data added successfully");
    } catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).send("Failed to add data");
    }
});


app.get('/get-coffees', async (req, res) => {
    try {
        const data = await collection.find().toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching data: ", err);
        res.status(500).send("Failed to fetch data");
    }
});

app.listen(3000, () => {
    console.log('Express server started on port 3000');
    runDBConnection();
});

export { client };