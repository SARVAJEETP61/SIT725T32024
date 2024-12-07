let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/add-coffee', async function (req,res){
    controller.addCoffee(req,res);
});

router.get('/get-coffees', async (req,res)=>{
    controller.getAllCoffee(req,res);
});

module.exports = router;