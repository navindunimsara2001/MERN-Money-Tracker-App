const express = require('express')
const app = express();
const cors = require('cors');
const Transaction = require('./models/transaction');
const { default: mongoose } = require('mongoose');
const downloadRoute = require('./genetatePDF');

app.use(cors());
app.use(express.json());
app.use(downloadRoute);

app.get('/api/test', (req, res) => {
    res.json({ success: true });
});

app.post('/api/transaction',async (req,res)=>{
    // connect to DB
    const mongoUrl = 'mongodb+srv://NNmoneyTracker:moneyTracker123@cluster0.ftbtpg7.mongodb.net/';
    //console.log(mongoUrl);
    await mongoose.connect(mongoUrl);
    // get form data 
    const {price,name,description,datetime} = req.body;
    // pass to DB
    const transaction = await Transaction.create({price,name,description,datetime});

    console.log({success:true,data:transaction});
    res.json({success:true,data:transaction});
})

app.get('/api/transactions',async (req,res)=>{
    // connect to DB
    const mongoUrl = 'mongodb+srv://NNmoneyTracker:moneyTracker123@cluster0.ftbtpg7.mongodb.net/';
    await mongoose.connect(mongoUrl);
    // get data from DB
    const transactions = await Transaction.find();
    res.json(transactions);
});

const server = app.listen(5000, () => {
    console.log(`server is Listen on ${server.address().port}`);
})

//moneyTracker123