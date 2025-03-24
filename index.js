if (process.env.NODE_ENV !=="production") {
    require('dotenv').config()
  }

const express = require('express');
const path = require('path');
const { CompanyAuthBack } = require('@swe-project/nodesso');
const { getIPv4Address } = require('@swe-project/nodesso/networks');

const app = express();
const port = 4000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authBack = new CompanyAuthBack({
    companyId: '67cd33bce6665c8ccf7756d1', // Replace with your actual companyId
    companyPrivateKey: process.env.COMPANY_KEY // Replace with your actual private key
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/authenticate', async (req, res) => {
    const { token } = req.body;
    const result = await authBack.authenticate(token);
    console.log(result)
    res.json(result);
});

app.post('/logout', async (req, res) => {
    const { token } = req.body;
    const result = await authBack.logout(token);
    res.json(result);
});

app.listen(port,"0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
