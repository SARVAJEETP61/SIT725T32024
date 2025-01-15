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

app.use((req, res, next) => {
    if (req.is('application/json')) {
        express.json()(req, res, next);
    } else {
        next();
    }
});

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
        const { name, type } = req.body;

        if (!req.body || typeof req.body !== 'object' || (!name && !type)) {
            return res.status(500).send('Failed to add data');
        }

        if (!name || typeof name !== 'string' || name.trim() === "") {
            return res.status(400).send("Failed to add data");
        }

        if (!type || typeof type !== 'string' || type.trim() === "") {
            return res.status(400).send("Failed to add data");
        }

        await collection.insertOne({ name, type });
        res.status(200).send("Data added successfully");
    } catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).send("Failed to add data");
    }
});

app.get('/get-coffees', async (req, res) => {
    try {
        const data = await collection.find().toArray();
        res.status(200).json(data || []);
    } catch (err) {
        console.error("Error fetching data: ", err);
        res.status(500).send("Failed to fetch data");
    }
});

app.delete('/clear-coffees', async (req, res) => {
    try {
        await collection.deleteMany({});
        res.status(200).send("All coffees cleared");
    } catch (error) {
        res.status(500).send("Failed to clear coffees");
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(8000, () => {
        console.log('Express server started on port 3000');
        runDBConnection();
    });
}

export { client, app };