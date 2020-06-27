const express = require('express')
const app = express();
const db = require('./db');

var bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config()

db
    .sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


//db.sequelize.sync({ force: true }).then(() => console.log('done'))


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//
app.use('/apiv2/products', require('./routes/products'))
app.use('/apiv2/users', require('./routes/users'))
app.use('/apiv2/auth', require('./routes/auth'))
app.use('/apiv2/profile', require('./routes/profiles'))
app.use('/apiv2/reviews', require('./routes/reviews'))



app.use('*', async (req, res) => {
    res.status(404).json({ message: "page not found" })

})
const PORT = process.env.PORT || 5000
// serve our static assests
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => {
    console.log('connected' + process.env.PORT)
})