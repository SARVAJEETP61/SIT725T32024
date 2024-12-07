let express = require('express');
let app = express();
let path = require('path')

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let router = require('./routers/router');
const { runDBConnection } = require('./dbConnection');
app.use('/admin', router);

app.listen(3000, () => {
    console.log('Express server started on port 3000');
    runDBConnection();
});