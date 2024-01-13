const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const Transaction = require('./models/transaction');

router.get('/api/download',async (req,res)=>{
    // connect to DB
    const mongoUrl = 'mongodb+srv://NNmoneyTracker:moneyTracker123@cluster0.ftbtpg7.mongodb.net/';
    await mongoose.connect(mongoUrl);
    // get data
    const transactions = await Transaction.find();
    const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          
        </style>
      </head>
      <body>
          <table>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          ${transactions.map((transaction)=>{
            `<tr>
            <td>${transaction.name}</td>
            <td>${transaction.description}</td>
            <td>${transaction.price}</td>
            </tr>`
          })}
          </table>
      </body>
      </html>
    `;
    // cofigure pdf option
    const pdfOption = {
        format: 'Letter',
    }

    // Generate PDF from HTML content
    pdf.create(content,pdfOption).toFile('output.pdf',(err,result)=>{
        if (err) {
            return res.status(500).send(err);
        }
        // send generaated File
        res.sendFile(result.filename);
    });
});




module.exports = router;