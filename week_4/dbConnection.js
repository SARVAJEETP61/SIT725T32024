const { MongoClient, ServerApiVersion } = require('mongodb')
const url = "mongodb+srv://sarvajeet1005:p5r7y91dksu6gc8L@cluster0.zdd1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

console.log('Conn successful')
client.connect()

module.exports = client;