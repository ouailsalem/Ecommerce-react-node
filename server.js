const express = require('express')
const app = express();
const db = require('./config/database')
var bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config()

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/client/public', express.static(path.join(__dirname, 'public')))

// main
app.get('/', (req, res) => {
    res.send('hello from express')
})
//
app.use('/products', require('./routes/products'))
app.use('/users', require('./routes/users'))
app.use('/protected', require('./routes/auth'))
app.use('/profile', require('./routes/profiles'))
app.use('/reviews', require('./routes/reviews'))



app.use('*', async (req, res) => {
    res.status(404).json({ message: "page not found" })

})




app.listen(process.env.PORT, () => {
    console.log('connected' + process.env.PORT)
})
